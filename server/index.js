var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/user-info', function (req, res) {
  const user = req.query.username;
  items.selectAll(user, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/add-to-likes', (req, res) => {
  items.insertInfo(req.body, res)
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

