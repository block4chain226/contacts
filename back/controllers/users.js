const Users = require('../models/usersModel.js')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    const user = await Users.findOne({login: login})
    if (user || await bcrypt.compare(user.pass, pass)) {
        const token = await jwt.sign({
            username: user.name,
            login: user.login
        }, process.env.TOKEN_SECRET, {expiresIn: '2m'})
        res.status(200).json({message: `${user.login} logged in`, token: token})
    } else {
        res.status(401)
        throw new Error('invalid credentials')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const {name, login, email, pass} = req.body
    if (!name || !login || !email || !pass) {
        res.status(400)
        throw new Error('you didnt enter all needed data')
    }
    const loginExists = await Users.findOne({login})
    if (loginExists) {
        res.status(400)
        throw new Error(`user with login ${login} already exists`)
    }
    const passwordHash = await bcrypt.hash(pass, 10)
    const newUser = new Users({name, login, email, pass: passwordHash})
    newUser.save()
    console.log("=>(users.js:50) newUser", newUser);
    if (newUser) {
        res.status(201).json({message: 'user was created successfully', id: newUser.id})
    } else {
        res.status(400)
        throw new Error('user was not created')
    }

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