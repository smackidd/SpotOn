const mongoose = require('mongoose')
const { stringify } = require('querystring')

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true }
})


module.exports = mongoose.model('User', userSchema);