module.exports = (req, res) => {

    res.render('newstudent', {
        data: req.flash('data')
    })
}