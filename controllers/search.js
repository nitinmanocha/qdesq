const Student = require('../models/student')

module.exports = (req, res) => {
    var query = {}
    if (req.body.search) {
        query = {
            name: new RegExp('^' + req.body.search + '$', "i"),
            email: new RegExp('^' + req.body.search + '$', "i")
        }
    }
    Student.find({
            $or: [{ "name": { "$regex": req.body.search, "$options": "i" } },
                { "email": { "$regex": req.body.search, "$options": "i" } }
            ]
        },

        function(err, student) {
            if (err) {
                console.log('cant find anything, error')
            } else {
                res.render('search', {
                    student
                })
            }
        }
    )
}