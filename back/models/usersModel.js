const mongoose = require('mongoose')

const usersModel = mongoose.Schema({
    name: {type: String, required: true},
    login: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true}
}, {timestamp: true})

usersModel.query.byLogin = (login) => {
    return this.where({login: login})
}

usersModel.statics.findByLogin = function (login) {
    return this.find({login: login})
}

usersModel.statics.findByPassword = function (password) {
    return this.find({pass: password})
}

module.exports = mongoose.model('Users', usersModel)