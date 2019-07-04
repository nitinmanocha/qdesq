const mongoose = require('mongoose')
const path = require('path')
const express = require('express')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const bodyParser = require('body-parser')
const newStudentController = require('./controllers/newStudent')
const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')
const loginPageController = require('./controllers/loginPage')
const addStudentController = require('./controllers/addStudent')
const deleteController = require('./controllers/removeStudent')
const updatedSuccessController = require('./controllers/updatedSuccess')
const updateController = require('./controllers/update')
const searchController = require('./controllers/search')
const studentlistController = require('./controllers/studentlist')
const auth = require('./middleware/auth')
const mongoStore = connectMongo(expressSession)
const edge = require('edge.js')
const app = express()
const Admin = require('./models/admin')
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://qdesqdb:qdesqdbpassword@qdesq-v4fog.mongodb.net/test?retryWrites=true&w=majority').catch((err)=>console.log(JSON.stringify(err)))



app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })

}))

app.use(express.static('public'))
app.use(require('express-edge'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectFlash())
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.adminId)
    next()
})
app.set("views", path.join(__dirname, './views'));



app.get('/signup', auth, newStudentController)
app.get('/', loginPageController)
app.get('/logout', auth, logoutController)
app.get('/update/:id', auth, updateController)
app.get('/studentlist/:type', auth, studentlistController)
app.get('/student/delete/:id', auth, deleteController)





app.post('/studentlist/search', auth, searchController)
app.post('/admin/login', loginController)
app.post('/student/register', addStudentController)
app.post('/student/update/:id', updatedSuccessController)


//Create Admin Page 

app.get('/add/admin', (req, res) => {
    res.render('addadmin')
})


// To create admin creddentials manually for test purpose

app.post('/admin/add', (req, res) => {
    Admin.create(req.body, (err, admin) => {
        if (err) {
            console.log(err)
            res.redirect('/')
        } else {
            console.log(req.body)
            res.redirect('/')
        }
    })
})






app.use('*', (req, res) => {

    res.send("Page Not Found. Error 404")
})

app.listen(PORT, () => {
    console.log('server started at 3000')
});