const models = require('../models');
const dbUtil = require('../util/DbUtil');
const crypto = require("crypto");
const md5 = require('js-md5');

const rawQuery = require('../util/RawQuery');
const messagesUtil = require('../util/MessagesUtil');

const userValidation = models.userValidation;

const findUser = async (login, password, validator) => {
    let select = 'select u.id, u.validar_ip, u.id_empresa, e.validade, e.status, u.multi_acesso, e.dedicado, u.status as userstatus from usuario u join empresa e on (u.id_empresa = e.id) left join usuario_validacao uv on(u.id = uv.id_usuario) where '
    let params

    if (validator) {
        select += 'uv.validacao = $1'
        params = [validator]
    } else {
        select += '(u.login = $1 or u.email = $1) and u.senha =$2'
        params = [login, password]
    }

    const result = await rawQuery.select(
        select, params
    )

    if (result.length > 0) {
        return {
            id: result[0].id,
            needValidateIp: result[0].validar_ip,
            companyId: result[0].id_empresa,
            companyStatus: result[0].status,
            validate: result[0].validade,
            multiAccess: result[0].multi_acesso,
            dedicated: result[0].dedicado,
            userStatus: result[0].userstatus,
        }
    }

    return;
}


const validateIp = async (comapnyId, ip) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const sql = 'select 1 from ip i where i.id_empresa = $1 and i.ip = $2'

            let result = await rawQuery.hasSelect(sql, [comapnyId, ip])

            if (!result){
                const ldot = ip.lastIndexOf(".");
                ip = ip.substring(0, ldot)
                ip +='.0' 
                result = await rawQuery.hasSelect(sql, [comapnyId, ip])
            }
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

const hasUserFunctionality = async (userId, functionality) => {
    return await rawQuery.hasSelect(
        'select 1 from usuario u join perfil_funcionalidade p on(p.id_perfil = u.id_perfil) join funcionalidade f on (p.id_funcionalidade = f.id) where u.id = $1 and f.tipo = $2',
        [userId, functionality]
    )
}

const registerAccess = async (userId, token, multiAccess) => {
    if (!multiAccess) {
        await dbUtil.deleteParam(userValidation, {
            userId: userId
        })
    }

    await dbUtil.create(userValidation, {
        validator: token,
        userId: userId
    })
}

const findLayers = async (profileId) => {
    const result = await rawQuery.select(
        'select c.tipo from camada c join perfil_camada pc on (c.id = pc.id_camada) where pc.id_perfil = $1',
        [profileId]
    )

    if (result.length > 0) {
        let layers = []
        result.map(layer => {
            layers.push(layer.tipo)
        })

        return layers
    }
    return;
}

const findFunctions = async (profileId) => {
    const result = await rawQuery.select(
        'select f.tipo from funcionalidade f join perfil_funcionalidade pf on (f.id = pf.id_funcionalidade) where pf.id_perfil = $1',
        [profileId]
    )

    if (result.length > 0) {
        let list = []

        result.map(obj => {
            list.push(obj.tipo)
        })

        return list
    }
    return;
}

const fillUserAttributes = async (userId) => {
    const result = await rawQuery.select(
        'select u.id as userid, u.nome as username, u.login as login, e.id as companyId, e.nome as companyName ,p.id as profileid, p.nome as profilename, pa.quantidade_usuario as quantUser from usuario u join empresa e on (u.id_empresa = e.id) join perfil p on(p.id = u.id_perfil) join plano pa on (e.id_plano = pa.id) where u.id = $1',
        [userId]
    )

    if (result.length > 0) {
        return {
            id: result[0].userid,
            name: result[0].username,
            login: result[0].login,
            company: {
                id: result[0].companyid,
                name: result[0].companyname,
                quantUsers: result[0].quantuser
            },
            profile: {
                id: result[0].profileid,
                name: result[0].profilename
            }
        }
    }

    return;
}

const generateToken = () => {
    return crypto.randomBytes(16).toString("hex").substr(0, 16)
}

const service = {
    login: (user, validator) => {
        return new Promise(async (resolve, reject) => {
            try {
                let token;
                const today = new Date()

                let userDb;

                console.log('Dentro do login service');

                if (!validator) {
                    userDb = await findUser(user.login, user.password)
                    token = generateToken();
                } else {
                    userDb = await findUser(null, null, validator)
                    token = validator
                }

                if (userDb) {
                    if (userDb.companyStatus != 'A') {
                        throw new Error(messagesUtil.companyInactive)
                    } else if (userDb.dedicated) {
                        throw new Error(messagesUtil.serverDedicated)
                    } else if (new Date(userDb.validate) < today) {
                        throw new Error(messagesUtil.userExpirationDate)
                    } else if (userDb.needValidateIp && !(await validateIp(userDb.companyId, ip))) {
                        throw new Error(messagesUtil.userwrongIp)
                    } else if (!(await hasUserFunctionality(userDb.id))) {
                        throw new Error(messagesUtil.userHasNoPermission)
                    } else if (userDb.userStatus === 'I') {
                        throw new Error(messagesUtil.userInactive)
                    }

                    await registerAccess(userDb.id, token, userDb.multiAccess)

                    const userLogin = await fillUserAttributes(userDb.id);
                    userLogin.ip = ip;
                    userLogin.token = token;
                    userLogin.layers = await findLayers(userLogin.profile.id)
                    userLogin.permissions = await findFunctions(userLogin.profile.id)
                    userLogin.private = md5("u" + userDb.id)
                    userLogin.global = md5("c" + userDb.companyId)

                    resolve(userLogin)
                } else {
                    throw new Error(messagesUtil.userNotFound)
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    validate: async (validator) => {
        return await service.login(null, validator)
    }
}

module.exports = service;