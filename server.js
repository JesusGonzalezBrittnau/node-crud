// load environment variables
require('dotenv').config();

// grab our dependencies
const express      = require('express');
    app            = express();
    port           = process.env.PORT||8080;
    expressLayouts = require('express-ejs-layouts');
    mongoose       = require('mongoose');


// configure our application =====================
//tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as templating =====================
app.set('view engine', 'ejs');
app.use(expressLayouts);

// set the routes =====================
app.use(require('./app/routes'));

// connect to our DB
mongoose.connect(process.env.DB_URI);

//noinspection BadExpressionStatementJS =====================
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

