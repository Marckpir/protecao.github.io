
let kva1formatada=0;
let qtde1formatada=0;
let imin1formatada=0;
let intrafo1formatada=0;
let imagtr1formatada=0;

let kva2formatada=0;
let qtde2formatada=0;
let imin2formatada=0;
let intrafo2formatada=0;
let imagtr2formatada=0;

let imagtotalformatada=0;
let imagtotalneutroformatada=0;

 function salvarOpcao() {
//salvar todas as potencias em KVA em variaveis dentro do script
    const kvatrafo1 = document.getElementById("potenciahtml1");
    const kvatrafo1Selecionada = kvatrafo1.value;

    const kvatrafo2 = document.getElementById("potenciahtml2");
    const kvatrafo2Selecionada = kvatrafo2.value;

//salvar todas as qtde em variaveis dentro do script
    const qtdetrafo1 = document.getElementById("qtdehtml1");
    const qtdetrafo1Selecionada = qtdetrafo1.value;

    const qtdetrafo2 = document.getElementById("qtdehtml2");
    const qtdetrafo2Selecionada = qtdetrafo2.value;

//salvar todas as qtde em variaveis dentro do script
    const ztrafo1 = document.getElementById("impedanciahtml1");
    const ztrafo1Selecionada = ztrafo1.value;

//salvar todas os fatores IMIN em variaveis dentro do script
    const imintrafo1 = document.getElementById("fatoriminhtml");
    const imintrafo1Selecionada = imintrafo1.value;

    const imintrafo2 = document.getElementById("fatoriminhtm2");
    const imintrafo2Selecionada = imintrafo2.value;

//salvar todas os tempos em variaveis dentro do script
    const Ttrafo1 = document.getElementById("tempotrhtml1");
    const Ttrafo1Selecionada = Ttrafo1.value;






//salvar todas as potencias em KVA em variaveis dentro do local storage
    localStorage.setItem("kvatrafo1Selecionada", kvatrafo1Selecionada);
    localStorage.setItem("kvatrafo2Selecionada", kvatrafo2Selecionada);
    
//salvar todas as potencias em QTDE em variaveis dentro do local storage
    localStorage.setItem("qtdetrafo1Selecionada", qtdetrafo1Selecionada);
    localStorage.setItem("qtdetrafo2Selecionada", qtdetrafo2Selecionada);

//salvar todas as potencias em Z em variaveis dentro do local storage
    localStorage.setItem("ztrafo1Selecionada", ztrafo1Selecionada);
//salvar todas as potencias em IMIN em variaveis dentro do local storage
    localStorage.setItem("imintrafo1Selecionada", imintrafo1Selecionada);
    localStorage.setItem("imintrafo2Selecionada", imintrafo2Selecionada);

//salvar todas as potencias em T em variaveis dentro do local storage
    localStorage.setItem("Ttrafo1Selecionada", Ttrafo1Selecionada);

    


    location.reload();//recarrega a página sempre que o botão é clicado
   
    }




