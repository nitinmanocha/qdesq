// Update Student Record

const Student = require('../models/student')

module.exports = (req, res) => {
    let student = {};
    student.name = req.body.name;
    student.email = req.body.email;
    student.semester = req.body.semester;
    student.course = req.body.course;
    student.lastUpdated = new Date();

    Student.update({ _id: req.params.id }, student, (err) => {
        if (err) {
            console.log(err + 'occured')

        } else {
            console.log('updated!!')
            res.redirect('/studentlist/asc')
        }
    })

}