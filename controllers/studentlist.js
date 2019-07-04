const Student = require('../models/student')

module.exports = (req, res) => {
    let query = req.params.type;
    if (query == 'asc') {
        Student.find().sort({ name: '1' }).exec(function(err, Student) {
            if (!err) {
                res.render('studentlist', {
                    Student
                })
            }

        });
    } else if (query == 'des') {
        Student.find().sort({ name: '-1' }).exec(function(err, Student) {
            if (!err) {
                res.render('studentlist', {
                    Student
                })
            }

        });

    } else {
        res.end('Error 404. Page Not Found.')
    }
}