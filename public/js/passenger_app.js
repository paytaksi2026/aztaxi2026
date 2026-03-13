
let map = L.map('map').setView([40.4093,49.8671],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

const sheet=document.getElementById("sheet");

let startY=0;
let dragging=false;

sheet.addEventListener("pointerdown",(e)=>{
 dragging=true;
 startY=e.clientY;
});

window.addEventListener("pointermove",(e)=>{

 if(!dragging) return;

 let diff=e.clientY-startY;

 if(diff>0){
   sheet.style.transform="translateY("+diff+"px)";
 }

});

window.addEventListener("pointerup",()=>{

 if(!dragging) return;

 dragging=false;

 const rect=sheet.getBoundingClientRect();

 if(rect.top>window.innerHeight-200){
   sheet.style.transform="translateY(280px)";
 }else{
   sheet.style.transform="translateY(0px)";
 }

});
