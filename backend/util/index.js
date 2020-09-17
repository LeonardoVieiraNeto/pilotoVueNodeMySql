module.exports = {
	extractIdsList: (list) => {
		let ids = [];
		if (list) {
			for (let i = 0; i < list.length; i++) {
				ids.push(list[i].id);
			}
		}
		return ids;
	},
	isValid: (req, res, fields) => {
		fields.forEach((field) => {
			req.checkBody(field.name, field.msg).notEmpty();
		})

		const errors = req.validationErrors();

		if (errors) {
			res.status(400).send(JSON.stringify(errors));
			return false
		}
		return true;
	},
	fillObject: (body, fields) => {
		let entity = {};

		fields.forEach((field) => {
			if ((body[field] && body[field] != 'null') || body[field] === false || body[field] === 0) {
				entity[field] = body[field];
			} else {
				entity[field] = null;
			}
		})

		return entity;
	},
	returnHttp: (res, object, setNoCache) => {
		res.header("Content-Type", "application/json;charset=UTF-8");

		if (setNoCache) {
			res.header('Cache-Control', 'no-cache, no-store, must-revalidate') // HTTP 1.1
			res.header('Pragma', 'no-cache') // HTTP 1.0
			res.header('Expires', '0') // Proxies
		}

		if (object) {
			res.end(JSON.stringify(object, (key, value) => {
				if (value !== null) return value
			}));
		}
		res.end();
	},
	splitterType: (type) => {
		const list = {
			"S12 ": {
				i: 1,
				o: 2
			},
			"S14 ": {
				i: 1,
				o: 4
			},
			"S18 ": {
				i: 1,
				o: 8
			},
			"S116": {
				i: 1,
				o: 16
			},
			"S132": {
				i: 1,
				o: 32
			},
			"S164": {
				i: 1,
				o: 64
			},
			"S10 ": {
				i: 1,
				o: 10
			},
			"S20 ": {
				i: 1,
				o: 20
			}
		}
		return list[type]
	},
	splitName50: (name) => {
		if (name.length > 50) {
			return name.substring(0, 49);
		}
		return name
	}
}