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


var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make request to server
    
    //capture list
    var names=['name2','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++)
    list='<li'+names[i]+'</li>';
}
var ul=document.getElementById('namelist');
ul.innerHTML=list;