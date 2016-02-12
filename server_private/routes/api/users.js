// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var User = require('../../models/user');




// --------------------
// ****** Route! ******
// --------------------

//Create new user
router.post('/', function(req, res) {
  // var userData = req.body.user;
  var newUser = new User(req.body);
  newUser.save(function(err, dbUser) {
    console.log('err', err);
    console.log('dbUser:', dbUser);
    res.json(dbUser);
    // res.redirect('/');
  });
});



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
