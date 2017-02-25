var express = require('express');// create webservices
var morgan = require('morgan'); //help us output logs,response and all
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
 articleone= {
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
    articletwo:{
        title: 'Article two | Swathi',
        heading: 'Article two',
        date:   '26th feb 2017',
        content: `<p>
                    This is the content for my 2 article.This is the content for my first article.This is the content for my first article</p>.`
            
    },
    articlethree:{
        title: 'Article 3 | Swathi',
        heading: 'Article 3',
        date:   '27th feb 2017',
        content: `
                    <p>
                    This is the content for my 3 article.This is the content for my 3 article.This is the content for my 3 article.
                  </p>.`
                  `
                
        
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

//when this url is reuqested this fn will execute
app.get('/article-one',function(req,res){
    res.send(createtemplate(articleone));
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
