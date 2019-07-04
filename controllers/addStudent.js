const Student = require('../models/student')

module.exports = (req, res) => {
    Student.create(req.body, (err, student) => {

        if (err) {
            console.log(err)
            res.redirect('/signup')
        } else {
            console.log(req.body)
            res.redirect('/studentlist/asc')
        }
    })
}