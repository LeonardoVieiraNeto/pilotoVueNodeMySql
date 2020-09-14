var express = require('express')
var router = express.Router();

const util = require('../util/index');
const service = require('../service/LoginService');

const isValid = (req, res) => {
    return util.isValid(req, res, [
        {
            name: 'login', 
            msg: 'login é um campo obrigatório'
        },
        {
            name: 'password',
            msg: 'password é um campo obrigatório'
        }
    ])
}

router.post('/', async (req, res, next) => {
    if(!isValid(req, res)) {
        return;
    }

    const app = req.headers.app;
    const ip = req.headers['x-real-ip']

    service.login({
        login: req.body.login,
        password: req.body.password
    }, app, ip).then(userData => {
        util.returnHttp(res, userData, true);
    }).catch(next)
});

router.get('/validate', async (req, res, next) => {
    const app = req.headers.app;
    const ip = req.headers['x-real-ip']

    service.validate(rez.headers.validator, app, id).then(userData => {
        util.returnHttp(res, userData, true);
    }).catch(next)
});

module.exports = router;