'use strict'

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
//const expressValidator = require('express-validator')

const messageUtil = require('../backend/src/util/MessagesUtil')
const userAccessService = require('../backend/src/service/UserAccessService')
const errorHandlingUtil = require('../backend/src/util/ErrorHandlingUtil')

//Set up the express app
const app = express();

console.log('Dentro do app.js 1');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

console.log('Dentro do app.js 2');


var { check, expressValidator } = require('express-validator');
app.use(check)


//app.use(expressValidator());

app.use('./login', require('../backend/src/rest/LoginRest'));
//app.use('./forgotpassword', require('../backend/src/rest/ForgotPasswordRest'));
//app.use('./chatresponse', require('../backend/src/rest/ChatRestResponse'));

console.log('Dentro do app.js 3');

app.use(async (req, res, next) => {
    
    console.log('Dentro do app.js 4, dentro do app.use()');
    
    if(req.headers.validator || req.query.validator){
        console.log('Dentro do app.js 5, dentro do if');
        let validator
        if(req.query.validator){

        } else {

        }
        const userAcess = await userAccessService.findCompanyUserByValidator(validator)
        if(userAcess) {
            req.companyID = userAcess.companyID;
            req.userId = userAcess.UserId;
            req.token = validator;
            next();
        } else{
            res.send(401).status(messsageUtil.noValidatorRequest)
        }  
    } else if (req.query.validator) {
        next();
    } else {
        res.send(401).status(messageUtil.noValidatorRequest)
    }
});

