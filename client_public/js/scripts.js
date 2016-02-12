console.log('..... loaded .....');




//----------  CREATE NEW USER FUNCTIONS  ----------//
//
// //Ajax call to post new user data in users api
function createUser(userData, callback) {
  $.ajax( {
    method: 'post',
    url: '/api/users',
    data: userData,
    success: function(data) {
      callback(data);
    }
  });
}
//
// //Obtain new user data from #user-signup-form
function setCreateUserFormHandler(){
  $(document).ready(function(){
      $('#user-signup-form').on('submit', function(e) {
        console.log(e)
          e.preventDefault();

          var formObj = $(this).serializeObject();
          console.log(formObj);

          $('#user-signup-modal').closeModal();
          createUser(formObj, function(user) {
            console.log("form response:", user);
            // $("#user-signup-form").val();
            $( '#user-signup-form' ).each(function(){
              this.reset();
            });
        });
    });
  })
}




//----------  USER LOGIN FUNCTIONS  ----------//

//Ajax call to post user login data, authenticate, get token
function logIn(usernameTry, passwordTry, callback) {
  $.ajax( {
    method: 'post',
    url: '/api/users/authenticate',
    data: { username: usernameTry, password: passwordTry },
    success: function(data) {
      $.cookie('token', data.token);
      console.log('token', data.token);
      callback(data);
    }
  });
}

//Obtain user login data from #user-login-form
function setLogInFormHandler() {
  $('form#user-login-form').on('submit', function(e) {
    e.preventDefault();

    var usernameField = $(this).find('input[name="username"]');
    var usernameTry = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name="password"]');
    var passwordTry = passwordField.val();
    passwordField.val('');

    logIn(usernameTry, passwordTry, function(data) {
      console.log('log in complete? ', data);
      window.location="/allstories"
    });
  });
}




//----------  USER LOGOUT FUNCTIONS  ----------//

//Logout user
function setLogOutHandler() {
  $('#log-out').on('click', function(e) {
    e.preventDefault();
    $.removeCookie('token');
    window.location="/";
    // updateStoriesAndViews();
  });
}




//----------  CREATE STORY FUNCTIONS  ----------//

function createStory(storyData, callback) {
  // callback = callback || function(){};
  $.ajax( {
    method: 'post',
    url: '/api/stories',
    data: storyData,
    success: function(data) {
      callback(data);
      console.log('success!', data);
      // var story = data.story;

    }
  });
}

function setNewStoryFormHandler() {
  $('#new-story-form').on('submit', function(e) {
    e.preventDefault();
    var formObj = $(this).serializeObject();
    console.log(formObj);

    $('#new-story-form').closeModal();
    createStory(formObj, function(story) {
      console.log("form response: ", formObj);
      $('#new-story-form').each(function() {
        this.reset();
      });
    });
  });
}

    // var storyData = formObj;
    // createStory(storyData, function(story) {
    //   updateStoriesAndViews();
      //}



// $('#user-signup-modal').closeModal();
// createUser(formObj, function(user) {
//   console.log("form response:", user);
//   // $("#user-signup-form").val();
//   $( '#user-signup-form' ).each(function(){
//     this.reset();
//   });









$(function() {
  setCreateUserFormHandler();
  setLogInFormHandler();
  setLogOutHandler();
  setNewStoryFormHandler();

  $('.modal-trigger').leanModal();

});
