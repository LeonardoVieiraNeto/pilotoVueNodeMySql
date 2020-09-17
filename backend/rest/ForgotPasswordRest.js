var express = require('express');
var router  = express.Router();

const util = require('../util');
const service = require('../service/UserService');

const isValid = (req, res) =>{
	return util.isValid(req, res,[
		{
			name: 'login',
			msg: 'login é um campo obrigatório'
		}
	])	
}

router.post('/', (req, res, next) => {
	if(!isValid(req, res) ){  	
		return;
    }
    
	service.forgotPassword({
		login: req.body.login
	}).then( () =>{
		util.returnHttp(res);
	}).catch(next)	
});

module.exports = router;