//Carregar nos campos do HTML todos os valores calculados e armazenados no local storage
window.onload = function () {
     calculos();
//carregar todas as potencias em KVA em variaveis dentro do local storage para o script
    const labelp1 = document.getElementById("potenciahtml1");
    const kvatrafo1Armazenado = localStorage.getItem("kvatrafo1Selecionada");
    if (kvatrafo1Armazenado) {labelp1.value = kvatrafo1Armazenado;}

    const labelp2 = document.getElementById("potenciahtml2");
    const kvatrafo2Armazenado = localStorage.getItem("kvatrafo2Selecionada");
    if (kvatrafo2Armazenado) {labelp2.value = kvatrafo2Armazenado;}

//carregar todas as qtde variaveis dentro do local storage para o script
    const labelqtde1 = document.getElementById("qtdehtml1");
    const qtdetrafo1Armazenado = localStorage.getItem("qtdetrafo1Selecionada");
    if (qtdetrafo1Armazenado) {labelqtde1.value = qtdetrafo1Armazenado;}

    const labelqtde2 = document.getElementById("qtdehtml2");
    const qtdetrafo2Armazenado = localStorage.getItem("qtdetrafo2Selecionada");
    if (qtdetrafo2Armazenado) {labelqtde2.value = qtdetrafo2Armazenado;}

//carregar todas as z variaveis dentro do local storage para o script
    const label3 = document.getElementById("impedanciahtml1");
    const ztrafo1Armazenado = localStorage.getItem("ztrafo1Selecionada");
    if (ztrafo1Armazenado) {label3.value = ztrafo1Armazenado;}


//carregar todas os fatores imin variaveis dentro do local storage para o script
    const labeimin1 = document.getElementById("fatoriminhtml");
    const imintrafo1Armazenado = localStorage.getItem("imintrafo1Selecionada");
    if (imintrafo1Armazenado) {labeimin1.value = imintrafo1Armazenado;}

    const labeimin2 = document.getElementById("fatoriminhtm2");
    const imintrafo2Armazenado = localStorage.getItem("imintrafo2Selecionada");
    if (imintrafo2Armazenado) {labeimin2.value = imintrafo2Armazenado;}

//carregar todas os fatores imin variaveis dentro do local storage para o script
    const label5 = document.getElementById("tempotrhtml1");
    const Ttrafo1Armazenado = localStorage.getItem("Ttrafo1Selecionada");
    if (Ttrafo1Armazenado) {label5.value = Ttrafo1Armazenado;}



//carregar todas as IN variaveis no HTML
    const labelin1 = document.getElementById("intrhtml1");
    const intr1Armazenado = parseFloat(localStorage.getItem("intrafo1Selecionada"));
    if (intr1Armazenado) {labelin1.textContent = intr1Armazenado.toFixed(2) + " A";}

    const labelin2 = document.getElementById("intrhtml2");
    const intr2Armazenado = parseFloat(localStorage.getItem("intrafo2Selecionada"));
    if (intr2Armazenado) {labelin2.textContent = intr2Armazenado.toFixed(2) + " A";}

//carregar todas as imag variaveis no HTML
    const labelimag1 = document.getElementById("imagtrhtml1");
    const inimtr1Armazenado = parseFloat(localStorage.getItem("imagtrafo1Selecionada"));
    if (inimtr1Armazenado) {labelimag1.textContent = inimtr1Armazenado.toFixed(2) + " A";}

    const labelimag2 = document.getElementById("imagtrhtml2");
    const inimtr2Armazenado = parseFloat(localStorage.getItem("imagtrafo2Selecionada"));
    if (inimtr2Armazenado) {labelimag2.textContent = inimtr2Armazenado.toFixed(2) + " A";}




//carregar imag total no HTML
    const label91 = document.getElementById("imagtotal");
    const imagtotalArmazenado = parseFloat(localStorage.getItem("imagtotalSelecionada"));
    if (imagtotalArmazenado) {label91.textContent = imagtotalArmazenado.toFixed(2) + " A";}

//carregar imag total do neutro no HTML
    const label92 = document.getElementById("imagtotalneutro");
    const imagtotalneutroArmazenado = parseFloat(localStorage.getItem("imagtotalneutroSelecionada"));
    if (imagtotalneutroArmazenado) {label92.textContent = imagtotalneutroArmazenado.toFixed(2) + " A";}


    



   
   


}





function calculos(){

    //Corrente nominal trafos
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));
    const kvatrafo1Armazenada = parseFloat(localStorage.getItem("kvatrafo1Selecionada"));
    const inimtrafo1Armazenada = parseFloat(localStorage.getItem("imintrafo1Selecionada"));
    const desequilibrioSelecionada = parseFloat(localStorage.getItem("desequilibrioSelecionada"));

    const kvatrafo2Armazenada = parseFloat(localStorage.getItem("kvatrafo2Selecionada"));
    const inimtrafo2Armazenada = parseFloat(localStorage.getItem("imintrafo2Selecionada"));




    
    
   


    intrafo1formatada = (kvatrafo1Armazenada/(tensaoArmazenada*Math.sqrt(3)));


    imagtr1formatada = intrafo1formatada*inimtrafo1Armazenada;

    intrafo2formatada = (kvatrafo2Armazenada/(tensaoArmazenada*Math.sqrt(3)));


    imagtr2formatada = intrafo2formatada*inimtrafo2Armazenada;


    console.log("in do trafo 1:" + intrafo1formatada);



    



//Soma a maior IMAG  e a nominal dos demais trafos
    imagtotalformatada = imagtr1formatada + 0;


    


    
    imagtotalneutroformatada=imagtotalformatada * (desequilibrioSelecionada/100);



    localStorage.setItem("intrafo1Selecionada", intrafo1formatada);
    localStorage.setItem("imagtrafo1Selecionada", imagtr1formatada);


    localStorage.setItem("intrafo2Selecionada", intrafo2formatada);
    localStorage.setItem("imagtrafo2Selecionada", imagtr2formatada);


    localStorage.setItem("imagtotalSelecionada", imagtotalformatada);
    localStorage.setItem("imagtotalneutroSelecionada", imagtotalneutroformatada);

}