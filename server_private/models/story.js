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
  username: {type: String, required: true},
  title: {type: String},
  story: {type: String},
  date: {type: String},
  tags: {
    tag1: {type: String},
    tag2: {type: String},
    tag3: {type: String}
  },
  public: {type: String}
});



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = mongoose.model('Story', StorySchema);
