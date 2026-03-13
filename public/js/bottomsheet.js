
const sheet=document.querySelector('.app-panel');
let startY=0;
let currentY=0;
let dragging=false;

if(sheet){
 sheet.insertAdjacentHTML("afterbegin","<div class='sheet-handle'></div>");
}

sheet.addEventListener("pointerdown",(e)=>{
 dragging=true;
 startY=e.clientY;
});

window.addEventListener("pointermove",(e)=>{

 if(!dragging) return;

 currentY=e.clientY;
 let diff=currentY-startY;

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
