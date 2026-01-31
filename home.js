
    function verificarLogin() {
      const user = document.getElementById("usuario").value;
      const pass = document.getElementById("senha").value;

      if ((user === "usuario") && pass === "12345") {
        localStorage.setItem("usuario", user); // Armazena o usuário no localStorage
        window.location.href = "Protecao_parametros.html";
        
        return false;
      } else {
        alert("Login ou senha incorretos.");
        return false;
      }







    }





    function gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos) {
      let d = "";
      let primeiro = true;
      for (let i = 0; i <= pontos; i++) {
        let corrente = iMin + (iMax - iMin) * (i / pontos);
        let denominador = Math.pow(corrente / ip, alfa) - k;
        if (denominador <= 0) continue;
        let tempo = dial * (beta / denominador);
        if (tempo > 1000) tempo = 1000; // Limite para visualização
        let svgX = 50 + (corrente - iMin) * 500 / (iMax - iMin);
        let svgY = 350 - (tempo * 300 / 1000);
        if (primeiro) {
          d += `M${svgX},${svgY}`;
          primeiro = false;
        } else {
          d += ` L${svgX},${svgY}`;
        }
      }
      return d;
    }

    // Parâmetros do exemplo
    const dial = 90000;
    const beta = 300;
    const alfa = 2;
    const k = 1;
    const ip = 0.5;
    const iMin = ip * 2.01; // Começa um pouco acima de ip
    const iMax = 300;
    const pontos = 1000;

    const dInverso = gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos);

    const svg = document.querySelector("svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "curva-inversa");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#ff0080");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-dasharray", "1000");
    path.setAttribute("stroke-dashoffset", "1000");
    path.setAttribute("d", dInverso);
    svg.appendChild(path);

    
    
    
