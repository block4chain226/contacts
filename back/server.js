const express = require('express')
const errorHandle = require('./middleware/errorHandle.js')
const contractRoutes = require('./routes/contactsRoute.js')
const connectDB = require("./config/db");
const path = require('path')
const usersRoutes = require('./routes/usersRoutes.js')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

connectDB()
const app = express()
const PORT = process.env.PORT || 8000

// for req.body
app.use(express.json())

app.use(express.static('./public'))

// app.use((req, res, next) => {
//     console.log('1')
//     next()
// })
//
// app.use((req, res, next) => {
//     console.log('3')
//     next()
// })
app.use('/api/contacts', contractRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHandle)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))