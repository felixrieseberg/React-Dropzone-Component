'use strict';
var express = require('express');
var router = express.Router();
var uploadManager = require('./uploadManager')
    uploadManager.initUploadRouter(router);
 
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
 
module.exports = router;