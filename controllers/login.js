const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

module.exports = (req, res) => {

    const { email, password } = req.body;

    Admin.findOne({ email }, (err, admin) => {
        if (admin) {
            bcrypt.compare(password, admin.password, (err, same) => {

                if (same) {
                    req.session.adminId = admin._id
                    res.redirect('/signup')

                } else {
                    res.end('Wrong Password')
                }

            })
        } else {
            res.end('Wrong Email')
        }


    })
}