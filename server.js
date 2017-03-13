var express = require('express');// create webservices
var morgan = require('morgan'); //help us output logs,response and all
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config={
    user:'swathigk',
    database:'swathigk',
    host:'db.imad.hasura-app.io',
    port:'5432',
   // password:process.env.DB_PASSWORD
   password:'db-swathigk-40622'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


function createtemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
    var htmltemplate=`<html>
      <head>
          <title>
              ${title} 
          </title>
          <meta name="viewport" content="width-device-width,initial-scale-1"/>
          <link href="/ui/style.css" rel="stylesheet" />
         
      </head>  
        <body>
            <div class="container">
                <div>
                    <a href="/">HOME</a>
                </div>
            </hr>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
               
               ${content}
        
            </div>
            </div>
        </body>
        
        
    </html>
`;
return htmltemplate;
}



//handle specific url '/' we use sendfiel func
app.get('/', function (req, res) {            
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash(input,salt){
    
    //how to create hash
    //default lib crypto
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2',10000,salt,hashed.toString('hex')].join('$');//convert binary to string type
    
    //algorithm:md5

    
}


app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    //JSON request
    
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.getrandomBytes(128).toString('hex');
    var dbSring=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('created'+username);
        }
    });
});

var pool=new Pool(config);
app.get('/test-db',function(req,res)
{

    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        res.status(500).send(err.toString());
        else
        res.send(JSON.stringify(result.rows));
        
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});


var names=[];
app.get('/submit-name/:name',function(req,res){
    //get name from reuqest obj
    var name=req.query.name;//1000
    names.push(name);
    res.send(JSON.stringify(names));
});

//when this url is reuqested this fn will execute
app.get('/articles/:articleName',function(req,res){
    //article name is article one
    //var articlename=req.params.articlename;
    //var articleData 
    pool.query("SELECT * FROM article WHERE title=$1", [req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else {
            if(result.rows.length === 0){
                res.status(404).send('article not found');
            }else{
                    var articleData=result.rows[0];
                    res.send(createtemplate(articleData));
                }
            }
        });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
