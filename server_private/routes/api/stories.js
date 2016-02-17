// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var Story = require('../../models/story');
var User = require('../../models/user')




// --------------------
// ****** ROUTE! ******
// --------------------
router.use(function(req, res, next) {
  if(!req.user) {
    console.log('no user');
    res.json({status: 302})
  } else {
    console.log('user, you are legit!');
    next();
  }
});


//----------  GET ALL STORIES  ----------//
router.get('/', function(req, res) {
  Story.find({}, function(err, databaseStories) {
    res.json({stories: databaseStories});
  });
});


//----------  GET ONLY A SINGLE USER'S STORIES  ----------//

router.get('/:id', function (req, res) {
  Story.find({userId: req.params.id}, function (err, databaseUser) {
    res.json(databaseUser);
  });
});

// router.get('/'), function(req, res) {
//   Story.find({}, function(err, databaseStories) {
//     res.json({stories: databaseStories});
//   });
// });


//----------  CREATE NEW STORY  ----------//
router.post('/', function(req, res) {
  var storyData = req.body;
  var newStory = new Story(storyData);
  console.log('here is the story', req.body);
  console.log('user data VVVV', req.user);
  newStory.username = req.user.username
  debugger
  newStory.save(function(err, databaseStory) {
    console.log(err);
    res.json(databaseStory);
    console.log('user, your story has been created successfully. yeah!!!!');
  });
});




// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
