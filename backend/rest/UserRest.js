
var express = require('express');
var router = express.Router();

const util = require('../util');
const service = require('../service/UserService');
//const serviceUserAccess = require('../service/UserAccessService')

const isValid = (req, res) => {
    return util.isValid(req, res, [{
        name: 'nome',
        msg: 'Nome é um campo obrigatório'
    },
    {
        name: 'usuario',
        msg: 'usuário é um campo obrigatório'
    },
    {
        name: 'email',
        msg: 'email é um campo obrigatório'
    }
    ])
}

const fillObject = (body) => {
    let entity = util.fillObject(body, ['keyUser', 'nome', 'usuario', 'senha', 'ativo', 'email', 'telefone', 'dataCriacao', 'dataExpiracao', 'superUser', 'tecnico', 'financeiro', 'administrativo', 'tipoMenu', 'informativo'  ])

    if (!entity.needIpValidation) {
        entity.needIpValidation = false
    }

    return entity;
}

router.use(function (req, res, next) {
    //Aqui podemos colocar alguma regra, validação ou carregamento de dados necessário, esse método sempre será executado, 
    //assim que o UserRest for chamado. 
    console.log('USER REST Check permission')
    next();
});

router.get('/', function (req, res, next) {
    service.findAll().then(list => {
        util.returnHttp(res, list);
    }).catch(next)
})


router.get('/company', async (req, res, next) => {
    service.getByCompany(req.companyId).then(list => {
        util.returnHttp(res, list);
    }).catch(next)
})

router.get('/simple/:companyId', async (req, res, next) => {
    service.getByCompany(req.params.companyId).then(list => {
        util.returnHttp(res, list);
    }).catch(next)
})

router.get('/simple', async (req, res, next) => {
    service.findSimple().then(list => {
        util.returnHttp(res, list);
    }).catch(next)
})

router.get('/admin/useraccess/:id', async (req, res, next) => {
    serviceUserAccess.findByCompany(req.params.id).then(list => {
        util.returnHttp(res, list);
    }).catch(next);
});

router.get('/admin/useraccess/byuser/:id', async (req, res, next) => {
    serviceUserAccess.findByUser(req.params.id).then(list => {
        util.returnHttp(res, list);
    }).catch(next);
});

router.get('/admin/useraccess/report/:date1/:date2', async (req, res, next) => {
    serviceUserAccess.accessReport(req.params.date1, req.params.date2).then(list => {
        util.returnHttp(res, list);
    }).catch(next);
});

router.post('/changecompany/:id', async (req, res, next) => {
    service.changeCompany(req.userId, req.params.id).then(() => {
        util.returnHttp(res);
    }).catch(next)
})

router.post('/changepassword', async (req, res, next) => {
    if (!util.isValid(req, res, [{
        name: 'password',
        msg: 'password é um campo obrigatório'
    },
    {
        name: 'newpassword',
        msg: 'newpassword é um campo obrigatório'
    }
    ])) {
        return;
    }

    let entity = util.fillObject(req.body, ['password', 'newpassword', 'validateIp'])

    if (!entity.validateIp) {
        entity.validateIp = false;
    }

    service.changePassword(req.userId, entity).then(() => {
        util.returnHttp(res);
    }).catch(next)
})

router.post('/:id/changestatus', async (req, res, next) => {
    if (!util.isValid(req, res, [{
        name: 'status',
        msg: 'status é um campo obrigatório'
    }
    ])) {
        return;
    }
    service.changeStatus(req.params.id, req.companyId, req.body.status).then(() => {
        util.returnHttp(res);
    }).catch(next)
})

router.get('/:id', async (req, res, next) => {
    service.find(req.params.id).then(list => {
        util.returnHttp(res, list);
    }).catch(next)
})

router.post('/', async (req, res, next) => {
    if (!isValid(req, res)) {
        return;
    }

    service.create(fillObject(req.body), req.companyId).then(entity => {
        util.returnHttp(res, entity);
    }).catch(next);

})

router.put('/:id', async (req, res, next) => {
    if (!isValid(req, res)) {
        return;
    }

    service.update(req.params.id, fillObject(req.body)).then(entity => {
        util.returnHttp(res);
    }).catch(next);
})

router.delete('/:id', (req, res, next) => {
    service.delete(req.params.id).then(() => {
        util.returnHttp(res);
    }).catch(next);
});

module.exports = router;