const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


AdminSchema.pre('save', function(next) {

    const admin = this

    bcrypt.hash(admin.password, 10, (err, encrypted) => {
        admin.password = encrypted
        next()
    })
})

module.exports = mongoose.model('Admin', AdminSchema)