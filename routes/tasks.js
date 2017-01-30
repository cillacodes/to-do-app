var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = { database: 'tasklist' };

var pool = new pg.Pool(config);

router.get('/', function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connectiong to DB', err);
      res.sendStatus(500);
      done();
    } else {

      client.query('SELECT * FROM tasks;', function(err, result) {
        done();
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        } else {
          console.log('Got rows from DB', result.rows);
          res.send(result.rows);

        }
      });
    }
  });
});//end of router.get


router.post('/', function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connectiong to DB', err);
      res.sendStatus(500);
      done();
    } else {

      client.query(
        'INSERT INTO tasks (todo, completed) VALUES ($1, $2) RETURNING *;',
        [req.body.insertTask, req.body.completed],
        function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got info from DB', result.rows);
            res.send(result.rows);

          }
        })
        // );
      } //end else
    }); //end pool.connect
  }); //end of router.post


router.put('/:id', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('UPDATE tasks SET todo=$2, completed=$3 WHERE id = $1 RETURNING *',
      [req.params.id, req.body.insertTask, req.body.completed],
      function(err, result) {
        done();
        if (err) {
          console.log('Error deleting todo', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
})

router.delete('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('DELETE FROM tasks WHERE id = $1',
      [req.params.id],
      function(err, result){
        done();
        if (err) {
          console.log('Error deleting todo', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});



module.exports = router;
