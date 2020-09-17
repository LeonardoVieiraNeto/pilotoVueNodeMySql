"use strict"
const service = {
	findAll: (entity, options) => {
		return entity.findAll(options)
	},
	find: (entity, options) => {
		return entity.find(options);
	},
	create: (entity, filledObject) => {
		return entity.create(filledObject)
	},
	update: async (entity, id, filledObject) => {
		const entityDb = await entity.find({
			where: {
				id: id
			},
			attributes: ['id']
		})

		if (entityDb) {
			return entityDb.updateAttributes(filledObject)
		} else {
			return null
		}
	},
	delete: (entity, id) => {
		return entity.destroy({
			where: {
				id: id
			}
		})
	},
	deleteParam: (entity, where) => {
		return entity.destroy({
			where: where
		})
	},
	exists: async (entity, options) => {
		const result = await entity.count(options)
		return (result > 0);
	},
	move: (entity, id, coordinates) => {
		const entityReq = {
			geometry: coordinates
		}
		return service.update(entity, id, entityReq)
	},
	save: (entity, filledObject) => {
		if (filledObject.id) {
			return filledObject.save()
		} else {
			return service.create(entity, filledObject)
		}
	}
}

module.exports = service;