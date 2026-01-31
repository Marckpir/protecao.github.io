






window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoanalisehtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    // Controle de acesso movido para controle-acesso.js

    //--persistir os valores ajustados no html
    const numeroNSInput = document.getElementById("numeroNS");
    if (numeroNSInput) {
        const numeroNSSalvo = localStorage.getItem("numeroNS");
        if (numeroNSSalvo) {
            numeroNSInput.value = numeroNSSalvo;
        }
    }

    const nota4Select2 = document.getElementById("nota4-select");
    if (nota4Select2) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select2.value = nota4Salva;
        }
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        const matriculaSalva = localStorage.getItem("matriculadotecnico");
        if (matriculaSalva) {
            matriculaInput.value = matriculaSalva;
        }
    }

    //------------------------------------------------------

    // Preencher os campos com os valores do localStorage
    const tensaoAtendimento = localStorage.getItem("tensaoSelecionada");
    const demandaConsumo = localStorage.getItem("demandadecontrato");
    const potenciaGerador = localStorage.getItem("potenciaGDcontratada");



    const geradorJSON = localStorage.getItem("geradorJSON");
    const potenciaDiesel = geradorJSON ? JSON.parse(geradorJSON).potencia : null;


    const anoAtual = new Date().getFullYear();


    if (tensaoAtendimento) {
        document.getElementById("tensao-atendimento").innerText = tensaoAtendimento + " KV;";
    }

    if (demandaConsumo) {
        document.getElementById("demanda-consumo").innerText = demandaConsumo + " KW;";
    }

    if (potenciaGerador && potenciaGerador !== "0" && potenciaGerador !== "0.0") {
        document.getElementById("potencia-GD").innerText = potenciaGerador + " KW;";
        document.getElementById("campoGD").style.display = "";
    } else {
        document.getElementById("campoGD").style.display = "none";
    }


    // if (potenciaGerador) {
    //     document.getElementById("potencia-GD").innerText = potenciaGerador + " KVA";
    // }


    if (potenciaDiesel) {
        document.getElementById("potencia-gerador").innerText = potenciaDiesel + " KVA;";
        document.getElementById("campogeradordiesel").style.display = "";
    } else {
        document.getElementById("campogeradordiesel").style.display = "none";
    }


    // Preencher nsedata com valor de numeroNS, se não houver valor deixa 
    const numeroNS = 'PROJETO NS :' + (localStorage.getItem("numeroNS") + '/' + anoAtual || '' + '/' + anoAtual) + ';';
    document.getElementById("nsedata").innerText = numeroNS;


    // Preencher nota4
    const nota4Select = document.getElementById("nota4");
    if (nota4Select) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select.textContent = 'TRATA-SE DE : ' + nota4Salva + ';';
        } else {
            nota4Select.textContent = 'TRATA-SE DE : COORDENOGRAMA;';
        }
    }


    // Preencher nsselo com valor de numeroNS
    const nsselo = document.getElementById("nsselo");
    if (nsselo) {
        const numeroNSValue = localStorage.getItem("numeroNS");
        nsselo.innerText = numeroNSValue ? numeroNSValue : "";
    }


    // Preencher aprovadorselo com valor de matriculadotecnico
    const aprovadorselo = document.getElementById("aprovadorselo");
    if (aprovadorselo) {
        const matriculaTecnico = localStorage.getItem("matriculadotecnico");
        if (matriculaTecnico) {
            aprovadorselo.innerText = 'Por ' + matriculaTecnico + ' às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' , ' + new Date().toLocaleDateString();
        } else {
            aprovadorselo.innerText = "";
        }
    }


    // Preencher total dos transformadores com valor do localStorage
    const potenciaTotalTrafos = localStorage.getItem("potenciatotaltrafos");
    const totalTransformadores = document.getElementById("total-transformadores");
    if (totalTransformadores) {
        if (potenciaTotalTrafos) {
            totalTransformadores.innerText = "TOTAL DOS TRANSFORMADORES: " + potenciaTotalTrafos + " KVA;";
        } else {
            totalTransformadores.innerText = "";
        }
    }








};



