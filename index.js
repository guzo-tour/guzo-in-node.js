require('dotenv').config();
const express = require('express')
const jwt = require("jsonwebtoken");
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const sessions = require('express-session');
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')

const app = express()

const Router = require('./routes/routes')

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');	

app.use(express.static(`${__dirname}/public`))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

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

//Rest api
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute');
const reviewRouter = require('./routes/reviewRoute');
const bookingRouter = require('./routes/bookingRoute');
const viewRouter = require('./routes/viewsRoute');

app.use('/', viewRouter);
app.use('/user',userRouter);
app.use('/tour',tourRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);