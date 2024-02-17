const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {type: String, required: [true, 'enter name...']},
    email: {type: String, required: [true, 'enter email...']},
    phone: {type: String, required: [true, 'enter phone...']}
}, {timestamp: true})

module.exports = mongoose.model('Contact', contactSchema)