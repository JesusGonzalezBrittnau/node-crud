// load environment variables
require('dotenv').config();

// grab our dependencies
const express        = require('express');
    app              = express();
    port             = process.env.PORT||8080;
    dbHost           = process.env.DB_URI;
    expressLayouts   = require('express-ejs-layouts');
    mongoose         = require('mongoose');
    bodyParser       = require('body-parser');
    session          = require('express-session');
    cookieParser     = require('cookie-parser');
    flash            = require('connect-flash');
    expressValidator = require('express-validator');



// configure our application =====================

//set session and cookie parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 60000},
    resave: false, // forces the session to be saved back to the store
    saveUninitialized: false // don't save unmodified sessions
}));
app.use(flash());

//tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as templating =====================
app.set('view engine', 'ejs');
app.use(expressLayouts);


// This use is because of warning: "DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is ..."
// this is not part of the course on scotch.io
mongoose.Promise = global.Promise;
// connect to our DB
mongoose.connect(dbHost);

// use boy-parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())

// set the routes =====================
app.use(require('./app/routes'));

//noinspection BadExpressionStatementJS
// start our server =====================
app.listen(port, () => {
    console.log(`Server started on Database=${dbHost} on localhost:${port}`)
});

