console.log('..... loaded .....');




//----------  CREATE NEW USER FUNCTIONS  ----------//

//Ajax call to post new user data in users api
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

//Obtain new user data from #user-signup-form
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
      $.cookie('userId', data.userId)
      console.log('id', data.userId)
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
    $.removeCookie('userId');
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
    formObj['userId'] = $.cookie()['userId']

    $('#new-story-form').each(function() {
      this.reset();
    });

    $('#new-story-form').closeModal();
    createStory(formObj, function(story) {
      console.log("form response: ", formObj);
      // $("#new-story-form").val();
      // $('#new-story-form').each(function() {
      //   this.reset();
      // });
    });

    getUserStories() 
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




//----------  RENDER ALL STORIES FUNCTIONS  ----------//

function getAllStories(callback) {
  // callback = callback || function(){};
  $.ajax( {
    url: '/api/stories',
    success: function(data) {
      renderAllStories(data)
    }
  });

}

function renderAllStories(data) {
  var source = $("#allstories-template").html();
  var template = Handlebars.compile(source);
  var allStories = template(data);
  console.log(data)
  $('#allstories').html(allStories);
}



function handlebarsHelper(){
  Handlebars.registerHelper('grouped_each', function(every, context, options){
    var out = "", subcontext = [], i;
    if (context && context.length > 0){
      for (i=0; i < context.length; i++){
        if (i>0 && i % every === 0){
          out += options.fn(subcontext);
          subcontext = [];
        }
        subcontext.push(context[i]);
      }
      out += options.fn(subcontext);
    }
    return out;
  });
}
  // $(document).ready;
    // $list.empty();
    // var story;
    // for (var i = 0; i < stories.length; i++) {
    //   story = stories[i];
    //   $storyView = renderStory(story);
    //   $list.append($storyView);
    // }

  // });


function updateAllStoriesAndViews() {
  $(document).ready(function() {
    getAllStories()
      // $('#allstories').empty();
      // var allStoriesElement = renderAllStories(stories);
      // $('#allstories').append(allStoriesElement);
    if($.cookie('token')) {
      $('.user-only').show();
    } else {
      $('.user-only').hide();
    }
  });
}




//----------  RENDER A SINGLE USER'S STORIES FUNCTIONS  ----------//

function getUserStories() {
  // callback = callback || function(){};
  var currentUser = $.cookie('userId');
  $.ajax( {
    url: '/api/stories/' + currentUser,
    success: function(data) {
      renderUserStories(data)
    }
  });

}

function renderUserStories(data) {
  var source = $("#userstories-template").html();
  var template = Handlebars.compile(source);
  var userStories = template(data);

  $('#userstories').html(userStories);
}

function updateUserStoriesAndViews() {
  $(document).ready(function() {
    getUserStories()
      // $('#allstories').empty();
      // var allStoriesElement = renderAllStories(stories);
      // $('#allstories').append(allStoriesElement);
    if($.cookie('token')) {
      $('.user-only').show();
    } else {
      $('.user-only').hide();
    }
  });
}



// function handlebarsHelper(){
//   Handlebars.registerHelper('grouped_each', function(every, context, options){
//     var out = "", subcontext = [], i;
//     if (context && context.length > 0){
//       for (i=0; i < context.length; i++){
//         if (i>0 && i % every === 0){
//           out += options.fn(subcontext);
//           subcontext = [];
//         }
//         subcontext.push(context[i]);
//       }
//       out += options.fn(subcontext);
//     }
//     return out;
//   });
// }
  // $(document).ready;
    // $list.empty();
    // var story;
    // for (var i = 0; i < stories.length; i++) {
    //   story = stories[i];
    //   $storyView = renderStory(story);
    //   $list.append($storyView);
    // }

  // });









$(function() {
  setCreateUserFormHandler();
  handlebarsHelper();
  setLogInFormHandler();
  setLogOutHandler();
  setNewStoryFormHandler();
  updateAllStoriesAndViews();
  updateUserStoriesAndViews();

  $('.modal-trigger').leanModal();

});
