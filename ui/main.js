var button=document.getElementById('counter');

button.onclick=function(){
//make a request to counter endpoint
var request=new XMLHttpRequest();


//capture response and store
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }
};

//render the variable in the correct span
request.open('GET','http://swathigk.imad.hasura-app.io/counter',true);
request.send(null);
};
