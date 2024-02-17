const express = require('express')
const {
    getContacts,
    createContact,
    getContactById,
    updateContactById,
    deleteContactById
} = require('../controllers/contacts.js')

const router = express.Router()

// router.use((req, res, next) => {
//     console.log('invoked at ', Date.now().toLocaleString())
//     next()
// })

router.route('/').get(getContacts)

router.route('/').post(createContact)

router.route('/:id').get(getContactById)

router.route('/:id').put(updateContactById)

router.route('/:id').delete(deleteContactById)

module.exports = router