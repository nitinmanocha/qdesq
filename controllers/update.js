const Student = require('../models/student')

module.exports = (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        console.log(student)
        res.render('updateStudent', {
            student
        })
    })
}