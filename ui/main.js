
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make request to server
    var request=new XMLHttpRequest();
    //capture list
    request.onreadystateChange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                
                alert('log in successful');
                }
                else if(request.status===403)
                alert('incorrect');
                else if(request.status===500)
                alert('server prob');

        }
    };
  
  var username=document.getElementById('username').value;
  var password=document.getElementById('password').value;
  console.log(username);
  console.log(password);
  var name=nameInput.value;
  
  request.open('POST','http://swathigl.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,password:password}));
};