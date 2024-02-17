const mongoose = require('mongoose')
// require('dotenv').config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`database ${connection.connection.name} is connected on host ${connection.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB