const models  = require('../models');

const basicQuery = (sql,  params, queryParams) =>{
	if( params ) {
		queryParams.bind = params;
	}
	return new Promise( (resolve, reject) => {
		models.sequelize.query( sql, queryParams ).then(result => {
			resolve(result)	  
		}).catch(reject)
	})
} 

module.exports = {
	select: ( sql,  params) =>{
		return basicQuery( sql, params, { type: models.sequelize.QueryTypes.SELECT } )
	},
	insert: ( sql,  params) =>{
		return basicQuery( sql, params, { type: models.sequelize.QueryTypes.INSERT } )
	},
	update: ( sql,  params) =>{
		return basicQuery( sql, params, { type: models.sequelize.QueryTypes.UPDATE } )
	},
	hasSelect: (sql, params) => {
		let queryParams = { type: models.sequelize.QueryTypes.SELECT };
		
		if( params ) {
			queryParams.bind = params;
		}
		
		return new Promise( (resolve, reject) => {
			models.sequelize.query( sql, queryParams ).then(result => {
				resolve( result.length > 0 )	  
			}).catch(reject)
		})
	},
	hasCount: (sql, params) => {
		let queryParams = { type: models.sequelize.QueryTypes.SELECT };
		
		if( params ) {
			queryParams.bind = params;
		}
		return new Promise( (resolve, reject) => {
			models.sequelize.query( sql, queryParams ).then(result => {
				resolve( result && result[0].count > 0 )	  
			}).catch(reject)
		})
	},
	selectNumber: ( sql,  params) =>{
		let queryParams = { type: models.sequelize.QueryTypes.SELECT };
		
		if( params ) {
			queryParams.bind = params;
		}
		return new Promise( (resolve, reject) => {
			models.sequelize.query( sql, queryParams ).then(result => {
				let value = 0; 

				if(result.length > 0){
					if( result[0].count )
						value = result[0].count
				}
				resolve( value )	  
			}).catch(reject)
		})
	},
	selectValue: ( sql,  params) =>{
		let queryParams = { type: models.sequelize.QueryTypes.SELECT };
		
		if( params ) {
			queryParams.bind = params;
		}
		return new Promise( (resolve, reject) => {
			models.sequelize.query( sql, queryParams ).then(result => {
				let value = null; 

				if(result.length > 0){
					if( result[0].value != null)
						value = result[0].value
				}
				resolve( value )	  
			}).catch(reject)
		})
	},
	selectValues: ( sql,  params) =>{
		let queryParams = { type: models.sequelize.QueryTypes.SELECT };
		
		if( params ) {
			queryParams.bind = params;
		}
		return new Promise( (resolve, reject) => {
			models.sequelize.query( sql, queryParams ).then(result => {
				let values = []; 

				for(let i =0; i < result.length; i++){
					values.push(result[i].value)
				}				
				resolve( values )	  
			}).catch(reject)
		})
	},
	delete: ( sql,  params) =>{
		return basicQuery( sql, params, { type: models.sequelize.QueryTypes.DELETE } )
	}
}