function salvarOpcao() {


    const numeroNS = document.getElementById("numeroNS").value;
    localStorage.setItem("numeroNS", numeroNS);
    console.log("numeroNS salvo:", numeroNS);

    const nota4Select = document.getElementById("nota4-select");
    if (nota4Select) {
        localStorage.setItem("tipodeanalise", nota4Select.value);
        console.log("tipodeanalise salvo:", nota4Select.value);
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        localStorage.setItem("matriculadotecnico", matriculaInput.value);
        console.log("matricula salva:", matriculaInput.value);
    }

    // Atualizar a página para recarregar os dados salvos
    location.reload();

}




//funçao para buscar contatos no arquivo listaRTs.txt

let contatos = [];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

// Carrega o arquivo automaticamente
fetch('listaRTs.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);

        contatos = lines.map(line => {
            // Divide por espaços
            const partes = line.split(/\s+/);

            // Regex para identificar email e telefone
            const email = partes.find(p => /\S+@\S+\.\S+/.test(p));
            const telefone = partes.find(p => /\(\d{2}\)\d{4,5}-\d{4}/.test(p));

            // Remove email e telefone do array para sobrar só o nome
            const nome = partes.filter(p => p !== email && p !== telefone).join(' ');

            return { nome, email, telefone };
        });

        searchInput.disabled = false;
        searchBtn.disabled = false;
        resultsDiv.innerHTML = '<div>✅ Arquivo carregado. Agora pesquise pelo nome.</div>';
    })
    .catch(() => {
        resultsDiv.innerHTML = '<div>❌ Erro ao carregar o arquivo de contatos.</div>';
    });

