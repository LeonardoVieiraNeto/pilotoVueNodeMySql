"use strict"
module.exports = {
	logErrors(err, req, res, next) {
		console.error('-------------');
		console.error('----ERROR----');
		console.error('-------------');
		console.error('Errors', err.stack);
		console.error('-------------');

		if (err.original && err.original.detail) {
			console.error('DETAIL ', err.original.detail);
			console.error('CONSTRAINT ', err.original.constraint);
			console.error('MESSAGE ', err.original.message);
			console.error('-------------');
		}
		
		if (err.sql) {
			console.error('SQL', err.sql);
			console.error('-------------');
		}

		next(err);
	},
	clientErrorHandler(err, req, res, next) {
		if (req.xhr) {
			res.status(500).send({
				error: 'Requisição com erro'
			});
		} else {
			next(err);
		}
	},
	errorHandler(err, req, res, next) {
		res.status(500).send(err.message);
	}
}