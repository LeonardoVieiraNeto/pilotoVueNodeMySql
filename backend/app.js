"use strict"
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//Quando tivermos um padrão de uso de token e autenticação, não precisaremos mais do Cors()
const cors = require('cors')

const messageUtil = require('./util/MessagesUtil')
const errorHandlingUtil = require('./util/ErrorHandlingUtil')

// Set up the express app
const app = express();

//Quando tivermos um padrão de uso de token e autenticação, não precisaremos mais do Cors()
app.options('*', cors())
app.use(cors())

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(expressValidator());

app.use('/login', require('./rest/LoginRest'));
app.use('/forgotpassword', require('./rest/ForgotPasswordRest'));
app.use('/user', require('./rest/UserRest'));
//Quando tivermos um padrão de uso de token e autenticação, não precisaremos mais do Cors()
app.options('/user/', cors())

app.use(async (req, res, next) => {
	
	//Comentário Léo 
	//Aqui é interessante colocar validações de TOKEN, usuário, regras de acesso de acordo com usuário ou determinadas empresas. 

	// if (req.headers.validator || req.query.validator) {
	// 	let validator
	// 	if (req.query.validator) {
	// 		validator = req.query.validator.toString();
	// 	} else {
	// 		validator = req.headers.validator
	// 	}
	// 	const userAccess = await userAccessService.findCompanyUserByValidator(validator)
	// 	if (userAccess) {
	// 		req.companyId = userAccess.companyId;
	// 		req.userId = userAccess.userId;
	// 		req.token = validator;
	// 		next();
	// 	} else {
	// 		res.send(401).status(messageUtil.noValidatorRequest)
	// 	}
	// } else if (req.query.validator) {
	// 	next();
	// } else {
	// 	res.send(401).status(messageUtil.noValidatorRequest)
	// }
});

app.use(errorHandlingUtil.logErrors);
app.use(errorHandlingUtil.clientErrorHandler);
app.use(errorHandlingUtil.errorHandler);

module.exports = app;