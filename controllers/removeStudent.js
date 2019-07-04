const Student = require('../models/student')

module.exports = (req, res, next) => {
    var studentId = req.params.id

    Student.remove({ _id: studentId }, (err) => {
        if (err) {
            res.json({ "err": err });
        } else {
            res.redirect('/studentlist/asc')
        }
    })
}