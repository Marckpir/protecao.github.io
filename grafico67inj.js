// Importa statuslegenda do localStorage ou usa valor padrão
var legenda = localStorage.getItem('statuslegenda') || 'top';

window.onload = function () {
    ChartGenerator();
}

// Função para geração do gráfico
function ChartGenerator() {
    
    // Verificar se o canvas existe
    const canvas = document.getElementById('grafico');
    if (!canvas) {
        console.error('Canvas com id "grafico" não encontrado');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico existente se houver
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }
    
    // Datasets vazios para inserção manual de pontos
    const datasets = [];
    
    // Importar valores do localStorage
    const x1 = JSON.parse(localStorage.getItem('pontosCurvaFaseX')) || [];
    const y1 = JSON.parse(localStorage.getItem('pontosCurvaFaseY')) || [];
    const x2 = JSON.parse(localStorage.getItem('pontosCurvaNeutroX')) || [];
    const y2 = JSON.parse(localStorage.getItem('pontosCurvaNeutroY')) || [];
    
    // Importar valores específicos do localStorage
    const correnteprimaria = parseFloat(localStorage.getItem('Inominalfase')) || 0;
    const inominalneutro = parseFloat(localStorage.getItem('Inominalneutroconsumo')) || 0;
    const ip1 = parseFloat(localStorage.getItem('Ipdeconsumo')) || 0;
    const ip2 = parseFloat(localStorage.getItem('IpdeneutroSelecionada')) || 0;
    const Instfaseconsumo = parseFloat(localStorage.getItem('Instfaseconsumo')) || 0;
    const Iinstneutro = parseFloat(localStorage.getItem('IinstneutroSelecionada')) || 0;
    const imagBase = parseFloat(localStorage.getItem('Imagresultante')) || 0;
    const imagneutro = parseFloat(localStorage.getItem('imagtotalneutroSelecionada')) || 0;
    const curtoArmazenada = parseFloat(localStorage.getItem('curtoSelecionada')) || 0;
    const correntesTrafos = JSON.parse(localStorage.getItem('correntestrafosJSON')) || {
        trafo1: {}, trafo2: {}, trafo3: {}, trafo4: {}, trafo5: {},
        trafo6: {}, trafo7: {}, trafo8: {}, trafo9: {}, trafo10: {}
    };
    
    
    
    // Adicionar curva de fase
    if (x1.length > 0 && y1.length > 0) {
        datasets.push({
            label: 'Curva 50/51 fase',
            data: x1.map((val, index) => ({ x: val, y: y1[index] })),
            borderColor: 'red',
            backgroundColor: 'rgb(255, 0, 0)',
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            tension: 0
        });
    }
    
    // Adicionar curva de neutro
    if (x2.length > 0 && y2.length > 0) {
        datasets.push({
            label: 'Curva 50N/51N Neutro',
            data: x2.map((val, index) => ({ x: val, y: y2[index] })),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            tension: 0
        });
    }
    
    // I nominal fase - ponto
    
        // I nominal fase - ponto
        // I nominal fase - ponto
        datasets.push({
            label: 'I nominal fase = ' + correnteprimaria.toFixed(2) + ' A',
            data: [{ x: correnteprimaria, y: 0.01 }],
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I nominal fase - linha vertical
        datasets.push({
            label: 'I nominal fase linha',
            data: [
            { x: correnteprimaria, y: 0.01 },
            { x: correnteprimaria, y: 1000 }
            ],
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            fill: false,
            showLine: true
        });

        // I nominal neutro - ponto
        datasets.push({
            label: 'I nominal neutro = ' + inominalneutro.toFixed(2) + ' A',
            data: [{ x: inominalneutro, y: 0.01 }],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I nominal neutro - linha vertical
        datasets.push({
            label: 'I nominal neutro linha',
            data: [
            { x: inominalneutro, y: 0.01 },
            { x: inominalneutro, y: 1000 }
            ],
            borderColor: 'blue',
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            fill: false,
            showLine: true
        });

        // I Ip fase
        datasets.push({
            label: 'Ip fase = ' + ip1.toFixed(2) + ' A',
            data: [{ x: ip1, y: 0.01 }],
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I Ip neutro
        datasets.push({
            label: 'Ip neutro = ' + ip2.toFixed(2) + ' A',
            data: [{ x: ip2, y: 0.01 }],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I inst fase
        datasets.push({
            label: 'I inst fase = ' + Instfaseconsumo.toFixed(2) + ' A',
            data: [{ x: Instfaseconsumo, y: 0.01 }],
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I inst neutro
        datasets.push({
            label: 'I inst neutro = ' + Iinstneutro.toFixed(2) + ' A',
            data: [{ x: Iinstneutro, y: 0.01 }],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'triangle',
            showLine: false
        });

        // I mag fase
        datasets.push({
            label: 'I mag fase = ' + imagBase.toFixed(2) + ' A',
            data: [{ x: imagBase, y: 0.1 }],
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            showLine: false
        });

        // I mag neutro
        datasets.push({
            label: 'I mag neutro = ' + imagneutro.toFixed(2) + ' A',
            data: [{ x: imagneutro, y: 0.1 }],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            showLine: false
        });
    
    
    // Partida motor+carga operante
    const somaCorrentePartida = parseFloat(localStorage.getItem("somaCorrentePartidaOperante"));
    const motorData = JSON.parse(localStorage.getItem("motorJSON")) || {};
    const tempoPartida = parseFloat(motorData.tempopartida);
    
    if (somaCorrentePartida > 0 && tempoPartida > 0) {
        datasets.push({
            label: 'Ip motor+carga operante = ' + somaCorrentePartida.toFixed(2) + ' A,' + tempoPartida.toFixed(2) + ' s',
            data: [{ x: somaCorrentePartida, y: tempoPartida }],
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'rect',
            showLine: false
        });
    }
    
    // ICC Trifásica
   
        datasets.push({
            label: 'ICC Trifásica = ' + curtoArmazenada.toFixed(2) + ' A',
            data: [{ x: curtoArmazenada, y: 0.01 }],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'star',
            showLine: false
        });
        
        // Linha pontilhada vertical de curto circuito
        datasets.push({
            label: 'Curto Circuito',
            data: [
                { x: curtoArmazenada, y: 0.01 },
                { x: curtoArmazenada, y: 1000 }
            ],
            borderColor: 'black',
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            fill: false,
            showLine: true
        });
    
    
    // Pontos I ANSI (1-10)
    const ansiColors = ['red', 'blue', 'green', 'purple', 'brown', 'pink', 'cyan', 'magenta', 'gray', 'black'];
    for (let i = 1; i <= 10; i++) {
        const trafo = correntesTrafos[`trafo${i}`];
        if (trafo && trafo.iansi > 0 && trafo.tempo > 0) {
            datasets.push({
                label: `I ANSI trafo ${i} = ${trafo.iansi.toFixed(2)} A`,
                data: [{ x: trafo.iansi, y: trafo.tempo }],
                backgroundColor: 'orange',
                borderColor: ansiColors[i-1],
                borderWidth: 2,
                pointRadius: 5,
                pointStyle: 'triangle',
                showLine: false
            });
        }
    }
    
    // Pontos I NANSI (1-10)
    for (let i = 1; i <= 10; i++) {
        const trafo = correntesTrafos[`trafo${i}`];
        if (trafo && trafo.inansi > 0 && trafo.tempo > 0) {
            datasets.push({
                label: `I NANSI trafo ${i} = ${trafo.inansi.toFixed(2)} A`,
                data: [{ x: trafo.inansi, y: trafo.tempo }],
                backgroundColor: 'yellow',
                borderColor: ansiColors[i-1],
                borderWidth: 2,
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: false
            });
        }
    }
    
    // Configuração do gráfico    
    const chartConfig = {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
legend: {
    position: 'bottom',
    align: 'start',
    labels: {
        boxWidth: 12,
        boxHeight: 12,
        padding: 20,
        usePointStyle: true,
        font: {
            size: 8
        },
generateLabels: function(chart) {
    const original = Chart.defaults.plugins.legend.labels.generateLabels;
    const labels = original.call(this, chart);
    
    // Lista de legendas a serem ocultadas
    const legendasOcultas = [
        'I nominal neutro linha',
        'I nominal fase linha',
        'Curto Circuito'
    ];
    
    // Filtrar legendas indesejadas e personalizar o formato
    return labels
        .filter(function(label) {
            return !legendasOcultas.includes(label.text);
        })
        .map(function(label) {
            label.text = '• ' + label.text; // Adiciona bullet point
            return label;
        });
}
    },
    // Configurações para forçar layout em lista vertical
    display: true,
    maxHeight: 500,
    maxWidth: 250,
    fullSize: false,
    position: 'right', // Muda para direita para melhor layout vertical
    onClick: function(e, legendItem, legend) {
        const index = legendItem.datasetIndex;
        const chart = legend.chart;
        const meta = chart.getDatasetMeta(index);
        meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
        chart.update();
    }
}
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Corrente (A)' },
                    min: 1,
                    max: 10000,
                    grid: {
                        display: true,
                        color: 'rgba(0,0,0,0.1)',
                        drawTicks: true,
                        borderDash: [2, 2],
                        minor: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)',
                            borderDash: [1, 1]
                        }
                    }
                },
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Tempo (s)' },
                    min: 0.01,
                    max: 1000,
                    grid: {
                        display: true,
                        color: 'rgba(0,0,0,0.1)',
                        drawTicks: true,
                        borderDash: [2, 2],
                        minor: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)',
                            borderDash: [1, 1]
                        }
                    }
                }
            }
        }
    };
    
    // Criar e armazenar o gráfico
    window.chartInstance = new Chart(ctx, chartConfig);
    
    return window.chartInstance;
}