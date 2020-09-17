const crypto = require("crypto");
const md5 = require('js-md5');

const models = require('../models');
const dbUtil = require('../util/DbUtil');

const sendEmail = require('../util/SendEmail');

const rawQuery = require('../util/RawQuery');
const messagesUtil = require('../util/MessagesUtil');

const entity = models.user;

const hasUserLogin = async (userId, login) => {
    let select = 'select 1 from usuario e where lower(e.login) = $1'
    let params = [login]

    if (userId) {
        select += ' and id <> $2'
        params.push(userId)
    }

    return await rawQuery.hasSelect(
        select,
        params
    )
}

const hasUserEmail = async (userId, email) => {
    let select = 'select 1 from CNF_USUARIO e where lower(e.email) = lower($1)'
    
    let params = [email]
    
    if (userId) {
        select += ' and id <> $2'
        params.push(userId)
    }
    return await rawQuery.hasSelect(
        select,
        params
    )
}
const countUserStandard = async (companyId) => {
    return await rawQuery.selectNumber('select count(1) from usuario where id_empresa = $1 and tipo = \'P\' and status = \'A\'', [companyId])
}

const hasMaxLimitUser = async (companyId) => {
    let qauntUsers = await countUserStandard(companyId)
    let select = 'select 1 from plano p join empresa e on e.id_plano = p.id where e.id = $1 and p.quantidade_usuario <= $2;'
    let params = [companyId, qauntUsers]
    return await rawQuery.hasSelect(
        select,
        params
    )
}

const sendEmailUser = (title, user, password) => {

    let content = "<strong>Usuário : </strong>" + user.name + "<br/>";
    content += "<strong>Login : </strong> " + user.login + "<br/>";
    content += "<strong>senha : </strong> " + password + "<br/>";

    sendEmail.send(user.email, title, content)
}

const getNewPassword = () => {
    return crypto.randomBytes(16).toString("hex").substr(0, 5)
}

const service = {
    findAll: async () => {
        return dbUtil.findAll(entity, {
            attributes: ['id', 'nome', 'usuario', 'email'],
            order: ['nome', 'id']
        })
    },
    findAllByCompany: async (companyId) => {
        return dbUtil.findAll(entity, {
            where: {
                companyId: companyId
            },
            include: [{
                model: models.profile,
                attributes: ['id', 'nome'],
                as: 'profile'
            }],
            order: ['nome']
        })
    },
    findSimple: () => {
        return dbUtil.findAll(entity, {
            attributes: ['id', 'nome', 'phone', 'email'],
            include: [{
                model: models.company,
                attributes: ['id', 'name'],
                as: 'company'
            }],
            order: ['nome']
        })
    },
    findSimpleByCompany: (companyId) => {
        return dbUtil.findAll(entity, {
            attributes: ['id', 'nome'],
            where: {
                companyId: companyId
            }
        })
    },
    find: async (id) => {
        return dbUtil.find(entity, {
            attributes: ['id', 'nome', 'usuario', 'email'],
            where: {
                id: id
            },
            include: [{
                model: models.company,
                attributes: ['id', 'nome'],
                as: 'company'
            }, {
                model: models.profile,
                attributes: ['id', 'nome'],
                as: 'profile'
            }],
        })
    },
    findCompanyId: async (id) => {
        return dbUtil.find(entity, {
            attributes: ['companyId'],
            where: {
                id: id
            }
        })
    },
    findOneSimple: async (userId) => {
        return await dbUtil.find(entity, {
            attributes: ['id', 'name', 'email'],
            where: {
                id: userId
            }
        })
    },
    create: async (entityReq, companyId) => {
        
        let password;
        
        //const hasEmail = await hasUserEmail(null, entityReq.email)
        //const hasLogin = await hasUserLogin(null, entityReq.login)

        //if (hasEmail) {
        //    throw new Error(messagesUtil.userEmailExists)
        //} else if (hasLogin) {
        //    throw new Error(messagesUtil.userLoginExists)
        //}

        if (!entityReq.password) {
            password = getNewPassword()
        } else {
            password = entityReq.password;
        }

        entityReq.password = md5(password)

        //sendEmailUser('Usuário novo', entityReq, password)
        dbEntity = await dbUtil.create(entity, entityReq)

        return dbEntity
    },
    update: async (id, entityReq) => {
        let hasEmail = false
        let hasLogin = false

        if (entityReq.email)
            hasEmail = await hasUserEmail(id, entityReq.email)

        if (entityReq.login)
            hasLogin = await hasUserLogin(id, entityReq.login)

        if (hasEmail) {
            throw new Error(messagesUtil.userEmailExists)
        } else if (hasLogin) {
            throw new Error(messagesUtil.userLoginExists)
        }

        if (entityReq.profile && entityReq.profile.id)
            entityReq.profileId = entityReq.profile.id

        if (entityReq.company && entityReq.company.id)
            entityReq.companyId = entityReq.company.id


        if (entityReq.password) {
            password = entityReq.password;
            entityReq.password = md5(password)
        } else {
            entityReq.password = undefined;
        }

        return dbUtil.update(entity, id, entityReq)
    },
    changeCompany: async (id, companyId) => {
        return dbUtil.update(entity, id, {
            companyId: companyId
        })
    },
    getByCompany: async (companyId) => {
        return dbUtil.findAll(entity, {
            attributes: ['id', 'name', 'email', 'profileId', 'phone', 'type', 'status'],
            where: {
                companyId: companyId
            },
            order: ['name']
        })
    },
    userHasPermission: async (userId, functionality) => {
        return await rawQuery.hasSelect(
            'select 1 from usuario u join perfil_funcionalidade pf on(u.id_perfil = pf.id_perfil) join funcionalidade f on (pf.id_funcionalidade = f.id) where u.id = $1 and f.tipo = $2', [userId, functionality]
        )
    },
    forgotPassword: async (user) => {
        const userDb = await dbUtil.find(entity, {
            attributes: ['id', 'name', 'login', 'email'],
            where: {
                [models.Sequelize.Op.or]: [{
                    login: user.login
                },
                {
                    email: user.login
                }
                ]
            }
        })

        if (userDb) {
            let password = getNewPassword();
            userDb.password = md5(password)
            await userDb.save();
            //await userAccessService.deleteUserValidation(userDb.id);
            sendEmailUser('Nova senha', userDb, password)
        }
    },
    delete: async (id) => {
        return dbUtil.delete(entity, id)
    },
    changePassword: async (userId, entityReq) => {
        const userDb = await dbUtil.find(entity, {
            attributes: ['id', 'name', 'login', 'email', 'password'],
            where: {
                id: userId
            }
        })
        if (userDb) {
            let currentPassword = md5(entityReq.password);
            if (currentPassword != userDb.password) {
                throw new Error(messagesUtil.userPasswordIncorret)
            } else {
                let password = entityReq.newpassword;
                userDb.password = md5(entityReq.newpassword)
                await userDb.save();
                await userAccessService.deleteUserValidation(userDb.id);
                sendEmailUser('Alteracao de senha', userDb, password)
            }
        }
    },
    changeStatus: async (userId, companyId, status) => {
        const userDb = await service.find(userId)
        if (userDb) {
            if (status == 'A') {
                const hasLimitUser = await hasMaxLimitUser(companyId)

                if (hasLimitUser && userDb.type != 'I') {
                    throw new Error(messagesUtil.usersMaxLimit)
                }
            }
            userDb.status = status
            await userDb.save();
        }
    }
}

module.exports = service;

