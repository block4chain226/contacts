const errorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case 403:
            res.json({title: 'validation failed', error: err.message, stackTrace: err.stack})
            break
        case 404:
            res.json({title: 'not found', error: err.message, stackTrace: err.stack})
            break
        default:
            res.json({title: 'unexpected condition', error: err.message, stackTrace: err.stack})
    }
}

module.exports = errorHandle