require('dotenv').config();
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const sessions = require('express-session');

const app = express()

const Router = require('./routes/routes')

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');	

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const SECRET_TOKEN = process.env.SECRET_TOKEN || "shh, its a secret"

app.use(sessions({
    secret: SECRET_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use('/', Router)



const PORT = process.env.PORT || 5050

app.listen(PORT,()=>{
    console.log(`Server running on http:/localhost:${PORT}`);
})