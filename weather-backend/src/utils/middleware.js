const logger = require('./logger')

const requestLogger = (request, response, next) => {
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const tokenExtractor = (request, response, next) => {
    if(request.method === 'GET' || request.method === 'POST') {
        const authorization = request.get('authorization')
        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
            request.token = authorization.substring(7)
        }
    }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor
}