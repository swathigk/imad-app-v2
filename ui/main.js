console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='new value';
//move the image

var img=document.getElementById('madi');
img.onClick=function(){
    img.style.marginLeft='100px';
};