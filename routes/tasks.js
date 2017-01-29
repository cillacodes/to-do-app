var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
  database: 'task-list'
};

var pool = new pg.Pool(config);





module.exports = router;
