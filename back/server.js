const express = require('express')
const errorHandle = require('./middleware/errorHandle.js')
const contractRoutes = require('./routes/contactsRoute.js')

const app = express()

// for req.body
// app.use(express.json())

app.use(express.static('./public'))

app.use('/api/contacts/:id', (req, res, next) => {
    console.log('ID')
    next()
})

app.use('/api/contacts', contractRoutes)
app.use(errorHandle)

app.listen(8008, () => console.log(`http://localhost:8008`))