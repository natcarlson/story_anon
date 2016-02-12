// -----------------------------------
// ****** Modules + Middleware! ******
// -----------------------------------
var express = require('express');
var app = express();

var morgan = require('morgan');
app.use( morgan('dev') );

app.use(express.static('./client_public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var loadUser = require('./server_private/middleware/loadUser');
app.use(loadUser);

app.set('view engine', 'ejs');

var mongoPath = 'mongodb://localhost/story_anon';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);




// ----------------------
// ****** Routing! ******
// ----------------------

//Consumer

//Index view
var index = require('./server_private/routes/pages/index');
app.use('/', index);

//Stories view
var allStories = require('./server_private/routes/pages/allstories');
app.use('/allstories', allStories);

//User Stories view
var userStories = require('./server_private/routes/pages/userstories');
app.use('/userstories', userStories);

//About view
var about = require('.server_private/routes/pages/about');
app.use('/about', about);


//Service

//API
var users = require('./server_private/routes/api/users');
api.use('/api/users', users);

var stories = require('./server_private/routes/api/stories');
app.use('/api/stories', stories);




// ---------------------
// ****** Listen! ******
// ---------------------
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('this ship has sailed on port ' + port);
});
