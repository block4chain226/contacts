const constants = require('../constants.js')

const errorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.FORBIDDEN:
            res.json({title: 'forbidden', error: err.message, stackTrace: err.stack})
            break
        case constants.NOT_FOUND:
            res.json({title: 'not found', error: err.message, stackTrace: err.stack})
            break
        case constants.UNAUTHORIZED:
            res.json({title: 'UNAUTHORIZED', error: err.message, stackTrace: err.stack})
            break
        case constants.VALIDATION_ERROR:
            res.json({title: 'not found', error: err.message, stackTrace: err.stack})
            break
        case constants.SERVER_FAILED:
            res.json({title: 'server error', error: err.message, stackTrace: err.stack})
            break
    }
}

module.exports = errorHandle