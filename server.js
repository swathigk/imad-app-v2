var express=require('express');
var morgan=require('morgan');
var path=require('path');

var app=express();
app.use(morgan('combined'));

app.get('/',function(req,res){
res.sendFile(path.join(_dirname,'ui','index.html'));
});

app.get('/ui/style.css',function(req,res){
res.sendFile(path.join(_dirname,'ui','style.css'));
});

app.get('/ui/modi.png',function(req,res){
res.sendFile(path.join(_dirname,'ui','modi.png'));
});

var port=8080;
app.listen(8080,function(){
console.log("IMAD course listening on $(port)");
});
