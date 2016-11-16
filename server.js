// load environment variables
require('dotenv').config();

// grab our dependencies
const express      = require('express');
    app            = express();
    port           = process.env.PORT||8080;
    dbHost         = process.env.DB_URI;
    expressLayouts = require('express-ejs-layouts');
    mongoose       = require('mongoose');
    bodyParser     = require('body-parser');


// configure our application =====================
//tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as templating =====================
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to our DB
mongoose.connect(dbHost);

// use boy-parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));

// set the routes =====================
app.use(require('./app/routes'));

//noinspection BadExpressionStatementJS
// start our server =====================
app.listen(port, () => {
    console.log(`Server started on ${dbHost}:${port}`)
});

