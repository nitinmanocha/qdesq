const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    semester: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: new Date().toString()
    }
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student