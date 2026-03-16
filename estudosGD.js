
// Debug: mostrar todos os itens do localStorage
// console.log('Itens no localStorage:');
// for (let i = 0; i < localStorage.length; i++) {
//     var chave = localStorage.key(i);
//     console.log(`${chave}:`, localStorage.getItem(chave));
// }

//INICIALIZAR DO CARREGAMENTO DA PAGINA 
document.addEventListener('DOMContentLoaded', function () {

    configurarEventosHeaderEImpressao();
    configurarQuebrasDinamicasImpressao();

    exibirCorrenteMinimaSeNecessario();

    // Aguardar MathJax carregar com retry
    function carregarFormulas() {
        if (typeof MathJax !== 'undefined' && MathJax.startup && MathJax.typesetPromise) {
            console.log('MathJax detectado, aguardando startup...');
            MathJax.startup.promise.then(() => {
                console.log('MathJax pronto! Aguardando inicialização completa...');
                // Aguardar mais tempo para garantir que MathJax está totalmente inicializado
                setTimeout(() => {
                    console.log('Preenchendo fórmulas...');
                    atualizarFormula();
                    atualizarFormula2();
                    // Forçar renderização após preencher
                    setTimeout(() => {
                        const formulas = document.querySelectorAll('.formula1, .formula2, .formula3, .formula4, .formula5, .formula6, .formula7');
                        console.log(`Elementos encontrados: ${formulas.length}`);
                        formulas.forEach((el, idx) => {
                            console.log(`Formula ${idx + 1} innerHTML:`, el.innerHTML.substring(0, 50));
                        });
                        if (formulas.length > 0) {
                            console.log('Chamando MathJax.typesetPromise...');
                            MathJax.typesetPromise(Array.from(formulas))
                                .then(() => {
                                    console.log('✓ Renderização concluída');
                                    formulas.forEach((el, idx) => {
                                        console.log(`Formula ${idx + 1} após render:`, el.innerHTML.substring(0, 50));
                                    });
                                })
                                .catch(err => console.error('Erro ao renderizar:', err));
                        }
                    }, 200);
                }, 1000);
            }).catch(err => console.error('Erro no startup:', err));
        } else {
            console.log('Aguardando MathJax...');
            setTimeout(carregarFormulas, 300);
        }
    }
    carregarFormulas();

    // Controle de acesso movido para controle-acesso.js

    // Carregar o script do gráfico
    // carregarScript('grafico5051consumo.js', function () {
    //     setTimeout(() => {
    //         verificarMathJax();
    //     }, 1000);
    // });

    // Carregar o script do gráfico de GD
    // carregarScript2('grafico67inj.js', function () {
    //     setTimeout(() => {
    //         verificarMathJax();
    //     }, 1000);
    // });

    carregarScript('grafico5051consumo.js', function () {
        // Inicializa o gráfico no canvas 'grafico'
        if (typeof inicializarGrafico5051 === 'function') {
            inicializarGrafico5051();
        }
    });

    carregarScript('grafico67inj.js', function () {
        // Inicializa o gráfico no canvas 'graficoGD'
        if (typeof inicializarGrafico67inj === 'function') {
            inicializarGrafico67inj();
        }
    });




    // Carregar tabela de relés
    setTimeout(() => {

        adicionarEstilosTabelaParametrizacaoReles();
        carregarTabelaReles();

    }, 1500);


    carregarVariaveisEstudo();
    carregarConteudoAjusteReator();
    carregarConteudoAjuste32();
    carregarConteudoAjuste51V();
    carregarConteudosAjustesGDComplementares();

    //incluirimagensrele();
    // Recarregar a página após salvar as opções
    // location.reload();

});

function carregarConteudoAjusteReator() {
    const tipoEl = document.getElementById('ajustereator-tipo-estudo');
    const potenciaEl = document.getElementById('ajustereator-potencia-estudo');
    const tensaoEl = document.getElementById('ajustereator-tensao-estudo');
    const resultadoEl = document.getElementById('ajustereator-resultado-estudo');

    if (!tipoEl || !potenciaEl || !tensaoEl || !resultadoEl) {
        return;
    }

    const tipoMap = {
        reator: 'Reator de aterramento',
        zigzag: 'Transformador zig-zag',
        estrela: 'Transformador estrela-aterrado'
    };

    const tipoSalvo = localStorage.getItem('ajustereatorTipo');
    const potenciaSalva = localStorage.getItem('ajustereatorPotencia');
    const tensaoSalva = localStorage.getItem('tensaoSelecionada');
    const resultadoSalvo = localStorage.getItem('ajustereatorResultado');

    tipoEl.textContent = tipoMap[tipoSalvo] || 'Não informado';
    potenciaEl.textContent = potenciaSalva ? `${potenciaSalva} kVA` : 'Não informado';
    tensaoEl.textContent = tensaoSalva ? `${tensaoSalva} kV` : 'Não informado';

    if (resultadoSalvo && resultadoSalvo.trim() !== '') {
        resultadoEl.innerHTML = resultadoSalvo;
    } else {
        resultadoEl.textContent = 'Sem resultado salvo. Execute o cálculo no arquivo Ajuste Reator para exibir a referência nesta seção.';
    }
}

function carregarConteudoAjuste32() {
    const parseNumero = (valor, padrao = NaN) => {
        if (valor === null || valor === undefined) return padrao;
        const normalizado = `${valor}`.replace(',', '.').replace(/[^0-9.-]/g, '');
        const numero = parseFloat(normalizado);
        return Number.isFinite(numero) ? numero : padrao;
    };

    const preencher = (id, texto) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = (texto === null || texto === undefined || `${texto}`.trim() === '') ? '-' : `${texto}`;
    };

    const potenciaNominalInjecao = parseNumero(localStorage.getItem('potenciaGDSelecionada'));
    const potenciaPicoInjecao = parseNumero(localStorage.getItem('potenciaInjecaoCalculada32'));
    const potenciaPuInjecao = parseNumero(localStorage.getItem('potenciaInjecaoPU32'));
    const toleranciaInjecao = parseNumero(localStorage.getItem('tolerancia-injecao-32'), 105);
    const tempoInjecao = parseNumero(localStorage.getItem('tempo-injecao-32'), 15);

    const potenciaNominalConsumo = parseNumero(localStorage.getItem('demandaSelecionada'));
    const potenciaPicoConsumo = parseNumero(localStorage.getItem('potenciaConsumoCalculada32'));
    const potenciaPuConsumo = parseNumero(localStorage.getItem('potenciaConsumoPU32'));
    const toleranciaConsumo = parseNumero(localStorage.getItem('tolerancia-consumo-32'), 105);
    const tempoConsumo = parseNumero(localStorage.getItem('tempo-consumo-32'), 15);

    const potenciaBase = parseNumero(localStorage.getItem('potenciabase'));

    document.querySelectorAll('.denominador-potencia-base').forEach(el => {
        el.textContent = Number.isFinite(potenciaBase) ? `${potenciaBase.toFixed(2)} kW` : '-';
    });

    preencher('estudo32-inj-tolerancia', `${toleranciaInjecao.toFixed(0)} %`);
    preencher('estudo32-inj-nominal', Number.isFinite(potenciaNominalInjecao) ? `${potenciaNominalInjecao.toFixed(2)} kW` : '-');
    document.querySelectorAll('.estudo32-inj-pico').forEach(el => {
        el.textContent = Number.isFinite(potenciaPicoInjecao) ? `${potenciaPicoInjecao.toFixed(2)} kW` : '-';
    });
    document.querySelectorAll('.estudo32-inj-pu').forEach(el => {
        el.textContent = Number.isFinite(potenciaPuInjecao) ? `${potenciaPuInjecao.toFixed(3)} P.U` : '-';
    });
    preencher('estudo32-inj-tempo', `${tempoInjecao.toFixed(0)} s`);
    document.querySelectorAll('.estudo32-inj-tempo').forEach(el => {
        el.textContent = `${tempoInjecao.toFixed(0)} s`;
    });

    preencher('estudo32-cons-tolerancia', `${toleranciaConsumo.toFixed(0)} %`);
    preencher('estudo32-cons-nominal', Number.isFinite(potenciaNominalConsumo) ? `${potenciaNominalConsumo.toFixed(2)} kW` : '-');
    preencher('estudo32-cons-pico', Number.isFinite(potenciaPicoConsumo) ? `${potenciaPicoConsumo.toFixed(2)} kW` : '-');
    document.querySelectorAll('.estudo32-cons-pico').forEach(el => {
        el.textContent = Number.isFinite(potenciaPicoConsumo) ? `${potenciaPicoConsumo.toFixed(2)} kW` : '-';
    });
    document.querySelectorAll('.estudo32-cons-pu').forEach(el => {
        el.textContent = Number.isFinite(potenciaPuConsumo) ? `${potenciaPuConsumo.toFixed(3)} P.U` : '-';
    });
    preencher('estudo32-cons-pu', Number.isFinite(potenciaPuConsumo) ? `${potenciaPuConsumo.toFixed(3)} P.U` : '-');
    document.querySelectorAll('.estudo32-cons-tempo').forEach(el => {
        el.textContent = `${tempoConsumo.toFixed(0)} s`;
    });
    preencher('estudo32-cons-tempo', `${tempoConsumo.toFixed(0)} s`);


}

