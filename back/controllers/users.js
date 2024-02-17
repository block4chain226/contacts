const Users = require('../models/usersModel.js')
const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()
    if (!users) {
        res.status(404)
        throw new Error('users dont find')
    }
    res.status(200).json({message: 'all users', users})
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('user dont find')
    }
    res.status(200).json({message: `user with id ${user._id}`, user})
})

const loginUser = asyncHandler(async (req, res) => {
    const {login, pass} = req.body
    if (!login || !pass) {
        res.status(400)
        throw new Error('you should enter login and password')
    }
    const user = await Users.findOne({login: login, pass: pass})
    if (!user) {
        res.status(400)
        throw new Error(`invalid credentials`)
    }
    res.status(200).json({message: `${user.login} logged in`, username: user.name, login: user.login})
})

const registerUser = asyncHandler(async (req, res) => {
    const {name, login, email, pass} = req.body
    if (!name || !login || !email || !pass) {
        res.status(400)
        throw new Error('you didnt enter all needed data')
    }
    const loginExists = await Users.findByLogin(login)
    if (loginExists.length) {
        res.status(400)
        throw new Error(`user with login ${login} already exists`)
    }
    const newUser = new Users({name, login, email, pass})
    newUser.save()
    res.status(201).json({message: 'user was created successfully', newUser})
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await Users.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('user dont find')
    }
    res.status(200).json({message: `user with id ${user._id} was deleted`, user})
})


module.exports = {registerUser, getUsers, getUserById, deleteUserById, loginUser}