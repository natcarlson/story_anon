// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();



// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res) {
  res.render('allstories');
});




// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
