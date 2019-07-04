const Admin = require('../models/admin')

module.exports = (req, res, next) => {

    Admin.findById(req.session.adminId, (err, admin) => {
        if (err || !admin) {
            res.redirect('/')
        } else {
            next()
        }
    })

}