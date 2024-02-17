const express = require('express')
const {registerUser, getUsers, getUserById, deleteUserById, loginUser} = require('../controllers/users.js')

const router = express.Router()

router.route('/register').post(registerUser)

router.route('/').get(getUsers)

router.route('/:id').get(getUserById)

router.route('/login').post(loginUser)

router.route('/:id').delete(deleteUserById)

module.exports = router
