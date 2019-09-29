const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
// var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/users', (req, res, next) => {
  console.log(req.body);
  if (req.body.id === '123') {
    res.send({
      name: 'Andy',
      age: 29
    });
  }
});

app.post('/users/friends', (req, res, next) => {
  res.send([{
    name: 'zhangsan',
    age: 28
  }, {
    name: 'lisi',
    age: 22
  }, {
    name: 'wangwu',
    age: 30
  }]);
});

app.listen(3000, () => console.log('server is listening on port 3000'));