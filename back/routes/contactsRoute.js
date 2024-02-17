const express = require('express')
const {
    getContacts,
    createContact,
    getContactById,
    updateContactById,
    deleteContactById,
    logger
} = require('../controllers/contacts.js')

const router = express.Router()

router.use((req, res, next) => {
    console.log('invoked at ', Date.now().toLocaleString())
    next()
})

router.route('/').get(logger, getContacts)

router.route('/').post(logger, createContact)

router.route('/:id').get(getContactById)

router.route('/:id').put(updateContactById)

router.route('/:id').delete(deleteContactById)

module.exports = router