function carregarConteudosAjustesGDComplementares() {
    const textoLabel = (seletores = []) => {
        for (const seletor of seletores) {
            try {
                const el = document.querySelector(seletor);
                if (el && `${el.textContent || ''}`.trim() !== '') {
                    return `${el.textContent}`.trim();
                }
            } catch (e) {
                continue;
            }
        }
        return null;
    };

    const aplicarSufixoSeNecessario = (texto, sufixo = '') => {
        const valorBase = `${texto}`.trim();
        if (valorBase === '' || !sufixo || sufixo.trim() === '') {
            return valorBase;
        }
        const token = sufixo.trim();
        if (valorBase.toLowerCase().includes(token.toLowerCase())) {
            return valorBase;
        }
        return `${valorBase}${sufixo}`;
    };

    const preencher = (id, valor, sufixo = '', seletoresLabel = []) => {
        const el = document.getElementById(id);
        if (!el) return;
        const valorLabel = textoLabel(seletoresLabel);
        const fonte = (valorLabel !== null && valorLabel !== undefined && `${valorLabel}`.trim() !== '')
            ? valorLabel
            : valor;
        const v = (fonte === null || fonte === undefined || `${fonte}`.trim() === '')
            ? '-'
            : aplicarSufixoSeNecessario(fonte, sufixo);
        el.textContent = v;
    };

    // Ajuste 27
    document.querySelectorAll('.estudo27-est1').forEach(el => {
        const valorLabel = textoLabel(['#ajuste-pu-subtensao-html', '.ajuste-pu-subtensao-automatica']);
        const valor = localStorage.getItem('ajustemanual27primeiroestagio') || '0.8';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' P.U');
    });
    document.querySelectorAll('.estudo27-t1').forEach(el => {
        const valorLabel = textoLabel(['#ajuste-tempo-subtensao-html', '.ajuste-tempo-subtensao-automatica', '#tempos-estagios-html']);
        const valor = localStorage.getItem('ajustemanual27tempo') || '3';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo27-est2').forEach(el => {
        const valorLabel = textoLabel(['#ajuste-pu-subtensao-html-2', '.ajuste-pu-subtensao-automatica-2']);
        const valor = localStorage.getItem('ajustemanual27segundoestagio') || '0.5';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' P.U');
    });
    document.querySelectorAll('.estudo27-t2').forEach(el => {
        const valorLabel = textoLabel(['#ajuste-tempo-subtensao-html-2', '.ajuste-tempo-subtensao-automatica-2']);
        const valor = localStorage.getItem('ajustemanual27tempo2') || '1';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo27-tr1').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tempos-estagios-ajustada-html']);
        const valor = localStorage.getItem('tempoEstagio27-1-real');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo27-tr2').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tempos-estagios-ajustada-html-2']);
        const valor = localStorage.getItem('tempoEstagio27-2-real');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo27-vp1').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tensao-primaria-fase-ajustada-html']);
        const valor = localStorage.getItem('tensaoPrimariaFaseAjustada27-1');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo27-vs1').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tensao-secundaria-fase-ajustada-html']);
        const valor = localStorage.getItem('tensaoSecundariaFaseAjustada27-1');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo27-vp2').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tensao-primaria-fase-ajustada-html-2']);
        const valor = localStorage.getItem('tensaoPrimariaFaseAjustada27-2');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo27-vs2').forEach(el => {
        const valorLabel = textoLabel(['#sensibilidade-superior-tensao-secundaria-fase-ajustada-html-2']);
        const valor = localStorage.getItem('tensaoSecundariaFaseAjustada27-2');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });

    // Ajuste 27 - Estágios de subtensão (tabela detalhada)
    const parseNumero = (valor, padrao = NaN) => {
        if (valor === null || valor === undefined) return padrao;
        const normalizado = `${valor}`.replace(',', '.').replace(/[^0-9.-]/g, '');
        const n = parseFloat(normalizado);
        return Number.isFinite(n) ? n : padrao;
    };
    const formatarValor = (n, unidade) => (Number.isFinite(n) ? `${n.toFixed(2)} ${unidade}` : '-');
    const raiz3 = Math.sqrt(3);

    const tensaoPrimariaLinha = parseNumero(localStorage.getItem('tensaoprimariaFF'));
    const tensaoSecundariaLinha = parseNumero(localStorage.getItem('tensaoSecundariaFFTP'));
    const puSub1 = parseNumero(localStorage.getItem('ajustemanual27primeiroestagio'), 0.8);
    const puSub2 = parseNumero(localStorage.getItem('ajustemanual27segundoestagio'), 0.5);
    const tempoSub1 = parseNumero(localStorage.getItem('ajustemanual27tempo'), 3);
    const tempoSub2 = parseNumero(localStorage.getItem('ajustemanual27tempo2'), 1);

    const vpfAj1Direto = parseNumero(localStorage.getItem('tensaoPrimariaFaseAjustada27-1'));
    const vpfAj2Direto = parseNumero(localStorage.getItem('tensaoPrimariaFaseAjustada27-2'));
    const vsfAj1Direto = parseNumero(localStorage.getItem('tensaoSecundariaFaseAjustada27-1'));
    const vsfAj2Direto = parseNumero(localStorage.getItem('tensaoSecundariaFaseAjustada27-2'));

    const tensaoPrimariaFase = Number.isFinite(tensaoPrimariaLinha) ? (tensaoPrimariaLinha / raiz3) : NaN;
    const tensaoSecundariaFase = Number.isFinite(tensaoSecundariaLinha) ? (tensaoSecundariaLinha / raiz3) : NaN;

    preencher('estudo27-sub-vpl-base', formatarValor(tensaoPrimariaLinha, 'V'));
    preencher('estudo27-sub-vpf-base', formatarValor(tensaoPrimariaFase, 'V'));
    preencher('estudo27-sub-vsl-base', formatarValor(tensaoSecundariaLinha, 'V'));
    preencher('estudo27-sub-vsf-base', formatarValor(tensaoSecundariaFase, 'V'));

    const vpfAj1Calc = Number.isFinite(tensaoPrimariaFase) && Number.isFinite(puSub1) ? tensaoPrimariaFase * puSub1 : NaN;
    const vpfAj2Calc = Number.isFinite(tensaoPrimariaFase) && Number.isFinite(puSub2) ? tensaoPrimariaFase * puSub2 : NaN;
    const vsfAj1Calc = Number.isFinite(tensaoSecundariaFase) && Number.isFinite(puSub1) ? tensaoSecundariaFase * puSub1 : NaN;
    const vsfAj2Calc = Number.isFinite(tensaoSecundariaFase) && Number.isFinite(puSub2) ? tensaoSecundariaFase * puSub2 : NaN;

    const vpfAj1 = Number.isFinite(vpfAj1Direto) ? vpfAj1Direto : vpfAj1Calc;
    const vpfAj2 = Number.isFinite(vpfAj2Direto) ? vpfAj2Direto : vpfAj2Calc;
    const vsfAj1 = Number.isFinite(vsfAj1Direto) ? vsfAj1Direto : vsfAj1Calc;
    const vsfAj2 = Number.isFinite(vsfAj2Direto) ? vsfAj2Direto : vsfAj2Calc;

    const vplAj1 = Number.isFinite(tensaoPrimariaLinha) && Number.isFinite(puSub1)
        ? (tensaoPrimariaLinha * puSub1)
        : (Number.isFinite(vpfAj1) ? vpfAj1 * raiz3 : NaN);
    const vplAj2 = Number.isFinite(tensaoPrimariaLinha) && Number.isFinite(puSub2)
        ? (tensaoPrimariaLinha * puSub2)
        : (Number.isFinite(vpfAj2) ? vpfAj2 * raiz3 : NaN);
    const vslAj1 = Number.isFinite(tensaoSecundariaLinha) && Number.isFinite(puSub1)
        ? (tensaoSecundariaLinha * puSub1)
        : (Number.isFinite(vsfAj1) ? vsfAj1 * raiz3 : NaN);
    const vslAj2 = Number.isFinite(tensaoSecundariaLinha) && Number.isFinite(puSub2)
        ? (tensaoSecundariaLinha * puSub2)
        : (Number.isFinite(vsfAj2) ? vsfAj2 * raiz3 : NaN);

    document.querySelectorAll('.estudo27-sub-vpl-aj1').forEach(el => el.textContent = formatarValor(vplAj1, 'V'));
    document.querySelectorAll('.estudo27-sub-vpf-aj1').forEach(el => el.textContent = formatarValor(vpfAj1, 'V'));
    document.querySelectorAll('.estudo27-sub-vsl-aj1').forEach(el => el.textContent = formatarValor(vslAj1, 'V'));
    document.querySelectorAll('.estudo27-sub-vsf-aj1').forEach(el => el.textContent = formatarValor(vsfAj1, 'V'));

    document.querySelectorAll('.estudo27-sub-vpl-aj2').forEach(el => el.textContent = formatarValor(vplAj2, 'V'));
    document.querySelectorAll('.estudo27-sub-vpf-aj2').forEach(el => el.textContent = formatarValor(vpfAj2, 'V'));
    document.querySelectorAll('.estudo27-sub-vsl-aj2').forEach(el => el.textContent = formatarValor(vslAj2, 'V'));
    document.querySelectorAll('.estudo27-sub-vsf-aj2').forEach(el => el.textContent = formatarValor(vsfAj2, 'V'));

    document.querySelectorAll('.estudo27-sub-t-aj1').forEach(el => {
        el.textContent = Number.isFinite(tempoSub1) ? `${tempoSub1} s` : '-';
    });
    document.querySelectorAll('.estudo27-sub-t-aj2').forEach(el => {
        el.textContent = Number.isFinite(tempoSub2) ? `${tempoSub2} s` : '-';
    });

    // Ajuste 59
    document.querySelectorAll('.estudo59-est1').forEach(el => {
        const valorLabel = textoLabel(['.ajuste-pu-sobretensao-html', '.ajuste-pu-sobretensao-automatica']);
        const valor = localStorage.getItem('ajustemanual59primeiroestagio') || '1.10';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' P.U');
    });
    document.querySelectorAll('.estudo59-t1').forEach(el => {
        const valorLabel = textoLabel(['.ajuste-tempo-sobretensao-html', '.ajuste-tempo-sobretensao-automatica', '.tempo-estagios-html']);
        const valor = localStorage.getItem('ajustemanual59tempo') || '3';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo59-est2').forEach(el => {
        const valorLabel = textoLabel(['.ajuste-pu-sobretensao-html-2', '.ajuste-pu-sobretensao-automatica-2']);
        const valor = localStorage.getItem('ajustemanual59segundoestagio') || '1.18';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' P.U');
    });
    document.querySelectorAll('.estudo59-t2').forEach(el => {
        const valorLabel = textoLabel(['.ajuste-tempo-sobretensao-html-2', '.ajuste-tempo-sobretensao-automatica-2']);
        const valor = localStorage.getItem('ajustemanual59tempo2') || '0.5';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo59-tr1').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tempo-estagios-ajustada-html']);
        const valor = localStorage.getItem('tempoEstagio59-1-real') || '3';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo59-tr2').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tempo-estagios-ajustada-html-2']);
        const valor = localStorage.getItem('tempoEstagio59-2-real') || '0.5';
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' s');
    });
    document.querySelectorAll('.estudo59-vp1').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tensao-primaria-fase-ajustada-html']);
        const valor = localStorage.getItem('tensaoPrimariaFaseAjustada59-1');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo59-vs1').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tensao-secundaria-fase-ajustada-html']);
        const valor = localStorage.getItem('tensaoSecundariaFaseAjustada59-1');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo59-vp2').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tensao-primaria-fase-ajustada-html-2']);
        const valor = localStorage.getItem('tensaoPrimariaFaseAjustada59-2');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });
    document.querySelectorAll('.estudo59-vs2').forEach(el => {
        const valorLabel = textoLabel(['.sensibilidade-superior-tensao-secundaria-fase-ajustada-html-2']);
        const valor = localStorage.getItem('tensaoSecundariaFaseAjustada59-2');
        el.textContent = aplicarSufixoSeNecessario(valorLabel || valor, ' V');
    });

    // Ajuste 59 - Estágios de sobretensão (tabela detalhada)
    const puSob1 = parseNumero(localStorage.getItem('ajustemanual59primeiroestagio'), 1.10);
    const puSob2 = parseNumero(localStorage.getItem('ajustemanual59segundoestagio'), 1.18);
    const tempoSob1 = parseNumero(localStorage.getItem('ajustemanual59tempo'), 3);
    const tempoSob2 = parseNumero(localStorage.getItem('ajustemanual59tempo2'), 0.5);

    const vpfSobAj1Direto = parseNumero(localStorage.getItem('tensaoPrimariaFaseAjustada59-1'));
    const vpfSobAj2Direto = parseNumero(localStorage.getItem('tensaoPrimariaFaseAjustada59-2'));
    const vsfSobAj1Direto = parseNumero(localStorage.getItem('tensaoSecundariaFaseAjustada59-1'));
    const vsfSobAj2Direto = parseNumero(localStorage.getItem('tensaoSecundariaFaseAjustada59-2'));

    const vpfSobAj1Calc = Number.isFinite(tensaoPrimariaFase) && Number.isFinite(puSob1) ? tensaoPrimariaFase * puSob1 : NaN;
    const vpfSobAj2Calc = Number.isFinite(tensaoPrimariaFase) && Number.isFinite(puSob2) ? tensaoPrimariaFase * puSob2 : NaN;
    const vsfSobAj1Calc = Number.isFinite(tensaoSecundariaFase) && Number.isFinite(puSob1) ? tensaoSecundariaFase * puSob1 : NaN;
    const vsfSobAj2Calc = Number.isFinite(tensaoSecundariaFase) && Number.isFinite(puSob2) ? tensaoSecundariaFase * puSob2 : NaN;

    const vpfSobAj1 = Number.isFinite(vpfSobAj1Direto) ? vpfSobAj1Direto : vpfSobAj1Calc;
    const vpfSobAj2 = Number.isFinite(vpfSobAj2Direto) ? vpfSobAj2Direto : vpfSobAj2Calc;
    const vsfSobAj1 = Number.isFinite(vsfSobAj1Direto) ? vsfSobAj1Direto : vsfSobAj1Calc;
    const vsfSobAj2 = Number.isFinite(vsfSobAj2Direto) ? vsfSobAj2Direto : vsfSobAj2Calc;

    const vplSobAj1 = Number.isFinite(tensaoPrimariaLinha) && Number.isFinite(puSob1)
        ? (tensaoPrimariaLinha * puSob1)
        : (Number.isFinite(vpfSobAj1) ? vpfSobAj1 * raiz3 : NaN);
    const vplSobAj2 = Number.isFinite(tensaoPrimariaLinha) && Number.isFinite(puSob2)
        ? (tensaoPrimariaLinha * puSob2)
        : (Number.isFinite(vpfSobAj2) ? vpfSobAj2 * raiz3 : NaN);
    const vslSobAj1 = Number.isFinite(tensaoSecundariaLinha) && Number.isFinite(puSob1)
        ? (tensaoSecundariaLinha * puSob1)
        : (Number.isFinite(vsfSobAj1) ? vsfSobAj1 * raiz3 : NaN);
    const vslSobAj2 = Number.isFinite(tensaoSecundariaLinha) && Number.isFinite(puSob2)
        ? (tensaoSecundariaLinha * puSob2)
        : (Number.isFinite(vsfSobAj2) ? vsfSobAj2 * raiz3 : NaN);

    preencher('estudo59-sob-vpl-base', formatarValor(tensaoPrimariaLinha, 'V'));
    preencher('estudo59-sob-vpf-base', formatarValor(tensaoPrimariaFase, 'V'));
    preencher('estudo59-sob-vsl-base', formatarValor(tensaoSecundariaLinha, 'V'));
    preencher('estudo59-sob-vsf-base', formatarValor(tensaoSecundariaFase, 'V'));
    document.querySelectorAll('.estudo59-sob-vpl-aj1').forEach(el => el.textContent = formatarValor(vplSobAj1, 'V'));
    document.querySelectorAll('.estudo59-sob-vpf-aj1').forEach(el => el.textContent = formatarValor(vpfSobAj1, 'V'));
    document.querySelectorAll('.estudo59-sob-vsl-aj1').forEach(el => el.textContent = formatarValor(vslSobAj1, 'V'));
    document.querySelectorAll('.estudo59-sob-vsf-aj1').forEach(el => el.textContent = formatarValor(vsfSobAj1, 'V'));

    document.querySelectorAll('.estudo59-sob-vpl-aj2').forEach(el => el.textContent = formatarValor(vplSobAj2, 'V'));
    document.querySelectorAll('.estudo59-sob-vpf-aj2').forEach(el => el.textContent = formatarValor(vpfSobAj2, 'V'));
    document.querySelectorAll('.estudo59-sob-vsl-aj2').forEach(el => el.textContent = formatarValor(vslSobAj2, 'V'));
    document.querySelectorAll('.estudo59-sob-vsf-aj2').forEach(el => el.textContent = formatarValor(vsfSobAj2, 'V'));

    preencher('estudo59-sob-t-aj1', `${tempoSob1} s`, '', ['#ajuste-tempo-sobretensao-html', '.ajuste-tempo-sobretensao-automatica']);
    preencher('estudo59-sob-t-aj2', `${tempoSob2} s`, '', ['#ajuste-tempo-sobretensao-html-2', '.ajuste-tempo-sobretensao-automatica-2']);

    // Ajuste 81
    // Preencher todos os elementos com a classe 'estudo81u-e1'
    document.querySelectorAll('.estudo81u-e1').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-html-1');
        const valor = localStorage.getItem('ajustereal81Uprimeiroestagio') || '56.9 Hz';
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim();
        } else {
            el.textContent = valor;
        }
    });
    document.querySelectorAll('.estudo81u-t1').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-tempo-html-1');
        const valor = localStorage.getItem('ajustereal81Utempo1') || '0.20 s';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81u-e2').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-html-2');
        const valor = localStorage.getItem('ajustereal81Usegundoestagio') || '57.4 Hz';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81u-t2').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-tempo-html-2');
        const valor = localStorage.getItem('ajustereal81Utempo2') || '5.50 s';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81u-e3').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-html-3');
        const valor = localStorage.getItem('ajustereal81Uterceiroestagio') || '58.5 Hz';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81u-t3').forEach(el => {
        const valorLabel = document.querySelector('#subfrequencia-tempo-html-3');
        const valor = localStorage.getItem('ajustereal81Utempo3') || '20.50 s';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81o-e1').forEach(el => {
        const valorLabel = document.querySelector('#sobrefrequencia-html-1');
        const valor = localStorage.getItem('ajustereal81Oprimeiroestagio') || '62.60 Hz';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81o-t1').forEach(el => {
        const valorLabel = document.querySelector('#sobrefrequencia-tempo-html-1');
        const valor = localStorage.getItem('ajustereal81Otempo1') || '10.50 s';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81o-e2').forEach(el => {
        const valorLabel = document.querySelector('#sobrefrequencia-html-2');
        const valor = localStorage.getItem('ajustereal81Osegundoestagio') || '63.10 Hz';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    document.querySelectorAll('.estudo81o-t2').forEach(el => {
        const valorLabel = document.querySelector('#sobrefrequencia-tempo-html-2');
        const valor = localStorage.getItem('ajustereal81Otempo2') || '0.20 s';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : valor;
    });

    // Ajuste 46
    preencher('estudo46-ip', localStorage.getItem('Ipajustada46'), '', ['#ip-46-ajustada-html']);
    preencher('estudo46-curva', localStorage.getItem('Curvaajustada46'), '', ['#curva-46-ajustada-html']);
    preencher('estudo46-dial', localStorage.getItem('Dialajustado46'), '', ['#dial-46-ajustada-html']);
    preencher('estudo46-idef', localStorage.getItem('Idefajustada46'), '', ['#idef-46-ajustada-html']);
    preencher('estudo46-tempo', localStorage.getItem('Tempodefinido46'), ' s', ['#tempodefinido-ajustada-html']);

    
    document.querySelectorAll('.estudo46-idefreal').forEach(el => {
        const valorLabel = document.querySelector('.idef-46-real-html');
        const valor = localStorage.getItem('Idef46real');
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : (valor ? valor + ' A' : '-');
    });

    document.querySelectorAll('.estudo46-idefpureal').forEach(el => {
        const valorLabel = document.querySelector('#idef-46-pu-html');
        const valor = localStorage.getItem('Idef46PUreal');
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim() + ' P.U';
        } else if (valor && valor.trim() !== '') {
            el.textContent = valor + ' P.U';
        } else {
            el.textContent = '-';
        }
    });


    document.querySelectorAll('.estudo46-temporeal').forEach(el => {
        const valorLabel = document.querySelector('#tempodefinido-real-html');
        const valor = localStorage.getItem('tempoDefinido46real');
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() : (valor ? valor + ' s' : '-');
    });

    // Ajuste 47
    document.querySelectorAll('.estudo47-tolerancia').forEach(el => {
        const valorLabel = document.querySelector('#desequilibrio-dimensionado-html');
        const valor = localStorage.getItem('ToleranciaDeseqAjustada47')/100 || '0.20';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() + ' P.U' : valor + ' P.U';
    });
    document.querySelectorAll('.estudo47-tempo').forEach(el => {
        const valorLabel = document.querySelector('#tempo-desequilibrio-dimensionado-html');
        const valor = localStorage.getItem('TempoDeseqAjustada47') || '0.2';
        el.textContent = (valorLabel && valorLabel.textContent.trim() !== '') ? valorLabel.textContent.trim() + ' s' : valor + ' s';
    });

    document.querySelectorAll('.estudo47-vpl').forEach(el => {
        const valor = localStorage.getItem('tensaoPrimariaLinhaAjustada47');
        el.textContent = (valor && !isNaN(valor)) ? valor + ' V' : '-';
    });

    document.querySelectorAll('.estudo47-vpf').forEach(el => {
        const valor = localStorage.getItem('tensaoPrimariaFaseAjustada47');
        el.textContent = (valor && !isNaN(valor)) ? valor + ' V' : '-';
    });

    document.querySelectorAll('.estudo47-vsl').forEach(el => {
        const valor = localStorage.getItem('tensaoSecundariaLinhaAjustada47');
        el.textContent = (valor && !isNaN(valor)) ? valor + ' V' : '-';
    });

    document.querySelectorAll('.estudo47-vsf').forEach(el => {
        const valor = localStorage.getItem('tensaoSecundariaFaseAjustada47');
        el.textContent = (valor && !isNaN(valor)) ? valor + ' V' : '-';
    });

    //Importar 

    // Ajuste 25
    const tensaoDeseq25 = parseNumero(localStorage.getItem('TensaoDeseqAjustada25'), 10);
    const freqDeseq25 = parseNumero(localStorage.getItem('FrequenciaDeseqAjustada25'), 0.3);
    const anguloDeseq25 = parseNumero(localStorage.getItem('AnguloDeseqAjustada25'), 10);
    const condicao25 = localStorage.getItem('CondicaoSeccionamentoAjustada25') || 'LINHA-VIVA/BARRA-MORTA';

    const fatorTensao25 = Number.isFinite(tensaoDeseq25) ? (tensaoDeseq25 / 100) : NaN;
    const vpl25Aj = Number.isFinite(tensaoPrimariaLinha) && Number.isFinite(fatorTensao25) ? tensaoPrimariaLinha * fatorTensao25 : NaN;
    const vpf25Aj = Number.isFinite(tensaoPrimariaFase) && Number.isFinite(fatorTensao25) ? tensaoPrimariaFase * fatorTensao25 : NaN;
    const vsl25Aj = Number.isFinite(tensaoSecundariaLinha) && Number.isFinite(fatorTensao25) ? tensaoSecundariaLinha * fatorTensao25 : NaN;
    const vsf25Aj = Number.isFinite(tensaoSecundariaFase) && Number.isFinite(fatorTensao25) ? tensaoSecundariaFase * fatorTensao25 : NaN;

    document.querySelectorAll('.estudo25-sync-vpl-base').forEach(el => {
        el.textContent = formatarValor(tensaoPrimariaLinha, 'V');
    });

    document.querySelectorAll('.estudo25-sync-vpl-aj').forEach(el => {
        el.textContent = formatarValor(vpl25Aj, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vpf-base').forEach(el => {
        el.textContent = formatarValor(tensaoPrimariaFase, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vpf-aj').forEach(el => {
        el.textContent = formatarValor(vpf25Aj, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vsl-base').forEach(el => {
        el.textContent = formatarValor(tensaoSecundariaLinha, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vsl-aj').forEach(el => {
        el.textContent = formatarValor(vsl25Aj, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vsf-base').forEach(el => {
        el.textContent = formatarValor(tensaoSecundariaFase, 'V');
    });
    document.querySelectorAll('.estudo25-sync-vsf-aj').forEach(el => {
        el.textContent = formatarValor(vsf25Aj, 'V');
    });

    
    document.querySelectorAll('.estudo25-val-tensao').forEach(el => {
        const valorLabel = document.querySelector('#tensao-desequilibrio-dimensionado-html');
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim() + ' %';
        } else {
            el.textContent = `${tensaoDeseq25} %`;
        }
    });

    document.querySelectorAll('.estudo25-val-freq').forEach(el => {
        const valorLabel = document.querySelector('[id="frequência-desequilibrio-dimensionado-html"]');
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim() + ' Hz';
        } else {
            el.textContent = `${freqDeseq25} Hz`;
        }
    });

    document.querySelectorAll('.estudo25-val-angulo').forEach(el => {
        const valorLabel = document.querySelector('#angulo-desequilibrio-dimensionado-html');
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim() + ' °';
        } else {
            el.textContent = `${anguloDeseq25} °`;
        }
    });

    document.querySelectorAll('.estudo25-val-condicao').forEach(el => {
        const valorLabel = document.querySelector('#condicao-seccionamento-dimensionado-html');
        if (valorLabel && valorLabel.textContent.trim() !== '') {
            el.textContent = valorLabel.textContent.trim();
        } else {
            el.textContent = condicao25;
        }
    });

    // Compatibilidade com IDs antigos
    preencher('estudo25-vp', formatarValor(vpf25Aj, 'V'));
    preencher('estudo25-tensaodeseq', `${tensaoDeseq25} %`, '', ['#tensao-desequilibrio-dimensionado-html']);
    preencher('estudo25-freqdeseq', `${freqDeseq25} Hz`, '', ['[id="frequência-desequilibrio-dimensionado-html"]']);
    preencher('estudo25-angulodeseq', `${anguloDeseq25} °`, '', ['#angulo-desequilibrio-dimensionado-html']);
    preencher('estudo25-condicao', condicao25, '', ['#condicao-seccionamento-dimensionado-html']);
}

function carregarConteudoAjuste51V() {
    const ipFaseGD = parseFloat(localStorage.getItem('IpfaseGD')) || 0;
    const ipDeConsumo = parseFloat(localStorage.getItem('Ipdeconsumo')) || 0;
    const maiorIp = Math.max(ipFaseGD, ipDeConsumo);

    const sensibilidadeSuperiorCorrente = parseFloat(localStorage.getItem('sensibilidadeSuperiorCorrente')) || 100;
    const sensibilidadeInferiorCorrente = parseFloat(localStorage.getItem('sensibilidadeInferiorCorrente')) || 25;

    const tensaoPrimariaFF = parseFloat(localStorage.getItem('tensaoprimariaFF')) || 0;
    const tensaoPrimariaFN = parseFloat(localStorage.getItem('tensaoprimariaFN')) || 0;
    const tensaoSecundariaFF = parseFloat(localStorage.getItem('tensaoSecundariaFFTP')) || 0;
    const tensaoSecundariaFN = parseFloat(localStorage.getItem('tensaoSecundariaFNTP')) || 0;
    const sensibilidadeSuperiorTensao = parseFloat(localStorage.getItem('sensibilidadeSuperiorTensao')) || 90;
    const sensibilidadeInferiorTensao = parseFloat(localStorage.getItem('sensibilidadeInferiorTensao')) || 81;

    const curva = (maiorIp === ipFaseGD)
        ? (localStorage.getItem('curvafaseSelecionadaGD') || '-')
        : (localStorage.getItem('curvafaseSelecionada') || '-');
    const dial = (maiorIp === ipFaseGD)
        ? (localStorage.getItem('dialfaseSelecionadaGD') || '-')
        : (localStorage.getItem('dialfaseSelecionada') || '-');

    const textoLabel = (seletores = []) => {
        for (const seletor of seletores) {
            const el = document.querySelector(seletor);
            if (el && `${el.textContent || ''}`.trim() !== '') {
                return `${el.textContent}`.trim();
            }
        }
        return null;
    };

    

    const preencher = (id, valor, seletoresLabel = []) => {
        const el = document.getElementById(id);
        if (!el) return;
        const valorLabel = textoLabel(seletoresLabel);
        el.textContent = (valorLabel !== null && `${valorLabel}`.trim() !== '') ? valorLabel : valor;
    };

    preencher('estudo51v-ligacao-secundaria', localStorage.getItem('ligacaodabobinaSelecionada') || '-', ['.tp-fechamento']);
    document.querySelectorAll('.estudo51v-ligacao-secundaria').forEach(el => {
        el.textContent = localStorage.getItem('ligacaodabobinaSelecionada') || '-';
    });


    
    document.querySelectorAll('.estudo51v-ip').forEach(el => {
        el.textContent = maiorIp > 0 ? `${maiorIp.toFixed(2)} A` : '-';
    });


    // Preencher campo corrente superior considerando classe .estudo51v-corrente-sup
    document.querySelectorAll('.estudo51v-corrente-sup').forEach(el => {
        if (maiorIp > 0 && sensibilidadeSuperiorCorrente > 0) {
            el.textContent = (maiorIp * (sensibilidadeSuperiorCorrente / 100)).toFixed(2) + ' A';
        } else {
            el.textContent = '-';
        }
    });
    preencher('estudo51v-corrente-inf', maiorIp > 0 ? `${(maiorIp * (sensibilidadeInferiorCorrente / 100)).toFixed(2)} A` : '-');
    document.querySelectorAll('.estudo51v-corrente-inf').forEach(el => {
        if (maiorIp > 0 && sensibilidadeInferiorCorrente > 0) {
            el.textContent = (maiorIp * (sensibilidadeInferiorCorrente / 100)).toFixed(2) + ' A';
        } else {
            el.textContent = '-';
        }
    });
    
    preencher('estudo51v-curva', curva, ['.curva-fase']);
    document.querySelectorAll('.estudo51v-curva').forEach(el => {
        el.textContent = curva;
    });
    
    preencher('estudo51v-dial', dial, ['.dial-fase-ajustado']);
    document.querySelectorAll('.estudo51v-dial').forEach(el => {
        el.textContent = dial;
    });
    
    document.querySelectorAll('.estudo51v-tp-linha').forEach(el => {
        el.textContent = tensaoPrimariaFF > 0 ? `${tensaoPrimariaFF.toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-tp-fase').forEach(el => {
        el.textContent = tensaoPrimariaFN > 0 ? `${tensaoPrimariaFN.toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-ts-linha').forEach(el => {
        el.textContent = tensaoSecundariaFF > 0 ? `${tensaoSecundariaFF.toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-ts-fase').forEach(el => {
        el.textContent = tensaoSecundariaFN > 0 ? `${tensaoSecundariaFN.toFixed(2)} V` : '-';
    });

    document.querySelectorAll('.estudo51v-tp-linha-ajustada').forEach(el => {
        el.textContent = tensaoPrimariaFF > 0 ? `${(tensaoPrimariaFF * (sensibilidadeSuperiorTensao / 100)).toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-tp-fase-ajustada').forEach(el => {
        el.textContent = tensaoPrimariaFN > 0 ? `${(tensaoPrimariaFN * (sensibilidadeSuperiorTensao / 100)).toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-ts-linha-ajustada').forEach(el => {
        el.textContent = tensaoSecundariaFF > 0 ? `${(tensaoSecundariaFF * (sensibilidadeSuperiorTensao / 100)).toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-ts-fase-ajustada').forEach(el => {
        el.textContent = tensaoSecundariaFN > 0 ? `${(tensaoSecundariaFN * (sensibilidadeSuperiorTensao / 100)).toFixed(2)} V` : '-';
    });
    document.querySelectorAll('.estudo51v-sens-sup-tensao').forEach(el => {
        el.textContent = `${sensibilidadeSuperiorTensao.toFixed(2)} %`;
    });
    document.querySelectorAll('.estudo51v-sens-inf-tensao').forEach(el => {
        el.textContent = `${sensibilidadeInferiorTensao.toFixed(2)} %`;
    });
    document.querySelectorAll('.estudo51v-sens-sup-corrente').forEach(el => {
        el.textContent = `${sensibilidadeSuperiorCorrente.toFixed(2)} %`;
    });
    document.querySelectorAll('.estudo51v-sens-inf-corrente').forEach(el => {
        el.textContent = `${sensibilidadeInferiorCorrente.toFixed(2)} %`;
    });
}

function configurarEventosHeaderEImpressao() {
    const rotasHeader = {
        botaoconfightml: 'config.html',
        botaodiagramahtml: 'Diagramas.html',
        botaoparametrohtml: 'Protecao_parametros.html',
        botaotrafohtml: 'transformadores.html',
        botaotptchtml: 'TP-TC.html',
        botaoajustehtml: 'protecaoajuste.html',
        botaotabelarelehtml: 'tabelarele.html',
        botaoestudoshtml: 'estudos.html',
        botaoajustesGDhtml: 'ajustesGD.html',
        botaotabelaGDhtml: 'tabelaGD.html',
        botaoestudosGDhtml: 'estudosGD.html',
        botaoanalisehtml: 'analise.html',
        botaosairhtml: 'index.html'
    };

    Object.entries(rotasHeader).forEach(([id, rota]) => {
        const botao = document.getElementById(id);
        if (!botao || botao.dataset.estudosBound === 'true') {
            return;
        }

        botao.addEventListener('click', () => {
            window.location.href = rota;
        });
        botao.dataset.estudosBound = 'true';
    });

    const botaoEstudos = document.getElementById('botaoestudosGDhtml');
    if (botaoEstudos) {
        botaoEstudos.classList.add('estudos-header-active');
    }

    const botaoImprimir = document.getElementById('estudos-print-btn');
    if (botaoImprimir && botaoImprimir.dataset.estudosBound !== 'true') {
        botaoImprimir.addEventListener('click', () => window.print());
        botaoImprimir.dataset.estudosBound = 'true';
    }
}

function configurarQuebrasDinamicasImpressao() {
    if (window.__estudosPrintBreaksConfigured) {
        return;
    }
    window.__estudosPrintBreaksConfigured = true;

    const aplicarQuebras = () => {
        atualizarQuebrasTitulosNaImpressao();
    };

    const limparQuebras = () => {
        limparQuebrasTitulosNaImpressao();
    };

    window.addEventListener('beforeprint', aplicarQuebras);
    window.addEventListener('afterprint', limparQuebras);

    if (window.matchMedia) {
        const mediaPrint = window.matchMedia('print');
        const onPrintMediaChange = (event) => {
            if (event.matches) {
                aplicarQuebras();
            } else {
                limparQuebras();
            }
        };

        if (typeof mediaPrint.addEventListener === 'function') {
            mediaPrint.addEventListener('change', onPrintMediaChange);
        } else if (typeof mediaPrint.addListener === 'function') {
            mediaPrint.addListener(onPrintMediaChange);
        }
    }
}

function limparQuebrasTitulosNaImpressao() {
    document.querySelectorAll('.estudos-title-force-break-print').forEach((el) => {
        el.classList.remove('estudos-title-force-break-print');
    });
}

function atualizarQuebrasTitulosNaImpressao() {
    limparQuebrasTitulosNaImpressao();

    const titulos = Array.from(document.querySelectorAll('.estudos-title-block'));
    if (titulos.length < 4) {
        return;
    }

    titulos.forEach((titulo, indice) => {
        if (indice >= 3) {
            titulo.classList.add('estudos-title-force-break-print');
        }
    });
}

function obterPrimeiroBlocoAposTitulo(titulo, proximoTitulo) {
    let cursor = titulo.nextElementSibling;

    while (cursor && cursor !== proximoTitulo) {
        const tag = cursor.tagName ? cursor.tagName.toLowerCase() : '';
        const vazio = !cursor.textContent || cursor.textContent.trim() === '';
        if (tag !== 'br' && !vazio) {
            return cursor;
        }
        cursor = cursor.nextElementSibling;
    }

    return null;
}

function obterAlturaSecao(titulo, proximoTitulo) {
    let altura = obterAlturaExterna(titulo);
    let cursor = titulo.nextElementSibling;

    while (cursor && cursor !== proximoTitulo) {
        altura += obterAlturaExterna(cursor);
        cursor = cursor.nextElementSibling;
    }

    return altura;
}

function obterAlturaExterna(elemento) {
    const estilo = window.getComputedStyle(elemento);
    const margemSuperior = parseFloat(estilo.marginTop) || 0;
    const margemInferior = parseFloat(estilo.marginBottom) || 0;
    const altura = elemento.getBoundingClientRect().height || 0;

    return altura + margemSuperior + margemInferior;
}

function obterImagConformeStatusMagnetizacaoReal() {
    const statusMagnetizacaoReal = localStorage.getItem('magnetizacaoreal');
    const imagPadrao = parseFloat(localStorage.getItem('imagtotalSelecionada'));
    const imagReal = parseFloat(localStorage.getItem('inmagrealSelecionada'));

    const imagPadraoValida = Number.isFinite(imagPadrao);
    const imagRealValida = Number.isFinite(imagReal);
    const usarMagnetizacaoReal = statusMagnetizacaoReal === 'ligado' && imagRealValida;

    const imagAplicada = usarMagnetizacaoReal
        ? imagReal
        : (imagPadraoValida ? imagPadrao : NaN);

    return {
        imagAplicada,
        imagPadrao,
        imagReal,
        usarMagnetizacaoReal
    };
}



// -----------------------------------------------------------
//Função para carregar PARAMETROS ELETRICOS do localStorage e exibir na página

function carregarVariaveisEstudo() {

    const tensaoAtendimento = localStorage.getItem('tensaoSelecionada');
    if (tensaoAtendimento !== null) {
        const tensaoEl = document.getElementById('tensao-atendimento');
        if (tensaoEl) {
            tensaoEl.textContent = tensaoAtendimento + ' kV';
        }
    }

    const demandacalculada = localStorage.getItem('demandaSelecionada');
    const demandadecontrato = localStorage.getItem('demandadecontrato');
    document.querySelectorAll('.demanda-contratada-consumo').forEach(el => {
        if (demandadecontrato !== null && !isNaN(demandadecontrato)) {
            el.textContent = demandadecontrato + ' kW';
        }
    });

    // // Preencher campo demanda-contratada-gd com demandacalculada
    // const demandaCalculadaGD = localStorage.getItem('demandaSelecionadaGD');
    // const potenciaContratadaGD = localStorage.getItem('potenciaGDcontratada');
    // document.querySelectorAll('.ip-partida-numerador-TC-GD').forEach(el => {
    //     if (demandaCalculadaGD !== null && !isNaN(demandaCalculadaGD)) {
    //         el.textContent = demandaCalculadaGD + ' kW';
    //     }
    // });

    // Preencher campo potencia-gd com potenciaGDSelecionada
    const demandaCalculadaGD = localStorage.getItem('demandaSelecionadaGD');
    const potenciaGDSelecionada = localStorage.getItem('potenciaGDcontratada');
    document.querySelectorAll('.potencia-gd').forEach(el => {
        if (potenciaGDSelecionada !== null && !isNaN(potenciaGDSelecionada)) {
            el.textContent = potenciaGDSelecionada + ' kW';
        }
    });

    // Preencher campo potencia-de-injecao-gd com potenciaGDSelecionada
    const potenciaInjecaoGDSelecionada = localStorage.getItem('potenciaGDSelecionada');
    const tipoParalelismoSelecionado = localStorage.getItem('tipoParalelismoSelecionado');
    const inominalminimaTCGD = localStorage.getItem('inominalminimaTCGD');
    document.querySelectorAll('.potencia-de-injecao-gd').forEach(el => {
        if (potenciaInjecaoGDSelecionada !== null && !isNaN(potenciaInjecaoGDSelecionada) && tipoParalelismoSelecionado === 'Sem Injeção') {
            el.textContent = '0  ' + 'kW' + '(Sem Injeção - GRID ZERO)';

        } else if (potenciaInjecaoGDSelecionada !== null && !isNaN(potenciaInjecaoGDSelecionada) && tipoParalelismoSelecionado === 'Com Injeção' && inominalminimaTCGD !== null && inominalminimaTCGD === 'Sim') {
            el.textContent = potenciaInjecaoGDSelecionada + ' kW' + '(Considerando Injeção Mínima devido limitação do Sistema de Proteção)';
        } else if (potenciaInjecaoGDSelecionada !== null && !isNaN(potenciaInjecaoGDSelecionada) && tipoParalelismoSelecionado === 'Com Injeção' && inominalminimaTCGD !== null && inominalminimaTCGD === 'Não') {
            el.textContent = potenciaInjecaoGDSelecionada + ' kW';



        }
    });

    console.log('Potência de Injeção GD:', potenciaInjecaoGDSelecionada, 'Tipo de Paralelismo:', tipoParalelismoSelecionado, 'Injeção Mínima TC GD:', inominalminimaTCGD);

    //---------------------------------------------------------------------------
    const fatorPotencia = localStorage.getItem('fatorPotenciaSelecionada');
    if (fatorPotencia !== null) {
        const fatorEl = document.getElementById('fator-potencia');
        if (fatorEl) {
            fatorEl.textContent = fatorPotencia * 100 + '%';
        }
    }

    const fatorPotenciaGD = localStorage.getItem('fatorPotenciaGDSelecionada');
    if (fatorPotenciaGD !== null) {
        const fatorGDEl = document.getElementById('fator-potencia-gd');
        if (fatorGDEl) {
            fatorGDEl.textContent = fatorPotenciaGD * 100 + '%';
        }
    }



    const iccPontoConexao = localStorage.getItem('curtoSelecionada');
    if (iccPontoConexao !== null) {
        const iccEl = document.getElementById('icc-ponto-conexao');
        if (iccEl) {
            iccEl.textContent = iccPontoConexao + ' A';
        }
    }

    const releProtecao = localStorage.getItem('TabelaSelecionadaHTML');
    if (releProtecao !== null) {
        const releEl = document.getElementById('rele-protecao');
        if (releEl) {
            // Remove tudo antes do primeiro "-" (incluindo o "-")
            const textoLimpo = releProtecao.replace(/^[^-]*-/, '').trim();
            releEl.textContent = textoLimpo;
        }
    }






    const geradorSalvo = JSON.parse(localStorage.getItem("geradorJSON")) || {};
    const geradorDiesel = parseFloat(geradorSalvo.potencia) || 0;

    if (geradorDiesel !== null) {
        const geradorEl = document.getElementById('gerador-diesel');
        if (geradorEl) {
            geradorEl.textContent = geradorDiesel + ' kVA';
        }
    }


    // ---------FIM DO CARREGAMENTO DAS VARIAVEIS DOS PARAMETROS ELETRICO -------------------

    //-----------------FUNÇÃO PARA CARREGA CAMPOS E CALCULOS DE CORRENTES DOS TRAFOS-------------

    for (let i = 1; i <= 10; i++) { // Suporta até trafo10JSON e s-trf10
        const trafoSalvo = JSON.parse(localStorage.getItem(`trafo${i}JSON`)) || {};
        const potenciaTrafo = parseFloat(trafoSalvo.potencia) || 0;
        const qtdeTrafo = parseFloat(trafoSalvo.qtde) || 0;
        // Corrige para s-trf01, s-trf02 ... s-trf10 (com zero à esquerda para 1-9, sem zero para 10)
        const trafoId = i < 10 ? `s-trf0${i}` : `s-trf${i}`;
        const trafoEl = document.getElementById(trafoId);
        if (trafoEl) {
            trafoEl.textContent = potenciaTrafo + ' kVA';
        }


        // if(trafoSalvo.potencia === null || trafoSalvo.potencia === undefined || isNaN(potenciaTrafo) || potenciaTrafo === 0) {
        //     const calcTrafoClass = i < 10 ? `calculotrafos-texto tr${i}` : `calculotrafos-texto tr${i}`;
        //     const calcTrafoEls = document.getElementsByClassName(calcTrafoClass);
        //     Array.from(calcTrafoEls).forEach(el => {
        //         el.style.display = 'none';
        //     });
        // }


        if (
            potenciaTrafo === 0 ||
            qtdeTrafo === 0 ||
            trafoSalvo.potencia === null ||
            trafoSalvo.potencia === undefined ||
            trafoSalvo.qtde === null ||
            trafoSalvo.qtde === undefined
        ) {
            const calcTrafoClass = i < 10 ? `calculotrafos-texto-tr0${i}` : `calculotrafos-texto-tr${i}`;
            const calcTrafoEls = document.getElementsByClassName(calcTrafoClass);
            Array.from(calcTrafoEls).forEach(el => {
                el.style.display = 'none';
            });
        }

        // Preencher campo potencia da tabela de trafos
        const potenciaId = i < 10 ? `potencia-0${i}` : `potencia-${i}`;
        const potenciaEl = document.getElementById(potenciaId);
        if (potenciaEl) {
            potenciaEl.textContent = potenciaTrafo + ' kVA';
        }

        // Preencher campo de quantidade do trafo

        // const qtdeTrafo = parseFloat(trafoSalvo.qtde) || 0;
        const qtdeId = i < 10 ? `qtde-0${i}` : `qtde-${i}`;
        const qtdeEl = document.getElementById(qtdeId);
        if (qtdeEl) {
            qtdeEl.textContent = qtdeTrafo;
        }

        // Preencher campo im-in-0x importando imin
        const imin = trafoSalvo.imin || 0;
        const imInId = i < 10 ? `im-in-0${i}` : `im-in-${i}`;
        const imInEl = document.getElementById(imInId);
        if (imInEl) {
            imInEl.textContent = imin;
        }

        // Preencher campo t-0x importando tempo
        const tempo = trafoSalvo.tempo || 0;
        const tempoId = i < 10 ? `t-0${i}` : `t-${i}`;
        const tempoEl = document.getElementById(tempoId);
        if (tempoEl) {
            tempoEl.textContent = tempo + ' s';
        }




        // Preencher campo de tensão do trafo
        const tensaoTrafo = localStorage.getItem('tensaoSelecionada');
        const denominadorId = i < 10 ? `v-trf0${i}` : `v-trf${i}`;
        const denominadorEl = document.getElementById(denominadorId);
        if (denominadorEl && tensaoTrafo !== null) {
            denominadorEl.textContent = tensaoTrafo + ' *√3  kV';
        }

        // Preencher campo de corrente do trafo
        const correnteTrafo = potenciaTrafo;
        const correntesTrafos = JSON.parse(localStorage.getItem('correntestrafosJSON')) || {};
        const trafoKey = `trafo${i}`;
        const resultadoTrfId = i < 10 ? `resultado-trf0${i}` : `resultado-trf${i}`;

        // Preencher impedância do trafo
        const impedanciaTrafo = trafoSalvo.z || 0;
        // Preencher campo den-ansi-tr0x
        const impedanciaId = i < 10 ? `den-ansi-tr0${i}` : `den-ansi-tr${i}`;
        const impedanciaEl = document.getElementById(impedanciaId);
        if (impedanciaEl) {
            impedanciaEl.textContent = impedanciaTrafo + ' %';
        }
        // Preencher campo z-0x
        const zId = i < 10 ? `z-0${i}` : `z-${i}`;
        const zEl = document.getElementById(zId);
        if (zEl) {
            zEl.textContent = impedanciaTrafo + ' %';
        }
        //----------------------------FIM DO PREENCHIMENTO DOS CAMPOS DE TRAFO--------------------------------

        //--------------------INICIO DE FUNÇÃO QUE OCULTA OS CAMPOS DE TRAFOS QUE NÃO TEM VALOR DE CORRENTE OU QTDE-------------------











        if (correntesTrafos[trafoKey] && correntesTrafos[trafoKey].intrafoindividual !== undefined) {
            const resultadoTrfEl = document.getElementById(resultadoTrfId);
            if (resultadoTrfEl) {
                resultadoTrfEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }


            // Preencher campo de corrente do trafo neutro
            // Preencher campo de corrente do trafo neutro
            const inAnsiId = i < 10 ? `in-ansi-tr0${i}` : `in-ansi-tr${i}`;
            const inAnsiEl = document.getElementById(inAnsiId);
            if (inAnsiEl) {
                inAnsiEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }

            // Preencher campo in-0x
            const inId = i < 10 ? `in-0${i}` : `in-${i}`;
            const inEl = document.getElementById(inId);
            if (inEl) {
                inEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }

            // Preencher campo resultado-ansi-tr0x considerando intrafo
            const resultadoAnsiTrId = i < 10 ? `resultado-ansi-tr0${i}` : `resultado-ansi-tr${i}`;
            const resultadoAnsiTrEl = document.getElementById(resultadoAnsiTrId);
            if (resultadoAnsiTrEl) {
                resultadoAnsiTrEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo i-ansi-0x
            const iAnsiId = i < 10 ? `i-ansi-0${i}` : `i-ansi-${i}`;
            const iAnsiEl = document.getElementById(iAnsiId);
            if (iAnsiEl) {
                iAnsiEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo resultado-ansi-tr0x-neutro considerando iansi
            const resultadoAnsiTrNeutroId = i < 10 ? `resultado-ansi-tr0${i}-neutro` : `resultado-ansi-tr${i}-neutro`;
            const resultadoAnsiTrNeutroEl = document.getElementById(resultadoAnsiTrNeutroId);
            if (resultadoAnsiTrNeutroEl) {
                resultadoAnsiTrNeutroEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo i-nansi-0x
            const iNansiId = i < 10 ? `i-nansi-0${i}` : `i-nansi-${i}`;
            const iNansiEl = document.getElementById(iNansiId);
            if (iNansiEl && correntesTrafos[trafoKey].inansi !== undefined) {
                iNansiEl.textContent = correntesTrafos[trafoKey].inansi.toFixed(2) + ' A';
            }

            // Preencher campo resultado-neutro-tr0x considerando importação de inansi
            const resultadoNeutroTrId = i < 10 ? `resultado-neutro-tr0${i}` : `resultado-neutro-tr${i}`;
            const resultadoNeutroTrEl = document.getElementById(resultadoNeutroTrId);
            if (resultadoNeutroTrEl && correntesTrafos[trafoKey].inansi !== undefined) {
                resultadoNeutroTrEl.textContent = correntesTrafos[trafoKey].inansi.toFixed(2) + ' A';
            }

            // Preencher campo i-mag-0x
            const iMagId = i < 10 ? `i-mag-0${i}` : `i-mag-${i}`;
            const iMagEl = document.getElementById(iMagId);
            if (iMagEl && correntesTrafos[trafoKey].imagindividual !== undefined) {
                iMagEl.textContent = correntesTrafos[trafoKey].imagindividual.toFixed(2) + ' A';
            }

        }
    }


    // ----------------------INICIO CALCULO DE IMAG TOTAL DOS TRAFOS-----------------------------
    // Preencher campos de imag 
    const inMaiorTrafo = parseFloat(localStorage.getItem('maiortrafoinSelecionada'));
    const inMaiorTrafoEl = document.getElementById('in-maior-trafo');
    if (inMaiorTrafoEl && !isNaN(inMaiorTrafo)) {
        inMaiorTrafoEl.textContent = "In do maior trafo = " + "(" + inMaiorTrafo.toFixed(2);
    }

    // Preencher campo de maior fator IMIN
    const maiorTrafoImin = parseFloat(localStorage.getItem('maiortrafoiminSelecionada'));
    const maiorTrafoIminEl = document.getElementById('M-maior-trafo');
    if (maiorTrafoIminEl && !isNaN(maiorTrafoImin)) {
        maiorTrafoIminEl.textContent = ' x ' + maiorTrafoImin.toFixed(2) + ")";
    }

    // Preencher campo de maior trafo quando a quantidade do maior trafo for maior que 1
    const maiorTrafoQtde = parseFloat(localStorage.getItem('maiortrafoqtdeSelecionada'));
    const inTrafo2El = document.getElementById('in-trafo-1');
    if (inTrafo2El) {
        if (!isNaN(maiorTrafoQtde) && maiorTrafoQtde > 1) {
            const maiorTrafoIn = parseFloat(localStorage.getItem('maiortrafoinSelecionada'));
            inTrafo2El.textContent = !isNaN(maiorTrafoIn) ? `+ ( ${maiorTrafoIn.toFixed(2)} × ${maiorTrafoQtde - 1} )` : '';

            // inTrafo2El.textContent = !isNaN(maiorTrafoIn) ? maiorTrafoIn.toFixed(2) + ' A' : '';
            inTrafo2El.style.display = '';
        } else {
            inTrafo2El.style.display = 'none';
        }
    }

    // Preencher campo de corrente do trafo 2

    // Preencher in-trafo-2 até in-trafo-10 em ordem decrescente de corrente, desconsiderando o maior corrente intrafoindividual
    const correntesTrafos = JSON.parse(localStorage.getItem('correntestrafosJSON')) || {};
    // Monta array de correntes (trafo2 a trafo10) ignorando o maior corrente
    let trafosArray = [];
    for (let i = 1; i <= 10; i++) {
        const trafoKey = `trafo${i}`;
        const trafoSalvo = JSON.parse(localStorage.getItem(`${trafoKey}JSON`)) || {};
        const qtdeTrafo = parseFloat(trafoSalvo.qtde) || 0;
        if (correntesTrafos[trafoKey] && correntesTrafos[trafoKey].intrafoindividual !== undefined) {
            trafosArray.push({ i, corrente: correntesTrafos[trafoKey].intrafoindividual, qtde: qtdeTrafo });
        }
    }
    // Descobre o maior corrente entre trafo2 a trafo10
    const maiorCorrente = trafosArray.length > 0 ? Math.max(...trafosArray.map(t => t.corrente)) : null;
    // Remove o maior corrente
    trafosArray = trafosArray.filter(t => t.corrente !== maiorCorrente);
    // Ordena em ordem decrescente
    trafosArray.sort((a, b) => b.corrente - a.corrente);

    // Preenche os campos in-trafo-2 até in-trafo-10 conforme ordem decrescente (sem o maior)
    for (let idx = 0; idx < trafosArray.length; idx++) {
        const inTrafoEl = document.getElementById(`in-trafo-${idx + 2}`);
        if (inTrafoEl) {
            // Se qtde > 1, mostra x qtde, senão só corrente
            if (trafosArray[idx].qtde > 0 && trafosArray[idx].corrente > 0) {
                inTrafoEl.textContent = `+ ( ${trafosArray[idx].corrente.toFixed(2)} × ${trafosArray[idx].qtde} )`;
                // inTrafoEl.textContent = `+ ( ${trafosArray[idx].corrente.toFixed(2)} )`;
            }
            // else {

            // }
            inTrafoEl.style.display = '';
        }
    }
    // Oculta os campos restantes se não houver trafo suficiente
    for (let i = trafosArray.length + 1; i <= 10; i++) {
        const inTrafoEl = document.getElementById(`in-trafo-${i}`);
        if (inTrafoEl) {
            inTrafoEl.style.display = 'none';
        }
    }

    // Preencher campo de imag total dos trafos conforme status de magnetização real
    const { imagAplicada: imagTotal, imagPadrao: imagTotalPadrao } = obterImagConformeStatusMagnetizacaoReal();
    const imagTotalEls = document.querySelectorAll('.imag-total-valor');
    imagTotalEls.forEach(el => {
        if (!isNaN(imagTotal)) {
            el.textContent = imagTotal.toFixed(2) + ' A';
        }
    });

    // ---------------FIM DE IMAG DOS TRAFOS -------------------------------------------------

    // ----------------------INICIO CALCULO DE MAGNETIZACAO REAL-----------------------------

    // Carregar corrente de curto no calculo de imag real no HTML
    const curtoSelecionada = localStorage.getItem('curtoSelecionada');
    const inrushCc3fEl = document.getElementById('inrush-cc3f');
    if (inrushCc3fEl && curtoSelecionada !== null) {
        inrushCc3fEl.textContent = curtoSelecionada + ' A';
    }

    // Carregar corrente de inrush no calculo de imag real no HTML
    const inrushInEl = document.getElementById('inrush-in');
    if (inrushInEl && !isNaN(imagTotalPadrao)) {
        inrushInEl.textContent = imagTotalPadrao.toFixed(2) + ' A';
    }

    // Calcular 1/curtoSelecionada e preencher em divisao-icc com 2 casas decimais
    const divisaoIccEl = document.getElementById('divisao-icc');
    if (divisaoIccEl && curtoSelecionada !== null && !isNaN(curtoSelecionada) && parseFloat(curtoSelecionada) !== 0) {
        divisaoIccEl.textContent = (1 / parseFloat(curtoSelecionada)).toFixed(6);
    }

    // Calcular 1/imagTotal e preencher em divisao-inrush com 2 casas decimais
    const divisaoInrushEl = document.getElementById('divisao-inrush');
    if (divisaoInrushEl && !isNaN(imagTotalPadrao) && imagTotalPadrao !== 0) {
        divisaoInrushEl.textContent = (1 / imagTotalPadrao).toFixed(6);
    }


    // Calcular a soma das divisões e preencher em resultado-divisao
    const resultadoDivisaoEl = document.getElementById('resultado-divisao');
    if (
        resultadoDivisaoEl &&
        divisaoIccEl &&
        divisaoInrushEl &&
        !isNaN(parseFloat(divisaoIccEl.textContent)) &&
        !isNaN(parseFloat(divisaoInrushEl.textContent))
    ) {
        const soma = parseFloat(divisaoIccEl.textContent) + parseFloat(divisaoInrushEl.textContent);
        resultadoDivisaoEl.textContent = soma.toFixed(6);
    }

    // Calcular o resultado final da magnetização real
    // Calcular o resultado final da magnetização real
    const resultadoInrushRealEl = document.getElementById('resultado-inrush-real');
    if (
        resultadoInrushRealEl &&
        divisaoIccEl &&
        divisaoInrushEl &&
        !isNaN(parseFloat(divisaoIccEl.textContent)) &&
        !isNaN(parseFloat(divisaoInrushEl.textContent))
    ) {
        const soma = parseFloat(divisaoIccEl.textContent) + parseFloat(divisaoInrushEl.textContent);
        if (soma !== 0) {
            resultadoInrushRealEl.textContent = (1 / soma).toFixed(2) + ' A';
        } else {
            resultadoInrushRealEl.textContent = '';
        }
    }

    // -----------------------FIM DE MAGNETIZACAO REAL--------------------------------

    // ---------------INICIO DIMENSIONAMENTO DE TC------------------------------------

    // Carregar corrente de curto no calculo de TC no HTML  
    const curtoSelecionadaTC = localStorage.getItem('curtoSelecionada');
    const curtoTCEl = document.getElementById('curtoTC');
    if (curtoTCEl && curtoSelecionadaTC !== null) {
        curtoTCEl.textContent = curtoSelecionadaTC + ' A';
    }

    // Calcular curtoSelecionadaTC / 50 e preencher em tc-saturacao-primario
    const tcSaturacaoPrimarioEl = document.getElementById('tc-saturacao-primario');
    if (tcSaturacaoPrimarioEl && curtoSelecionadaTC !== null && !isNaN(curtoSelecionadaTC)) {
        tcSaturacaoPrimarioEl.textContent = (parseFloat(curtoSelecionadaTC) / 50).toFixed(2);
    }

    //Preencher saturação do TC
    const correnteMagnetizacaoSaturacaoTCEl = document.getElementById('corrente-magnetizacao-saturacao-tc');
    if (correnteMagnetizacaoSaturacaoTCEl) {
        correnteMagnetizacaoSaturacaoTCEl.textContent = (imagTotal / 20).toFixed(2) + ' A';
    }

    // importar o IP fase percentual do localStorage
    const percentualIP = localStorage.getItem('PercentualIPSelecionada');
    const percentualIPEl = document.getElementById('percentual-ip');
    if (percentualIPEl && percentualIP !== null) {
        percentualIPEl.textContent = percentualIP + ' %';
    }

    // importar o IP GD fase percentual do localStorage
    const percentualIPGD = localStorage.getItem('PercentualIPSelecionadaGD');
    const percentualIPGDEl = document.getElementById('percentual-ip-gd');
    if (percentualIPGDEl && percentualIPGD !== null) {
        percentualIPGDEl.textContent = percentualIPGD + ' %';
    }

    // Representar o numerador do calculo de ip de partida fase 
    // Preencher campo numerador-potencia-nominal com demanda contratada
    const numeradorPotenciaNominalEls = document.querySelectorAll('.numerador-potencia-nominal');
    numeradorPotenciaNominalEls.forEach(el => {
        if (demandacalculada !== null && !isNaN(demandacalculada)) {
            el.textContent = demandacalculada;
        }
    });

    // Representar o numerador do calculo de ip de partida fase GD
    // Preencher campo numerador-potencia-nominal com demanda contratada
    const numeradorPotenciaNominalGDEls = document.querySelectorAll('.numerador-potencia-nominal-gd');
    numeradorPotenciaNominalGDEls.forEach(el => {
        if (potenciaGDSelecionada !== null && !isNaN(potenciaGDSelecionada)) {
            el.textContent = potenciaGDSelecionada;
        }
    });

    // Preencher campo ip-partida-numerador considerando demanda contratada e incremento percentual
    const ipPartidaNumeradorEls = document.querySelectorAll('.ip-partida-numerador');
    ipPartidaNumeradorEls.forEach(el => {
        if (demandacalculada !== null && !isNaN(demandacalculada)) {
            // Interpolação: mostra demanda + incremento percentual
            const incremento = parseFloat((percentualIP) / 100);
            el.textContent = `${demandacalculada} * ${incremento.toFixed(2)}`;

            //             const incremento = (parseFloat(demandacalculada) * parseFloat(percentualIP) / 100);
            // el.textContent = `${demandacalculada} + ${incremento.toFixed(2)}`;

        }
    });

    // Preencher campo ip-partida-numerador GD considerando Potencia contratada  GD e incremento percentual
    const ipPartidaNumeradorGDEls = document.querySelectorAll('.ip-partida-numerador-gd');
    ipPartidaNumeradorGDEls.forEach(el => {
        if (potenciaGDSelecionada !== null && !isNaN(potenciaGDSelecionada)) {
            // Interpolação: mostra demanda + incremento percentual
            const incremento = parseFloat((percentualIPGD) / 100);
            el.textContent = `${potenciaGDSelecionada} * ${incremento.toFixed(2)}`;

            //             const incremento = (parseFloat(demandacalculada) * parseFloat(percentualIP) / 100);
            // el.textContent = `${demandacalculada} + ${incremento.toFixed(2)}`;

        }
    });

    // Para ip-partida-numerador-TC para consumo
    const ipPartidaNumeradorTCEls = document.querySelectorAll('.ip-partida-numerador-TC');
    ipPartidaNumeradorTCEls.forEach(el => {
        if (demandadecontrato !== null && !isNaN(demandadecontrato)) {
            const incremento = parseFloat((percentualIP) / 100);
            el.textContent = `${demandadecontrato} * ${incremento.toFixed(2)}`;
        }
    });

    // Incluir corrente nominal de fase
    const correnteNominalFase = localStorage.getItem('Inominalfase');
    const correnteNominalFaseEls = document.querySelectorAll('.corrente-nominal-fase');
    correnteNominalFaseEls.forEach(el => {
        if (correnteNominalFase !== null && !isNaN(correnteNominalFase)) {
            el.textContent = parseFloat(correnteNominalFase).toFixed(2) + ' A';
        }
    });

    //Incluir corrente nominal de fase GD
    const correnteNominalFaseGD = localStorage.getItem('InominalfaseGD');
    const correnteNominalFaseGDEls = document.querySelectorAll('.corrente-nominal-fase-gd');
    correnteNominalFaseGDEls.forEach(el => {
        if (correnteNominalFaseGD !== null && !isNaN(correnteNominalFaseGD)) {
            el.textContent = parseFloat(correnteNominalFaseGD).toFixed(2) + ' A';
        }
    });


    // Representar o denominador do calculo de ip de partida fase consumo
    const ipPartidaDenominadorEls = document.querySelectorAll('.ip-partida-denominador');
    ipPartidaDenominadorEls.forEach(el => {
        if (tensaoAtendimento !== null && !isNaN(tensaoAtendimento) && fatorPotencia !== null && !isNaN(fatorPotencia)) {
            el.textContent = `${tensaoAtendimento} × √3 × ${fatorPotencia}`;
        }
    });

    // Representar o denominador do calculo de ip de partida fase GD
    const ipPartidaDenominadorGDEls = document.querySelectorAll('.ip-partida-denominador-gd');
    ipPartidaDenominadorGDEls.forEach(el => {
        if (tensaoAtendimento !== null && !isNaN(tensaoAtendimento) && fatorPotenciaGD !== null && !isNaN(fatorPotenciaGD)) {
            el.textContent = `${tensaoAtendimento} × √3 × ${fatorPotenciaGD}`;
        }
    });

    // Preencher campo ip-partida-resultado considerando Ipdeconsumo
    const ipDeConsumo = localStorage.getItem('Ipdeconsumo');
    const ipPartidaResultadoEls = document.querySelectorAll('.ip-partida-resultado');
    ipPartidaResultadoEls.forEach(el => {
        if (ipDeConsumo !== null && !isNaN(ipDeConsumo)) {
            el.textContent = parseFloat(ipDeConsumo).toFixed(2) + ' A';
        }
    });

    // Preencher campo ip-partida-resultado-GD considerando IpdeconsumoGD
    const ipDeConsumoGD = localStorage.getItem('IpfaseGD');
    const ipPartidaResultadoGDEls = document.querySelectorAll('.ip-partida-resultado-gd');
    ipPartidaResultadoGDEls.forEach(el => {
        if (ipDeConsumoGD !== null && !isNaN(ipDeConsumoGD)) {
            el.textContent = parseFloat(ipDeConsumoGD).toFixed(2) + ' A';
        }
    });

    // Preencher campo ip-partida-resultado-TC considerando IpdeconsumoTC
    const ipDeConsumoTC = demandadecontrato * ((parseFloat(percentualIP) / 100)) / (tensaoAtendimento * Math.sqrt(3) * fatorPotencia);
    const ipPartidaResultadoTCEls = document.querySelectorAll('.ip-partida-resultado-TC');
    ipPartidaResultadoTCEls.forEach(el => {
        if (ipDeConsumoTC !== null && !isNaN(ipDeConsumoTC)) {
            el.textContent = parseFloat(ipDeConsumoTC).toFixed(2) + ' A';
        }
    });

    // Preencher campo ip-partida-resultado-TC-GD considerando IpdeconsumoTC
    const ipDeConsumoTCGD = potenciaGDSelecionada * ((parseFloat(percentualIPGD) / 100)) / (tensaoAtendimento * Math.sqrt(3) * fatorPotenciaGD);
    const ipPartidaResultadoTCGDEls = document.querySelectorAll('.ip-partida-resultado-TC-GD');
    ipPartidaResultadoTCGDEls.forEach(el => {
        if (ipDeConsumoTCGD !== null && !isNaN(ipDeConsumoTCGD)) {
            el.textContent = parseFloat(ipDeConsumoTCGD).toFixed(2) + ' A';
        }
    });


    //calculo e preenchimento da corrente correspondente a 10% do TC de proteção
    const TCdeprotecaoSelecionada = localStorage.getItem('TCdeprotecaoSelecionada');
    const corrente10PercentTC = (parseFloat(TCdeprotecaoSelecionada)) * 0.1; // Corrente correspondente a 10% do TC de proteção
    const corrente10PercentTCEls = document.querySelectorAll('.corrente-10-percent-tc');
    corrente10PercentTCEls.forEach(el => {
        if (TCdeprotecaoSelecionada !== null && !isNaN(TCdeprotecaoSelecionada)) {
            el.textContent = corrente10PercentTC.toFixed(2) + ' A';
        }
    });

    // Preencher campo tc-especificacao considerando TcEspecificacaoSelecionada
    const tcEspecificacao = localStorage.getItem('TCdeprotecaoSelecionada');
    const tcEspecificacaoEls = document.querySelectorAll('.tc-especificacao');
    tcEspecificacaoEls.forEach(el => {
        if (tcEspecificacao !== null && !isNaN(tcEspecificacao)) {
            el.textContent = "Relação de transformação do TC = " + parseFloat(tcEspecificacao) + ' : 5 A';
        }
    });

    // Preencher valor puro em tc-especificacao-valor
    const tcEspecificacaoValorEls = document.querySelectorAll('.tc-especificacao-valor');
    tcEspecificacaoValorEls.forEach(el => {
        if (tcEspecificacao !== null && !isNaN(tcEspecificacao)) {
            el.textContent = parseFloat(tcEspecificacao);
        }
    });



    // Preencher campos de TP primária e secundária
    const tpProtecaoRelacao = localStorage.getItem('TPdeprotecaoSelecionada');
    const tpPrimariaFF = localStorage.getItem('tensaoprimariaFF');
    const tpPrimariaFN = localStorage.getItem('tensaoprimariaFN');
    const tpSecundariaFF = localStorage.getItem('tensaoSecundariaFFTP');
    const tpSecundariaFN = localStorage.getItem('tensaoSecundariaFNTP');
    const rtpLabel = localStorage.getItem('TPdeprotecaoSelecionada');
    const tpFechamento = localStorage.getItem('ligacaodabobinaSelecionada');

    // Preencher campos de TP primária e secundária usando classes
    document.querySelectorAll('.relacao-tp-gd').forEach(el => {
        if (tpProtecaoRelacao !== null) el.textContent = tpProtecaoRelacao + ' :1';
    });



    document.querySelectorAll('.tp-fechamento').forEach(el => {
        if (tpFechamento !== null) el.textContent = tpFechamento;
    });
    document.querySelectorAll('.tp-primaria-ff').forEach(el => {
        if (tpPrimariaFF !== null) el.textContent = tpPrimariaFF + ' V';
    });
    document.querySelectorAll('.tp-primaria-fn').forEach(el => {
        if (tpPrimariaFN !== null) el.textContent = tpPrimariaFN + ' V';
    });
    document.querySelectorAll('.tp-secundaria-ff').forEach(el => {
        if (tpSecundariaFF !== null) el.textContent = tpSecundariaFF + ' V';
    });
    document.querySelectorAll('.tp-secundaria-fn').forEach(el => {
        if (tpSecundariaFN !== null) el.textContent = tpSecundariaFN + ' V';
    });
    document.querySelectorAll('.rtp-label').forEach(el => {
        if (rtpLabel !== null) el.textContent = rtpLabel + ' :1';
    });

    // Importar ipPUSelecionada do localStorage e preencher em corrente-ip-pu
    const ipPUSelecionada = localStorage.getItem('ipPUSelecionada');
    const correnteIpPuEls = document.querySelectorAll('.corrente-ip-pu');
    correnteIpPuEls.forEach(el => {
        if (ipPUSelecionada !== null && !isNaN(ipPUSelecionada)) {
            el.textContent = parseFloat(ipPUSelecionada).toFixed(2) + ' P.U';
        }
    });


    // Importar IpPUSelecionadaGD do localStorage e preencher em corrente-ip-pu-gd
    const ipPUSelecionadaGD = localStorage.getItem('ipPUSelecionadaGD');
    const correnteIpPuGDEls = document.querySelectorAll('.corrente-ip-pu-gd');
    correnteIpPuGDEls.forEach(el => {
        if (ipPUSelecionadaGD !== null && !isNaN(ipPUSelecionadaGD)) {
            el.textContent = parseFloat(ipPUSelecionadaGD).toFixed(2) + ' P.U';
        }
    });


    // Importar curva de fase selecionada do localStorage e preencher em curva-fase
    const curvaFaseSelecionada = localStorage.getItem('curvafaseSelecionada');
    const curvaFaseEls = document.querySelectorAll('.curva-fase');
    curvaFaseEls.forEach(el => {
        if (curvaFaseSelecionada !== null) {
            el.textContent = curvaFaseSelecionada;
        }
    });

    // Importar curva de fase GD selecionada do localstorage e preencher em curva-fase-gd
    const curvaFaseSelecionadaGD = localStorage.getItem('curvafaseSelecionadaGD');
    const curvaFaseElsGD = document.querySelectorAll('.curva-fase-gd');
    curvaFaseElsGD.forEach(el => {
        if (curvaFaseSelecionadaGD !== null) {
            el.textContent = curvaFaseSelecionadaGD;
        }
    });


    // -----------------FIM DIMENSIONAMENTO DE TC-------------------------------------------


    //----------------------INICIO PRENCHIMENTO FUNÇÃO 67 CONSUMO FASE--------------------------------

    // Importar AMT padrão fase e neutro GD do localStorage

    //importa AMT padrão fase GD do localStorage , e preenche angulo-amt-fase-gd com o resultado se nao tiver vazio
    const AMTpadraofasehtmlGD = localStorage.getItem('AMTpadraofasehtmlGD');
    const anguloAmtFaseGDEls = document.querySelectorAll('.angulo-amt-fase-gd');
    anguloAmtFaseGDEls.forEach(el => {
        if (AMTpadraofasehtmlGD !== null) {
            el.textContent = AMTpadraofasehtmlGD;
        }
    });


    //importa AMT padrão neutro GD do localstorage , e preenche angulo-amt-neutro com o resultado se não tiver vazio
    const AMTpadraoneutrohtmlGD = localStorage.getItem('AMTpadraoneutrohtmlGD');
    const anguloAmtNeutroGDEls = document.querySelectorAll('.angulo-amt-neutro-gd');
    anguloAmtNeutroGDEls.forEach(el => {
        if (AMTpadraoneutrohtmlGD !== null) {
            el.textContent = AMTpadraoneutrohtmlGD;
        }
    });



    // Preencher campos fator-alfa-fase, fator-beta-fase, fator-k-fase importando de dadoscurvausariofase

    const dadosCurvaUsuarioFase = JSON.parse(localStorage.getItem('dadoscurvausariofase')) || {};
    const alfaFase = dadosCurvaUsuarioFase.alfa || 0;
    const betaFase = dadosCurvaUsuarioFase.beta || 0;
    const kFase = dadosCurvaUsuarioFase.k || 0;

    const alfaFaseEls = document.querySelectorAll('.fator-alfa-fase');
    alfaFaseEls.forEach(el => {
        el.textContent = alfaFase;
    });

    const betaFaseEls = document.querySelectorAll('.fator-beta-fase');
    betaFaseEls.forEach(el => {
        el.textContent = betaFase;
    });

    const kFaseEls = document.querySelectorAll('.fator-k-fase');
    kFaseEls.forEach(el => {
        el.textContent = kFase;
    });

    // Calcular fator m = imagTotal / correnteNominalFase e preencher em fator-m
    // Preencher todos os elementos com a classe 'fator-m'
    const fatorMEls = document.querySelectorAll('.fator-m');
    if (imagTotal !== null && correnteNominalFase !== null && !isNaN(imagTotal) && !isNaN(correnteNominalFase) && parseFloat(correnteNominalFase) !== 0) {
        const fatorM = imagTotal / parseFloat(correnteNominalFase);
        fatorMEls.forEach(el => {
            el.textContent = fatorM.toFixed(2);
        });
    }

    // Preencher campo tempo-mag-fase com valor 0.10
    const tempomagFase = 0.100;
    const tempoMagFaseEls = document.querySelectorAll('.tempo-mag-fase');
    tempoMagFaseEls.forEach(el => {
        el.textContent = tempomagFase.toFixed(2) + ' s ou ' + (tempomagFase * 1000).toFixed(0) + ' ms';

    });

    //Preencher formulas do dial 
    atualizarFormulasCalculoDial();

    // Função centralizada para atualizar todas as fórmulas do cálculo do dial
    function atualizarFormulasCalculoDial(tentativa = 0) {
        // Verificar se MathJax está disponível antes de prosseguir
        if (typeof MathJax === 'undefined' || !MathJax.typesetPromise) {
            if (tentativa < 40) {
                setTimeout(() => atualizarFormulasCalculoDial(tentativa + 1), 300);
            }
            return;
        }

        // Obter valores do localStorage
        const { imagAplicada: imagTotal } = obterImagConformeStatusMagnetizacaoReal();
        const correnteNominalFase = localStorage.getItem('Inominalfase');
        const tempomagFase = 0.100;

        const dadosCurva = JSON.parse(localStorage.getItem('dadoscurvausariofase')) || {};
        const betaFase = dadosCurva.beta || 'β';
        const alfaFase = dadosCurva.alfa || 'α';
        const kFase = dadosCurva.k || 'k';

        const parsedIn = parseFloat(correnteNominalFase);

        // Preencher fórmula para .formula1
        const latex1 = `DT = \\left( \\frac{\\left( \\frac{${'imag'}}{${'In'}} \\right)^{\\alpha}- ${'k'}}{\\beta}  \\right) \\times ${'t'}`;
        const formulaEl1 = document.querySelector(".formula1");
        if (formulaEl1) {
            formulaEl1.innerHTML = `\\(${latex1}\\)`;
        }

        // Preencher fórmula para .formula2
        const latex2 = `DT = \\left( \\frac{\\left( \\frac{${imagTotal.toFixed(2)}}{${parseFloat(correnteNominalFase).toFixed(2)}} \\right)^{${alfaFase}}- ${kFase}}{${betaFase}}  \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        const formulaEl2 = document.querySelector(".formula2");
        if (formulaEl2) {
            formulaEl2.innerHTML = `\\(${latex2}\\)`;
        }

        // Preencher fórmula para .formula3 (mesma lógica que formula2)
        // calcular resultado da fração imagTotal / correnteNominalFase e usar esse valor direto na fórmula
        let fracValue = null;
        if (!isNaN(imagTotal) && !isNaN(parsedIn) && parsedIn !== 0) {
            fracValue = imagTotal / parsedIn;
        }

        let latex3;
        if (fracValue !== null) {
            // utiliza o valor numérico da fração diretamente
            latex3 = `DT = \\left( \\frac{\\left( ${fracValue.toFixed(2)} \\right)^{${alfaFase}}- ${kFase}}{${betaFase}}  \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        } else {
            // fallback para exibir a fração caso não seja possível calcular (p.ex. valores ausentes)
            const inDisplay = !isNaN(parsedIn) ? parsedIn.toFixed(2) : 'In';
            latex3 = `DT = \\left( \\frac{\\left( \\frac{${imagTotal.toFixed(2)}}{${inDisplay}} \\right)^{${alfaFase}}- ${kFase}}{${betaFase}}  \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        }
        const formulaEl3 = document.querySelector(".formula3");
        if (formulaEl3) {
            formulaEl3.innerHTML = `\\(${latex3}\\)`;
        }

        // Preencher fórmula4 usando o resultado da exponenciação do fracValue (se disponível)
        let expValue = null;
        if (fracValue !== null && !isNaN(fracValue) && !isNaN(alfaFase)) {
            expValue = Math.pow(fracValue, alfaFase);
        }

        let latex4;
        if (expValue !== null && !isNaN(expValue)) {
            latex4 = `DT = \\left( \\frac{${expValue.toFixed(2)}- ${kFase}}{${betaFase}}  \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        } else if (fracValue !== null && !isNaN(fracValue)) {
            latex4 = `DT = \\left( \\frac{\\left( ${fracValue.toFixed(2)} \\right)^{${alfaFase}}- ${kFase}}{${betaFase}}  \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        } else {
            const inDisplay = !isNaN(parsedIn) ? parsedIn.toFixed(2) : 'In';
            latex4 = `DT = \\left( \\frac{\\left( \\frac{${imagTotal.toFixed(2)}}{${inDisplay}} \\right)^{${alfaFase}}}{${betaFase}} - ${kFase} \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        }

        const formulaEl4 = document.querySelector(".formula4");
        if (formulaEl4) {
            formulaEl4.innerHTML = `\\(${latex4}\\)`;
        }

        // Formula 5
        const formulaEl5 = document.querySelector('.formula5');
        let expValueLocal = null;
        if (fracValue !== null && !isNaN(fracValue) && !isNaN(Number(alfaFase))) {
            expValueLocal = Math.pow(fracValue, Number(alfaFase));
        }

        const kNum = Number(kFase);
        let resultadoExpMenosK = null;
        if (expValueLocal !== null && !isNaN(expValueLocal) && !isNaN(kNum)) {
            resultadoExpMenosK = expValueLocal - kNum;
        }

        const betaNum = Number(betaFase);
        const tNum = Number(tempomagFase);

        let latex5;
        if (resultadoExpMenosK !== null && !isNaN(resultadoExpMenosK)) {
            latex5 = `DT = \\left( \\frac{${resultadoExpMenosK.toFixed(2)}}{${isNaN(betaNum) ? betaFase : betaNum}} \\right) \\times ${isNaN(tNum) ? tempomagFase : tNum.toFixed(3)}`;
        } else if (expValueLocal !== null && !isNaN(expValueLocal)) {
            latex5 = `DT = \\left( \\frac{${expValueLocal.toFixed(2)} - ${kNum}}{${isNaN(betaNum) ? betaFase : betaNum}} \\right) \\times ${isNaN(tNum) ? tempomagFase : tNum.toFixed(3)}`;
        } else {
            const inDisplay = !isNaN(parsedIn) ? parsedIn.toFixed(2) : 'In';
            latex5 = `DT = \\left( \\frac{\\left( \\frac{${imagTotal.toFixed(2)}}{${inDisplay}} \\right)^{${alfaFase}} - ${kNum}}{${betaFase}} \\right) \\times ${parseFloat(tempomagFase).toFixed(3)}`;
        }

        if (formulaEl5) {
            formulaEl5.innerHTML = `\\(${latex5}\\)`;
        }

        // Formula 6
        const el6 = document.querySelector('.formula6');
        if (el6) {
            if (resultadoExpMenosK !== null && isFinite(resultadoExpMenosK) && isFinite(betaNum) && betaNum !== 0) {
                const divisao = resultadoExpMenosK / betaNum;
                const latex6 = `DT = \\left( ${divisao.toFixed(2)} \\right) \\times ${tempomagFase.toFixed(3)}`;
                el6.style.display = '';
                el6.innerHTML = `\\(${latex6}\\)`;
            } else {
                el6.innerHTML = '';
                el6.style.display = 'none';
            }
        }

        // Formula 7
        const el7 = document.querySelector('.formula7');
        if (el7) {
            if (fracValue !== null && isFinite(fracValue) && isFinite(Number(alfaFase)) && isFinite(betaNum) && betaNum !== 0 && isFinite(kNum)) {
                const expValueF7 = Math.pow(fracValue, Number(alfaFase));
                if (isFinite(expValueF7)) {
                    const numerador = expValueF7 - kNum;
                    if (isFinite(numerador)) {
                        const divisao = numerador / betaNum;
                        if (isFinite(divisao)) {
                            const resultadoFinal = divisao * tempomagFase;
                            el7.style.display = '';
                            el7.innerHTML = `DT = ${resultadoFinal.toFixed(2)}`;
                        } else {
                            el7.innerHTML = '';
                            el7.style.display = 'none';
                        }
                    } else {
                        el7.innerHTML = '';
                        el7.style.display = 'none';
                    }
                } else {
                    el7.innerHTML = '';
                    el7.style.display = 'none';
                }
            } else {
                el7.innerHTML = '';
                el7.style.display = 'none';
            }
        }

        const formulasDial = Array.from(document.querySelectorAll('.formula1, .formula2, .formula3, .formula4, .formula5, .formula6, .formula7'));
        if (formulasDial.length > 0) {
            MathJax.typesetPromise(formulasDial).catch(err => console.error('Erro ao renderizar fórmulas do dial:', err));
        }
    }
    // Preencher campo dial-fase com dialCalculadoPlantaSemMotores
    const dialCalculadoPlantaSemMotores = localStorage.getItem('dialCalculadoPlantaSemMotores');
    const dialFaseEls = document.querySelectorAll('.dial-fase-calculado');
    dialFaseEls.forEach(el => {
        if (dialCalculadoPlantaSemMotores !== null && !isNaN(dialCalculadoPlantaSemMotores)) {
            el.textContent = parseFloat(dialCalculadoPlantaSemMotores).toFixed(2);
        }
    });

    // Preencher campo dial-fase-ajustado com dialFaseAjustado
    const dialFaseAjustado = localStorage.getItem('dialfaseSelecionada');
    const dialFaseAjustadoEls = document.querySelectorAll('.dial-fase-ajustado');
    dialFaseAjustadoEls.forEach(el => {
        if (dialFaseAjustado !== null && !isNaN(dialFaseAjustado)) {
            el.textContent = parseFloat(dialFaseAjustado).toFixed(2);
        }
    });

    // Preencher o campo dial-fase-ajustado-gd com dialFaseAjustadoGD
    const dialFaseAjustadoGD = localStorage.getItem('dialfaseSelecionadaGD');
    const dialFaseAjustadoGDEls = document.querySelectorAll('.dial-fase-ajustado-gd');
    dialFaseAjustadoGDEls.forEach(el => {
        if (dialFaseAjustadoGD !== null && !isNaN(dialFaseAjustadoGD)) {
            el.textContent = parseFloat(dialFaseAjustadoGD).toFixed(2);
        }
    });

    // Preencher campo tolerancia-imag com imagpercentualSelecionada
    const imagPercentualSelecionada = localStorage.getItem('imagpercentualSelecionada');
    const toleranciaImagEls = document.querySelectorAll('.imag-tolerancia-percentual');
    toleranciaImagEls.forEach(el => {
        if (imagPercentualSelecionada !== null && !isNaN(imagPercentualSelecionada)) {
            el.textContent = imagPercentualSelecionada + ' %';
        }
    });

    // Preencher campo tolerancia-imag com imagTotal e imagPercentualSelecionada
    const valorToleranciaImagEls = document.querySelectorAll('.valor-torlerancia-imag');
    valorToleranciaImagEls.forEach(el => {
        if (imagTotal !== null && !isNaN(imagTotal) && imagPercentualSelecionada !== null && !isNaN(imagPercentualSelecionada)) {
            const valor = parseFloat((imagPercentualSelecionada) / 100);
            el.textContent = '* ' + valor.toFixed(2);
        }
    });

    // Preencher campo tolerancia-ip com ippercentualSelecionada
    const instFaseConsumo = parseFloat(localStorage.getItem('Instfaseconsumo'));
    const instFaseResultadoEls = document.querySelectorAll('.inst-fase-resultado');
    instFaseResultadoEls.forEach(el => {
        if (!isNaN(instFaseConsumo)) {
            el.textContent = instFaseConsumo.toFixed(2) + ' A';
        }
    });

    // Preencher campo inst-valor-pu com iinstPUSelecionada
    const iinstPUSelecionada = localStorage.getItem('iinstPUSelecionada');
    const instValorPuEls = document.querySelectorAll('.inst-valor-pu');
    instValorPuEls.forEach(el => {
        if (iinstPUSelecionada !== null && !isNaN(iinstPUSelecionada)) {
            el.textContent = parseFloat(iinstPUSelecionada).toFixed(2) + ' P.U';
        }
    });

    // Preencher campo Desequelibrio-neutro com desequilibrioSelecionada
    const desequilibrioSelecionada = localStorage.getItem('desequilibrioSelecionada');
    // console.log('desequilibrioSelecionada:', desequilibrioSelecionada); // Debug: verificar valor de desequilibrioSelecionada
    const desequilibrioNeutroEls = document.querySelectorAll('.Desequelibrio-neutro');
    desequilibrioNeutroEls.forEach(el => {
        if (desequilibrioSelecionada !== null && !isNaN(desequilibrioSelecionada)) {
            el.textContent = desequilibrioSelecionada + ' %';
        }
    });

    // Preencher campo in-neutro com inominalneutroconsumo
    const inominalNeutroConsumo = localStorage.getItem('Inominalneutroconsumo');
    const inNeutroEls = document.querySelectorAll('.in-neutro');
    inNeutroEls.forEach(el => {
        if (inominalNeutroConsumo !== null && !isNaN(inominalNeutroConsumo)) {
            el.textContent = parseFloat(inominalNeutroConsumo).toFixed(2) + ' A';
        }
    });

    // Preencher campo ip-neutro com IpneutroSelecionada
    const ipNeutroSelecionada = localStorage.getItem('IpdeneutroSelecionada');
    const ipNeutroEls = document.querySelectorAll('.ip-neutro');
    ipNeutroEls.forEach(el => {
        if (ipNeutroSelecionada !== null && !isNaN(ipNeutroSelecionada)) {
            el.textContent = parseFloat(ipNeutroSelecionada).toFixed(2) + ' A';
        }
    });

    // Preencher campo ip-neutro-gd com IpdeneutroSelecionadaGD
    const ipNeutroSelecionadaGD = localStorage.getItem('IpdeneutroSelecionadaGD');
    const ipNeutroGDEls = document.querySelectorAll('.ip-neutro-gd');
    ipNeutroGDEls.forEach(el => {
        if (ipNeutroSelecionadaGD !== null && !isNaN(ipNeutroSelecionadaGD)) {
            el.textContent = parseFloat(ipNeutroSelecionadaGD).toFixed(2) + ' A';
        }
    });

    // Preencher campo in-neutro-PU com ipneutroPUSelecionada
    const ipneutroPUSelecionada = localStorage.getItem('ipneutroPUSelecionada');
    const inNeutroPuEls = document.querySelectorAll('.ip-neutro-PU');
    inNeutroPuEls.forEach(el => {
        if (ipneutroPUSelecionada !== null && !isNaN(ipneutroPUSelecionada)) {
            el.textContent = parseFloat(ipneutroPUSelecionada).toFixed(2) + ' P.U';
        }
    });

    //Preencher campo ip-neutro-PU-gd com ipneutroPUSelecionadaGD
    const ipneutroPUSelecionadaGD = localStorage.getItem('ipneutroPUSelecionadaGD');
    const ipNeutroPuGDEls = document.querySelectorAll('.ip-neutro-PU-gd');
    ipNeutroPuGDEls.forEach(el => {
        if (ipneutroPUSelecionadaGD !== null && !isNaN(ipneutroPUSelecionadaGD)) {
            el.textContent = parseFloat(ipneutroPUSelecionadaGD).toFixed(2) + ' P.U';
        }
    });

    // Preencher tempo-neutro-ip com dialNeutroSelecionada
    const dialNeutroSelecionada = localStorage.getItem('dialneutroSelecionada');
    const tempoNeutroIpEls = document.querySelectorAll('.tempo-neutro-ip');
    tempoNeutroIpEls.forEach(el => {
        if (dialNeutroSelecionada !== null && !isNaN(dialNeutroSelecionada)) {
            el.textContent = parseFloat(dialNeutroSelecionada).toFixed(2) + " s";
        }
    });

    //Preencher tempo-neutro-ip-gd com dialNeutroSelecionadaGD
    const dialNeutroSelecionadaGD = localStorage.getItem('dialneutroSelecionadaGD');
    const tempoNeutroIpGDEls = document.querySelectorAll('.tempo-neutro-ip-gd');
    tempoNeutroIpGDEls.forEach(el => {
        if (dialNeutroSelecionadaGD !== null && !isNaN(dialNeutroSelecionadaGD)) {
            el.textContent = parseFloat(dialNeutroSelecionadaGD).toFixed(2) + " s";
        }
    });

    // Preencher campo inst-neutro-resultado com InstneutroSelecionada
    const instNeutroSelecionada = localStorage.getItem('IinstneutroSelecionada');
    const instNeutroResultadoEls = document.querySelectorAll('.inst-neutro-resultado');
    instNeutroResultadoEls.forEach(el => {
        if (instNeutroSelecionada !== null && !isNaN(instNeutroSelecionada)) {
            el.textContent = parseFloat(instNeutroSelecionada).toFixed(2) + ' A';
        }
    });

    // console.log(instNeutroSelecionada);


    const instneutroPUSelecionada = localStorage.getItem('instneutroPUSelecionada');
    const instNeutroPuEls = document.querySelectorAll('.inst-neutro-PU');
    instNeutroPuEls.forEach(el => {
        if (instneutroPUSelecionada !== null && !isNaN(instneutroPUSelecionada)) {
            el.textContent = parseFloat(instneutroPUSelecionada).toFixed(2) + ' P.U';
        }
    });

    //----------PRRENCHIMENTO GERADOR A DIESEL----------------------------------------







    //PREENCHE POTENCIA EM KVA DO GERADOR NO HTML
    const potenciaAparenteGeradorEls = document.querySelectorAll('.potencia-aparente-gerador');
    potenciaAparenteGeradorEls.forEach(el => {
        if (geradorSalvo.potencia !== undefined && geradorSalvo.potencia !== null && !isNaN(geradorSalvo.potencia)) {
            el.textContent = geradorSalvo.potencia + ' kVA';
        }
    });

    // Preencher fator de potência do gerador
    const fatorPotenciaGeradorEls = document.querySelectorAll('.fator-potencia-gerador');
    fatorPotenciaGeradorEls.forEach(el => {
        if (geradorSalvo.fatorpotencia !== undefined && geradorSalvo.fatorpotencia !== null && !isNaN(geradorSalvo.fatorpotencia)) {
            el.textContent = (geradorSalvo.fatorpotencia * 1).toFixed(0) + ' %';
        }
    });

    // Preencher tolerância do gerador
    const toleranciaGeradorEls = document.querySelectorAll('.tolerancia-gerador');
    if (geradorSalvo.tolerancia !== undefined && geradorSalvo.tolerancia !== null && !isNaN(geradorSalvo.tolerancia)) {
        toleranciaGeradorEls.forEach(el => {
            el.textContent = geradorSalvo.tolerancia + ' %';
        });
    }



    const potenciaReversaGerador = localStorage.getItem('potenciaReversaGerador');
    const potenciaReversaGeradorEls = document.querySelectorAll('.potencia-reversa-gerador');
    potenciaReversaGeradorEls.forEach(el => {
        if (potenciaReversaGerador !== null && !isNaN(potenciaReversaGerador)) {
            el.textContent = potenciaReversaGerador + ' W';
        }
    });

    // Preencher campo potencia-reversa-geradorkw apenas com valor em kW
    const potenciaReversaGeradorKwEls = document.querySelectorAll('.potencia-reversa-geradorkw');
    potenciaReversaGeradorKwEls.forEach(el => {
        if (potenciaReversaGerador !== null && !isNaN(potenciaReversaGerador)) {
            el.textContent = (potenciaReversaGerador / 1000).toFixed(2) + ' kW';
        }
    });

    const denominadorPotReversaEls = document.querySelectorAll('.denominador-potreversa-ajuste-pu');
    denominadorPotReversaEls.forEach(el => {
        if (
            tpPrimariaFF !== null && !isNaN(tpPrimariaFF) &&
            tcEspecificacao !== null && !isNaN(tcEspecificacao)
        ) {
            el.textContent = `${tpPrimariaFF} × √3 × ${tcEspecificacao}`;
        }
    });

    const potenciadieselIPU = localStorage.getItem('potenciadieselPU');
    const pAjustePuEls = document.querySelectorAll('.potreversa-ajuste-pu');
    pAjustePuEls.forEach(el => {
        if (potenciadieselIPU !== null && !isNaN(potenciadieselIPU)) {
            el.textContent = parseFloat(potenciadieselIPU).toFixed(2) + ' P.U';
        }
    });


    // Verifica se o gerador a diesel está habilitado e exibe os campos correspondentes---------------
    const habilitaGeradorEls = document.querySelectorAll('.habilitageradoradiesel');

    if (
        geradorSalvo.potencia !== undefined && geradorSalvo.potencia !== null && !isNaN(geradorSalvo.potencia) && geradorSalvo.potencia !== "" &&
        geradorSalvo.fatorpotencia !== undefined && geradorSalvo.fatorpotencia !== null && !isNaN(geradorSalvo.fatorpotencia) && geradorSalvo.fatorpotencia !== "" &&
        geradorSalvo.tolerancia !== undefined && geradorSalvo.tolerancia !== null && !isNaN(geradorSalvo.tolerancia) && geradorSalvo.tolerancia !== ""
    ) {
        // console.log('sim');
        // Habilitar elementos relacionados ao gerador a diesel
        habilitaGeradorEls.forEach(el => {
            el.style.display = '';
            el.classList.add('tabelaparametrizacaoreles');
            el.classList.add('calculogeradordiesel');
        });
    } else {
        habilitaGeradorEls.forEach(el => {
            el.style.display = 'none';
        });
        // console.log('não');
    }
    // FIM DE PREENCHEMENTO GERADOR A DIESEL----------------------------------------








    //exibir div do class="correnteminima" somente se o valor inomimalminimaTC for Sim
    // const inomimalMinimaTC = localStorage.getItem('inomimalminimaTC');
    // const correnteMinimaEls = document.querySelectorAll('.correnteminima');

    // correnteMinimaEls.forEach(el => {
    //     el.style.display = (inomimalMinimaTC === 'Sim') ? '' : 'none';
    // });

    //LEMBRAR DE INCLUIR LOGICA PARA APARECER E REMOVER OS CALCULOS QUANDO NÃO HOUVER VALOR















    // Recarregar a página após salvar as opções
    //  location.reload();

}

function imprimirPaginaEmPDF() {
    window.print();
}


function atualizarFormula() {
    const campos = ["beta", "imag", "in", "alpha", "k", "dt"];
    const valores = campos.reduce((obj, id) => {
        const element = document.getElementById(id);
        obj[id] = element ? element.textContent : '';
        // console.log(`${id}:`, obj[id]); // Debug
        return obj;
    }, {});

    // console.log('Valores:', valores); // Debug
    const latex = `t = \\left( \\frac{${valores.beta}}{\\left( \\frac{${valores.imag}}{${valores.in}} \\right)^{${valores.alpha}}} - ${valores.k} \\right) \\times ${valores.dt}`;
    const formulaEl = document.getElementById("formula");

    if (formulaEl && typeof MathJax !== 'undefined') {
        formulaEl.innerHTML = `\\(${latex}\\)`;
        MathJax.typesetPromise([formulaEl]).catch(err => console.log('Erro MathJax:', err));
    } else {
        // console.log('MathJax não disponível ou elemento formula não encontrado');
    }
}

function atualizarFormula2() {

}




// Função para carregar script dinamicamente
function carregarScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error('Erro ao carregar script:', src);
    document.head.appendChild(script);
}

function carregarScript2(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error('Erro ao carregar script:', src);
    document.head.appendChild(script);
}



function verificarMathJax() {
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {

        atualizarFormula();
        atualizarFormula2();
    } else {

        setTimeout(verificarMathJax, 500);
    }
}


// ...existing code...

// Função para carregar dados do localStorage e exibir na div tabelareles
function carregarTabelaReles() {

    const tabelaRelesDiv = document.getElementById('tabelareles');

    // Recupera os dados do localStorage
    const dadosArmazenados = localStorage.getItem('Tabelasalva');

    // console.log('Dados encontrados no localStorage:', dadosArmazenados); //Debug adicional

    if (dadosArmazenados) {
        // Define o conteúdo HTML da div com os dados recuperados
        tabelaRelesDiv.innerHTML = dadosArmazenados;
    } else {
        // console.warn('Nenhum dado encontrado no localStorage para Tabelasalva');
        tabelaRelesDiv.innerHTML = '<p>Nenhum dado encontrado.</p>';
    }


}


function adicionarEstilosTabelaParametrizacaoReles() {
    return;
}

function aplicarVisibilidadeMagnetizacaoReal() {
    const tituloMagnetizacaoReal = document.getElementById('titulo-calculomagnetizacaoreal');
    const calculoMagnetizacaoReal = document.getElementById('calculomagnetizacaoreal');
    const magnetizacaoReal = localStorage.getItem('magnetizacaoreal');
    const exibirMagnetizacaoReal = magnetizacaoReal === 'ligado';

    if (tituloMagnetizacaoReal) {
        tituloMagnetizacaoReal.style.display = exibirMagnetizacaoReal ? '' : 'none';
    }

    if (calculoMagnetizacaoReal) {
        calculoMagnetizacaoReal.style.display = exibirMagnetizacaoReal ? '' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    aplicarVisibilidadeMagnetizacaoReal();

    const gallery = document.getElementById("gallery");
    const tituloDiagramaUnifilar = document.getElementById("titulo-diagrama-unifilar");
    const diagramaUnifilar = document.getElementById("diagramaunifilar");

    if (!gallery) return;

    gallery.innerHTML = "";

    // Exibe a imagem salva no localStorage (se existir)
    const imagemSelecionada = localStorage.getItem("imagemSelecionada");
    if (imagemSelecionada) {
        const img = document.createElement("img");
        img.src = imagemSelecionada;
        img.classList.add('estudos-gallery-image');
        gallery.appendChild(img);

        if (tituloDiagramaUnifilar) {
            tituloDiagramaUnifilar.style.display = "";
        }
        if (diagramaUnifilar) {
            diagramaUnifilar.style.display = "";
        }
    } else {
        if (tituloDiagramaUnifilar) {
            tituloDiagramaUnifilar.style.display = "none";
        }
        if (diagramaUnifilar) {
            diagramaUnifilar.style.display = "none";
        }
    }
});

// Limpa a imagemSelecionada e a galeria
// clearButton.addEventListener("click", () => {
//     localStorage.removeItem("imagemSelecionada");
//     gallery.innerHTML = "";
// });



function exibirCorrenteMinimaSeNecessario() {
    // Certifique-se de que o valor está correto e sem espaços extras
    const inomimalMinimaTC = localStorage.getItem('inominalminimaTC');
    const correnteMinimaEls = document.querySelectorAll('.correnteminima');
    // Adicione um log para depuração
    // console.log('inomimalMinimaTC:', inomimalMinimaTC, 'Elementos encontrados:', correnteMinimaEls.length);
    correnteMinimaEls.forEach(el => {
        el.style.display = (inomimalMinimaTC === "Sim") ? '' : 'none';
    });
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