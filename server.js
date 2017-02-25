var express = require('express');// create webservices
var morgan = require('morgan'); //help us output logs,response and all
var path = require('path');

var app = express();
app.use(morgan('combined'));

//handle specific url '/' we use sendfiel func
app.get('/', function (req, res) {            
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//when this url is reuqested this fn will execute
app.get('/article-one',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
