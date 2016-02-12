// ----------------------
// ****** Modules! ******
// ----------------------
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');




// ---------------------
// ****** Schema! ******
// ---------------------
var UserSchema = mongoose.Schema( {
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  token: {type: String}
});




// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = mongoose.model('User', UserSchema);
