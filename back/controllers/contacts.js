const getContacts = (req, res) => {
    res.status(200).json({message: 'get all contacts...'})
}

const createContact = (req, res, next) => {
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('all fields are mandatory')
    }
    res.status(201).send('[1, 2, 3]')
}

const getContactById = (req, res) => {
    res.status(200).json({message: `get contact with id${req.params.id}`})
}

const updateContactById = (req, res) => {
    res.status(200).json({message: 'update...'})
}

const deleteContactById = (req, res) => {
    res.status(200).json({message: 'delete...'})
}

const logger = (req, res, next) => {
    console.log('logger...')
    next()
}

module.exports = {getContacts, createContact, getContactById, updateContactById, deleteContactById, logger}