var express = require('express');// create webservices
var morgan = require('morgan'); //help us output logs,response and all
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'swathigk',
    database:'swathigk',
    host:'db.imad.hasura-app.io',
    port:'5432',
//    password:process.env.DB_PASSWORD
    password:'db-swathigk-40622'
};

var app = express();
app.use(morgan('combined'));

var articles={
 'article-one': {
        title: 'Article one | Swathi',
        heading: 'Article one',
        date:   '25th feb 2017',
        content: `<p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    
                    
                    Hello
                    Hai
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.
                    
                    Hello
                    Hai
                </p>`
    },
    'article-two':{
        title: 'Article two | Swathi',
        heading: 'Article two',
        date:   '26th feb 2017',
        content: `<p>
                    This is the content for my 2 article.This is the content for my first article.This is the content for my first article</p>.`
            
    },
    'article-three':{
        title: 'Article 3 | Swathi',
        heading: 'Article 3',
        date:   '27th feb 2017',
        content: `
                    <p>
                    This is the content for my 3 article.This is the content for my 3 article.This is the content for my 3 article.
                  </p>.`
        
    }
};

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
})

//when this url is reuqested this fn will execute
app.get('/article/:articlename',function(req,res){
    //article name is article one
    //var articlename=req.params.articlename;
    //var articleData 
    pool.query("SELECT *FROM article WHERE title="+req.params.articlename,function(err,result){
        if(err){
            
        
        res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('article not found');
            }
                else
                {
                    var articleData=result.rows[0];
                    res.send(createTemplate(articleData));
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
