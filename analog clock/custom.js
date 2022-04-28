const hourHand = document.querySelector('.hour');
const minHand = document.querySelector('.min');
const secHand = document.querySelector('.sec');

function setClock() {
  const date = new Date();
  const seconds = date.getSeconds()/60
  const minutes = (seconds + date.getMinutes())/60
  const hours = (minutes + date.getHours())/12

  setRotate(secHand, seconds)
  setRotate(minHand, minutes)
  setRotate(hourHand, hours)
};
function setRotate(e, rotation) {
  e.style.setProperty('--rot', rotation * 360)
};

setClock();
setInterval(setClock, 1000);

//============================================================


function leftPad(number){
  if(number < 10){
      return `0${number}`;
  }
  return number;
};

function setText(selector,text){
  const targetElement = document.querySelector(selector);
  if(!targetElement){
      return;
  }
  targetElement.innerText = text;
};

function setTxt(){
  const textDate = new Date();
  const h = leftPad(textDate.getHours());
  const m = leftPad(textDate.getMinutes());
  const s = leftPad(textDate.getSeconds());

  setText("#h",h);
  setText("#m",m);
  setText("#s",s);
}


setTxt();
setInterval(setTxt, 1000);