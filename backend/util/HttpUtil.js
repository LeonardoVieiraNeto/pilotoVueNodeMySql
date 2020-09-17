const request = require('request');
const argValidation = require('./ArgValidation');

const options = (path, form, ssl, flagJson) => {
    let opt = {
        url: path,
        headers: {
            'Content-Type': 'application/json'
        },
        json: (flagJson) ? flagJson : false,
        body: form,
        rejectUnauthorized: false
    };

    if (ssl) {
        opt.secureProtocol = 'TLSv1_method',
            opt.headers.selfSigned = 'true'
    }

    return opt;
}

const requestFormat = (requestType, path, form, config, headers, flagJson) => {
    return new Promise((resolve, reject) => {
        const opt = options(path, form, config.ssl, flagJson);

        if (headers) {
            opt.headers = Object.assign({}, opt.headers, headers);
        }
        requestType(opt, (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        }).on('error', function(error) {
            reject(error)
        });
    })
}

const service = {
    loadConfig: () => {
        return new Promise((resolve, reject) => {
            try {
                argValidation.configFile(params => {
                    config = params.file
                    resolve(config)
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    get: async(config, path, headers) => {
        const requestPath = config.address + ':' + config.port + path
        console.log('GET', requestPath)
        return requestFormat(request.get, requestPath, null, config, headers)
    },
    post: async(config, path, headers, form) => {
        const requestPath = config.address + ':' + config.port + '/' + path
        console.log('POST', requestPath)
        console.log('form', form)
        const flagJson = true
        return requestFormat(request.post, requestPath, form, config, headers, flagJson)
    }
}

module.exports = service