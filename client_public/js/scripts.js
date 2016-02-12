console.log('..... loaded .....');




//----------  CREATE NEW USER FUNCTIONS  ----------//

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

function setCreateUserFormHandler() {
    $('form#user-signup-form').on('submit', function(e) {
        e.preventDefault();

        var formObj = $(this).serializeObject();
        console.log(formObj);

        $('#user-signup-modal').closeModal();
        createUser(formObj, function(user) {
          console.log("form response:", user);
          // $("#user-signup-form").val();
        });
    });
}




$(function() {
  setCreateUserFormHandler();

  $('.modal-trigger').leanModal();
});
