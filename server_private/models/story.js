// ----------------------
// ****** Modules! ******
// ----------------------
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');




// ---------------------
// ****** Schema! ******
// ---------------------
var StorySchema = mongoose.Schema( {
  title: {type: String},
  story: {type: String},
  date: {type: String},
  tags: {type: String},
  public: {type: String}
});



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = mongoose.model('Story', StorySchema);