searchBtn.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = '';
    if (query.length === 0) return;

    const filtered = contatos.filter(c =>
        (c.nome && c.nome.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query)) ||
        (c.telefone && c.telefone.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = '<div>Nenhum contato encontrado.</div>';
        return;
    }

    filtered.forEach(c => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
                    <div style="text-align: left;"><strong>Nome:</strong> ${c.nome || '—'}</div>
                    <div style="text-align: left;"><strong>Email:</strong> ${c.email || '—'}</div>
                    <div style="text-align: left;"><strong>Telefone:</strong> ${c.telefone || '—'}</div>
                `; resultsDiv.appendChild(item);
    });

    if (filtered.length > 0) {
        // Armazena o primeiro contato encontrado no localStorage
        var contato = filtered[0];
        localStorage.setItem('contato_nome', contato.nome || '');
        localStorage.setItem('contato_email', contato.email || '');
        localStorage.setItem('contato_telefone', contato.telefone || '');
    }




});

// gerarcarta();
//fim da funçao buscar contatos no arquivo listaRTs.txt





//funções para gerar a carta de correções rápidas




// function gerarcarta() {
const numeroNS2 = localStorage.getItem('numeroNS');
if (numeroNS2) {
    const assuntoEmail = document.getElementById('assuntoemail');
    if (assuntoEmail) {
        assuntoEmail.textContent = 'Assunto: Inconformidades' + ` NS ${numeroNS2}`;
    }
}

function adicionarItem() {
    const section = document.getElementById('projeto-eletrico');
    const newRow = document.createElement('div');
    newRow.className = 'item-row';
    newRow.style.marginBottom = '16px';

    const number = document.createElement('div');
    number.className = 'item-number';

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Novo item...";
    textarea.style.textAlign = "left";

    // Carrega texto salvo se existir
    const itemsSalvos = JSON.parse(localStorage.getItem('itensProjetoEletrico') || '[]');
    textarea.value = itemsSalvos[section.children.length] || '';

    // Salva ao digitar
    textarea.addEventListener('input', function () {
        const items = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(items));
    });

    newRow.appendChild(number);
    newRow.appendChild(textarea);
    section.appendChild(newRow);

    atualizarNumeracao();
}

// Carrega itens salvos ao iniciar
document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('projeto-eletrico');
    const itemsSalvos = JSON.parse(localStorage.getItem('itensProjetoEletrico') || '[]');
    itemsSalvos.forEach(() => adicionarItem());
});

// Atualiza localStorage ao remover item
function removerUltimoItem() {
    const section = document.getElementById('projeto-eletrico');
    const items = section.querySelectorAll('.item-row');
    if (items.length > 0) {
        section.removeChild(items[items.length - 1]);
        // Atualiza localStorage
        const textos = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(textos));
        atualizarNumeracao();
    }
}

function removerUltimoItem() {
    const section = document.getElementById('projeto-eletrico');
    const items = section.querySelectorAll('.item-row');
    if (items.length > 0) {
        // Limpa o valor do último textarea antes de remover
        const lastTextarea = items[items.length - 1].querySelector('textarea');
        if (lastTextarea) lastTextarea.value = '';
        section.removeChild(items[items.length - 1]);
        // Atualiza localStorage
        const textos = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(textos));
        atualizarNumeracao();
    }
}


function atualizarNumeracao() {
    const items = document.querySelectorAll('#projeto-eletrico .item-row');
    items.forEach((item, index) => {
        const number = item.querySelector('.item-number');
        number.textContent = `${index + 1})`;
    });
}





document.addEventListener('DOMContentLoaded', function () {
    const nome = localStorage.getItem('contato_nome');
    if (nome) {
        document.getElementById('contato-nome').textContent = nome;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const email = localStorage.getItem('contato_email');
    if (email) {
        document.getElementById('email-texto').textContent = email;
    }
});


const numeroNS = localStorage.getItem('numeroNS');
if (numeroNS) {
    document.getElementById('numero-ns').textContent = numeroNS;
}


function obterSaudacao() {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
}
document.getElementById('saudacao').textContent = obterSaudacao();


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 35;
    const saudacao = document.getElementById('saudacao').textContent;
    const nome = document.getElementById('contato-nome').textContent;
    doc.text(`${saudacao}, ${nome}.`, 20, y, { maxWidth: 170, align: "justify" });

    y += 10;
    const numeroNS = document.getElementById('numero-ns').textContent;
    doc.text(
        `Durante a análise da(s) NS(s) ${numeroNS}, foram identificados alguns itens necessários para alteração na solcitação para que a aprovação seja concluída. Segue itens de correção à serem observados:`,
        20, y, { maxWidth: 170, align: "justify" }
    );

    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("", 20, y);
    doc.setFont("helvetica", "normal");

    y += 8;
    const items = document.querySelectorAll('#projeto-eletrico .item-row textarea');
    items.forEach((textarea, idx) => {
        const text = `${idx + 1}) ${textarea.value}`;
        const lines = doc.splitTextToSize(text, 165);
        doc.text(lines, 25, y, { maxWidth: 165, align: "justify" });
        y += (lines.length * 6) + 4; // Altura dinâmica baseada no número de linhas
    });

    y += 5;
    doc.text("Com exceção das alterações solicitadas acima, não deverá ser realizada nenhuma outra mudança.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Informamos que, caso necessário, esse e-mail se encontra disponível para resoluções de dúvidas relacionadas à nota de serviço em questão.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Pedimos que se possível, informar telefone e e-mail de contato atualizado do responsável técnico.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    y += 10;
    doc.text("Informamos que o prazo limite para as alterações solicitadas é de 24 horas.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Para que haja liberação do projeto elétrico aprovado, após alterações efetuadas no mesmo, favor anexar os novos arquivos diretamente no APRWEB. Salientamos a importância de que essas alterações sejam feitas de forma imediata.", 20, y, { maxWidth: 170, align: "justify" });

    y += 15;
    doc.setFontSize(11);
    y += 10;
    doc.text(" ", 20, y); // Espaço para separar o parágrafo

    y += 6;
    doc.text("Att.", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("Núcleo Técnico", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("Processos Especiais de Expansão e Manutenção de Média e Baixa Tensão – PE/EM", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("www.cemig.com.br", 20, y, { maxWidth: 170, align: "justify" });

    doc.save("Carta_de_correcoes_rapidas.pdf");
}

// Adiciona o botão para gerar PDF
const pdfBtn = document.createElement('button');
pdfBtn.textContent = "PDF";
pdfBtn.style.backgroundColor = "#27ae60";
pdfBtn.style.color = "white";
pdfBtn.style.border = "none";
pdfBtn.style.borderRadius = "6px";
pdfBtn.style.padding = "10px 18px";
pdfBtn.style.cursor = "pointer";
pdfBtn.style.fontSize = "14px";
pdfBtn.onclick = gerarPDF;

document.querySelector('.action-panel').appendChild(pdfBtn);

// Adiciona jsPDF via CDN se não estiver presente
if (!window.jspdf) {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => { };
    document.head.appendChild(script);
}
// }
//fim das funções para gerar a carta de correções rápidas












// Event listener para capturar Enter em qualquer lugar da página
document.addEventListener('keydown', function (event) {
    // Verificar se a tecla pressionada é Enter (código 13 ou 'Enter')
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Evitar comportamento padrão (submissão de formulário)
        event.preventDefault();

        // Chamar a função salvar
        salvarOpcao();

        // Executar a pesquisa de contato
        searchBtn.click();

        // Exibir o evento da pesquisa de contato
        resultsDiv.style.display = 'block';

    }
});


//---LOGICA PARA PREENCHER TABELA DA OPERAÇÃO--------------------------------------

const demandaContrato = parseFloat(localStorage.getItem("demandadecontrato"));
const dialdimensionado = parseFloat(localStorage.getItem("dialfaseSelecionada"));
const notaOperacao = document.getElementById("nota-operacao");
if (notaOperacao) {
    if (demandaContrato < 1500 && dialdimensionado >= 1) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    } else if (demandaContrato >= 1500 && demandaContrato < 4000 && dialdimensionado >= 0.4) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    } else if (demandaContrato >= 4000 && dialdimensionado > 0.2) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    }
}

// in-operacao
// alimentador-operacao
// tensao-operacao

// ip51-operacao
// curva-operacao
// dial-operacao
// iinst50-operacao

// ip51n-operacao
// tempodefinido-operacao
// iinst50n-operacao



const inOperacao = document.getElementById("in-operacao");
const UCgemini = localStorage.getItem("UCgemini");
if (inOperacao && UCgemini) {
    inOperacao.textContent = UCgemini;
}


const alimentadorOperacao = document.getElementById("alimentador-operacao");
const alimentadorGemini = localStorage.getItem("ALIMENTADORgemini");
if (alimentadorOperacao && alimentadorGemini) {
    alimentadorOperacao.textContent = alimentadorGemini;
}


const tensaoOperacao = document.getElementById("tensao-operacao");
const tensaoSelecionada = localStorage.getItem("TENSAOgemini");
if (tensaoOperacao && tensaoSelecionada) {
    tensaoOperacao.textContent = tensaoSelecionada + " KV";
}

const ip51Operacao = document.getElementById("ip51-operacao");
const ipDeConsumo = parseFloat(localStorage.getItem("Ipdeconsumo"));
if (ip51Operacao && ipDeConsumo) {
    ip51Operacao.textContent = ipDeConsumo.toFixed(2) + " A";
}


const curvaOperacao = document.getElementById("curva-operacao");
const curvaFaseSelecionada = localStorage.getItem("curvafaseSelecionada");
if (curvaOperacao && curvaFaseSelecionada) {
    curvaOperacao.textContent = curvaFaseSelecionada;
}


const dialOperacao = document.getElementById("dial-operacao");
const dialFaseSelecionada = localStorage.getItem("dialfaseSelecionada");
if (dialOperacao && dialFaseSelecionada) {
    dialOperacao.textContent = dialFaseSelecionada;
}

const iinst50Operacao = document.getElementById("iinst50-operacao");
const instFaseConsumo = parseFloat(localStorage.getItem("Instfaseconsumo"));
if (iinst50Operacao && instFaseConsumo) {
    iinst50Operacao.textContent = instFaseConsumo.toFixed(2) + " A";
}

const ip51nOperacao = document.getElementById("ip51n-operacao");
const ipDeNeutro = parseFloat(localStorage.getItem("IpdeneutroSelecionada"));
if (ip51nOperacao && ipDeNeutro) {
    ip51nOperacao.textContent = ipDeNeutro.toFixed(2) + " A";
}


const tempodefinidoOperacao = document.getElementById("tempodefinido-operacao");
const dialNeutroSelecionada = localStorage.getItem("dialneutroSelecionada");
if (tempodefinidoOperacao && dialNeutroSelecionada) {
    tempodefinidoOperacao.textContent = dialNeutroSelecionada + " s";
}

const iinst50nOperacao = document.getElementById("iinst50n-operacao");
const instNeutroSelecionada = parseFloat(localStorage.getItem("IinstneutroSelecionada"));
if (iinst50nOperacao && instNeutroSelecionada) {
    iinst50nOperacao.textContent = instNeutroSelecionada.toFixed(2) + " A";
}







// --------------------------------------------------------------// 
// Código para gerar a curva tempo inverso em SVG
// Esta função gera uma curva de tempo
// Função para gerar a curva tempo inverso em SVG da animação
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
// --------------------------------------------------------------
// Fim do Js do SVG
