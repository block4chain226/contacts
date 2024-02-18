const mongoose = require('mongoose')

const usersModel = mongoose.Schema({
    name: {type: String, required: true},
    login: {type: String, required: true, unique: [true, 'email already taken']},
    email: {type: String, required: true, unique: [true, 'email already taken']},
    pass: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Users', usersModel)