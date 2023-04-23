const boton = document.querySelector('.boton')

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

const dias = document.querySelector('.dia')
const diasResultado = document.querySelector('.diastexto')

const meses = document.querySelector('.mes')
const mesesResultado = document.querySelector('.mesestexto')

const años = document.querySelector('.años')
const añosResultado = document.querySelector('.añostexto')

document.querySelectorAll('input').forEach((elemento)=>{
  elemento.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
    }
  })
})

document.querySelectorAll('input').forEach((elemento)=>{
  elemento.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
      calcularFecha()
    }
  })
})

boton.addEventListener('click', ()=>{
  calcularFecha()
})

//La funcion que corre todo

function calcularFecha() {
  if(dias.value == ""){
    dias.value = 0;
  }
  if(meses.value == ""){
    meses.value = 0;
  }
  if(años.value == ""){
    años.value = 0;
  }

  let dia = Number(verificarDia(dias.value))
  let mes = Number(verificarMes(meses.value))
  let año = Number(verificarAño(años.value))

  let añobiciesto = añoBiciesto(año)

  dia = verificarMesesCompletos(mes,dia)[2]
  let mesLargo = verificarMesesCompletos(mes,dia)[2]

  if(añobiciesto[0] == true){
    if((mes == 2 && dia > 29)){
      dia = "error"
    }
  }

  if(añobiciesto[0] == false){
    if((mes == 2 && dia >= 29)){
      dia = "error"
    }
  }

  let diasTotal = day - Number(dia);
  let mesesTotal = month - Number(mes);
  let añosTotal = year - Number(año);

  if(diasTotal < 0){
    mesesTotal--;
    diasTotal = diasTotal*(-1);
    if(mesLargo[0]==true){
      diasTotal = 30-diasTotal;
    }else if(mesLargo[1]==true){
      diasTotal = 31-diasTotal;
    }else if(añobiciesto[1]==true){
      diasTotal = 29-diasTotal;
    }else if(añobiciesto[2]==true){
      diasTotal = 28-diasTotal;
    }
  }

  if(mesesTotal < 0){
    añosTotal--;
    mesesTotal = mesesTotal*(-1);
    mesesTotal = 12-mesesTotal;
  }

  diasTotal = verificarDia(diasTotal)
  mesesTotal = verificarMes(mesesTotal)
  añosTotal = verificarAño(añosTotal)

  if(añosTotal < 0 || diasTotal == "error" || mesesTotal == "error" || añosTotal == "error"){
    diasTotal = "--"
    mesesTotal = "--"
    añosTotal = "--"
    error()
  }

  añosResultado.innerHTML = añosTotal+" ";
  mesesResultado.innerHTML = mesesTotal+" ";
  diasResultado.innerHTML = diasTotal+" ";
}



//Verificar año Biciesto y el mes de 28 o 29 dias
function añoBiciesto(año) {
  let añoBiciesto = false;
  let mes29=false;
  let mes28=false;

  if(año % 400 == 0){
    añoBiciesto = true;
    mes29=true;
  }else if(año % 4 == 0 && año % 100 != 0){
    añoBiciesto = true;
    mes29=true;
  }else{
    añoBiciesto = false;
    mes28=true;
  }

  return [añoBiciesto, mes29, mes28];
}

//Verificar Meses de 30 y 31 dias
function verificarMesesCompletos(mes, dia) {
  let mes30=false;
  let mes31=false;

  if((mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) && dia >=0 && dia<=31){
    mes31=true;
  }

  if((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31){
    dia = "error"
  }

  if((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 0 && dia <=30){
    mes30=true;
  }

  return [mes30,mes31,dia]
}

//Error
function error() {
  let errorColor = "hsl(0, 100%, 67%)";
  textos = document.querySelectorAll('.texto')
  for (let i = 0; i < textos.length; i++) {
    textos[i].style.color = errorColor;
  }
  setTimeout(() => {
    for (let i = 0; i < textos.length; i++) {
      textos[i].style.color = 'hsl(0, 1%, 44%)';
    }
  }, 1000);
  textoOculto = document.querySelectorAll('.ocultar')
  for (let i = 0; i < textos.length; i++) {
    textoOculto[i].classList.toggle('ocultar')
  }
  setTimeout(() => {
    for (let i = 0; i < textos.length; i++) {
      textoOculto[i].classList.toggle('ocultar')
    }
  }, 1000);
}

//Verificar input de las fechas
function verificarDia(dia) {
  if(!(dia >= 0 && dia <= 31)){
    dia = "error"
  }
  return dia
}

function verificarMes(mes) {
  if(!(mes >= 0 && mes <= 12)){
    mes = "error"
  }
  return mes
}

function verificarAño(año) {
  if(!(año >= 0)){
    año = "error"
  }
  return año
}
