const logger = require('./logging/logger')
const express = require('express');
const app = express();
// Import Passport
var passport = require('passport');
var session = require("express-session"); // In Express 4.x, the Connect middleware is no longer included in the Express core

require('./startup/routes')(app);
// require('./startup/db')();
// require('./startup/validation')();

//Passport
require('./config/passport')(passport);
// required for passport
// secret for session
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
//     // //store session on MongoDB using express-session + connect mongo
//     // store: new MongoStore({
//     //     url: config.url,
//     //     collection: 'sessions'
//     // })
// }));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
//app.use(passport.session());



//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));