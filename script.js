const canvas = document.getElementById("canvas");
const aumenta = document.getElementById("aumentar");
const diminui = document.getElementById("diminuir");
const tamanho = document.getElementById("tamanho");
const cor = document.getElementById("cor");
const limpa = document.getElementById("limpar");
const comeca = document.getElementById("comeca");
const aux = canvas.getContext("2d");
const texto = document.getElementById("textoEscolha");
const menu = document.getElementById("teste");
const texto2= document.getElementById("texto");

let tamPincel= 5;
let isPres = false;
let isPresInicia = false;
let corInicial= "black";
let x= undefined;
let y= undefined;

var contador = undefined;
var time = document.getElementById("tempo");
var lista= ["Ednaldo Pereira","Pão","Uva","Ovo","Maçã","Suco","Pudim","Vinho","Cebola","Cereja","Pipoca","Picolé","Abacaxi","Cerveja",
"Coxinha","Ketchup","Laranja","Brócolis","Calabresa","Chantilly","Chocolate","Espetinho","Pão de alho","Rosquinha","Mel","Açaí","Carne","Leite",
"Torta","Vodca","Abacate","Abóbora","Bolacha","Morango","Suspiro","Waffle","Amendoim","Macarrão","Maionese","Pirulito","Pimentão","Presunto","Vitamina",
"Almôndega"];
var max= lista.length;

canvas.addEventListener("mousedown", (e) => {  //mouse dentro do canvas
    isPres = true;

    x = e.offsetX;
    y= e.offsetY;
});

canvas.addEventListener("mouseup",(e) => { //mouse fora do canvas
    isPres = false;

    x= e.offsetX;
    y= e.offsetY;

});

canvas.addEventListener("mousemove", (e) => { //mouse pressionado dentro do canvas
    if(isPres && isPresInicia){
        const x2= e.offsetX;
        const y2= e.offsetY;
        desenhaCirculo(x2,y2);
        desenhaLinha(x,y,x2,y2);
        x= x2;
        y= y2;
    }
});

function desenhaCirculo(x, y){ //função para desenhar os circulos
    aux.beginPath();
    aux.arc(x, y, tamPincel, 0, Math.PI * 2);
    aux.fillStyle = corInicial;
    aux.fill();
}

function desenhaLinha(x,y,x2,y2){ //Função que desenha no mouse e segue
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle= corInicial;
    ctx.lineWidth= tamPincel * 2;
    ctx.stroke();
}

aumenta.addEventListener("click", () => { //aumentar o tamanho do pincel
    tamPincel += 5;

    if(tamPincel > 50){
        tamPincel = 50;
    }
    tamanho.innerText= tamPincel;
});

diminui.addEventListener("click", () => { //diminuir o tamanho do pincel
    tamPincel -= 5;

    if(tamPincel < 5){
        tamPincel = 5;
    }
    tamanho.innerText= tamPincel;
});

cor.addEventListener("change", (e) => { //Muda a cor do pincel
    corInicial= e.target.value;
});

comeca.addEventListener("click", () => { // pressionar o botão start
    if(isPresInicia){

    }
    else{
        isPresInicia = true;
        texto.style.display= "inline";
        aux.clearRect(0,0,canvas.width, canvas.height);
        contador= 60;
        texto.innerHTML= lista[escolhePalavra()];
        ativaAnimacao();
        iniciaCrono();
    }
});


limpa.addEventListener("click", () => { // limpar todo o canvas no X
    aux.clearRect(0,0,canvas.width, canvas.height);
});


function iniciaCrono() { //Iniciar o cronometro
    if (contador > 0){
        contador -= 1;
        if (contador == 0) {
            isPresInicia = false;
            texto.style.display= "none";
            desativaAnimacao();
        }else if(contador < 10){
            contador = "0" + contador;
        }
        time.innerHTML = contador;
        setTimeout(iniciaCrono, 1000); //fica chamando a cada 1 segundo
    }
}

function ativaAnimacao(){
    setTimeout(() => canvas.style.animation= "animacao 1s infinite");
    setTimeout(() => menu.style.animation= "animacaoMenu 1s infinite");
    setTimeout(() => texto.style.animation= "animacaoTexto 1s infinite");
    setTimeout(() => texto2.style.animation= "animacaoTexto 1s infinite");
}

function desativaAnimacao(){
    canvas.style.animation = "none";
    texto.style.animation= "none";
    texto2.style.animation= "none";
    menu.style.animation="none";
}

function escolhePalavra(){
    return Math.floor(Math.random()*max);
} 

