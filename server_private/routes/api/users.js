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
  var userData = req.body;
  var newUser = new User(userData);
  console.log(req.body);


  newUser.save(function(err, databaseUser) {
    res.json(databaseUser);
  });
});


router.post('/authenticate', function(req, res) {
  console.log('Authenticate Tried', req.body);
  var usernameTry = req.body.username;
  var passwordTry = req.body.password;
  User.findOne({username: usernameTry}, function(err, databaseUser) {
    console.log('Found a user', databaseUser);
    databaseUser.authenticate(passwordTry, function(err, isMatch) {
      if(isMatch) {
        databaseUser.setToken(function() {
          res.json({description: 'password is correct', token: databaseUser.token});
          console.log('password is correct', databaseUser.token);
        });
      } else {
        res.json({description: 'password is wrong'});
      }
    });
  });
});



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
