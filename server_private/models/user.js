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




// -----------------------------
// ****** Authentication! ******
// -----------------------------
UserSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.authenticate = function(passwordTry, callback) {
  bcrypt.compare(passwordTry, this.password, function(err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch);
  });
};

UserSchema.methods.setToken = function(callback) {
  var scope = this;
  crypto.randomBytes(256, function(err, rawToken) {
    scope.token = rawToken;
    scope.save(function() {
      callback();
    });
  });
};





// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = mongoose.model('User', UserSchema);
