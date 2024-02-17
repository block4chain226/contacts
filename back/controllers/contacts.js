const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactsModel.js')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    if (!contacts) {
        res.status(404)
        throw new Error('contacts dont find')
    }
    res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('all fields are mandatory')
    }
    const newContact = new Contact({
        name: name,
        email: email,
        phone: phone
    })
    newContact.save()
    res.status(201).json({message: 'contact was created', name})
})

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('contact not found')
    }
    res.status(200).json({message: `get contact with id${req.params.id}`, contact})
})

const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({message: 'updated contact', contact})
})

const deleteContactById = asyncHandler(async (req, res) => {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'deleted ', contact: deletedContact})
})

module.exports = {getContacts, createContact, getContactById, updateContactById, deleteContactById}