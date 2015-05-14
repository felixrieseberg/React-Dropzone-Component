var express = require('express'),
    multer  = require('multer')

var app = express()
app.use("/example", express.static(__dirname + '/example'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/',[ multer({ dest: './uploads/'}), function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
}]);


app.listen(3000);