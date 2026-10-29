// Sistema de Controle de Acesso por Categoria de Usuário
// Aplica permissões baseadas na categoria armazenada no localStorage

(function () {
    // Verifica se há usuário logado
    function verificarLogin() {
        const categoria = localStorage.getItem("usuarioCategoria");
        const usuario = localStorage.getItem("usuario");

        // Se não há usuário logado, redireciona para login
        if (!usuario || !categoria) {
            alert("Sessão expirada. Por favor, faça login novamente.");
            window.location.href = "index.html";
            return null;
        }

        return categoria;
    }

    // Define permissões por categoria
    const permissoes = {
        admin: {
            // Admin tem acesso a todos os botões
            permitidos: [
                'botaoconfightml',      // CONFIGURAÇÕES
                'botaoformulariohtml',  // FORMULÁRIO
                'botaodiagramahtml',    // DIAGRAMAS
                'botaoparametrohtml',   // PARÂMETROS
                'botaotrafohtml',       // TRAFOS
                'botaotptchtml',        // TP/TC
                'botaoajustehtml',      // AJUSTES
                'botaotabelarelehtml',  // TABELA
                'botaoestudoshtml',     // ESTUDOS
                'botaoajustesGDhtml',   // AJUSTES GD
                'botaotabelaGDhtml',    // TABELA GD
                'botaoestudosGDhtml',   // ESTUDOS GD
                'botaoanalisehtml',     // ANÁLISE
                'botaosairhtml'         // HOME
            ]
        },
        tecnico: {
            // Técnico tem acesso a todos os botões EXCETO CONFIGURAÇÕES
            permitidos: [
                'botaoformulariohtml',  // FORMULÁRIO
                'botaodiagramahtml',    // DIAGRAMAS
                'botaoparametrohtml',   // PARÂMETROS
                'botaotrafohtml',       // TRAFOS
                'botaotptchtml',        // TP/TC
                'botaoajustehtml',      // AJUSTES
                'botaotabelarelehtml',  // TABELA
                'botaoestudoshtml',     // ESTUDOS
                'botaoajustesGDhtml',   // AJUSTES GD
                'botaotabelaGDhtml',    // TABELA GD
                'botaoestudosGDhtml',   // ESTUDOS GD
                'botaoanalisehtml',     // ANÁLISE
                'botaosairhtml'         // HOME
            ]
        },
        usuario: {
            // Usuário tem acesso a: DIAGRAMAS, PARÂMETROS, TRAFOS, TP/TC, AJUSTES, TABELA, ESTUDOS
            permitidos: [
                'botaoformulariohtml',  // FORMULÁRIO
                'botaodiagramahtml',    // DIAGRAMAS
                'botaoparametrohtml',   // PARÂMETROS
                'botaotrafohtml',       // TRAFOS
                'botaotptchtml',        // TP/TC
                'botaoajustehtml',      // AJUSTES
                'botaotabelarelehtml',  // TABELA
                'botaoestudoshtml',     // ESTUDOS
                'botaosairhtml'         // HOME
            ]
        }
    };

    // Aplica as permissões aos botões
    function aplicarPermissoes() {
        const categoria = verificarLogin();
        if (!categoria) return;

        // Normaliza a categoria para lowercase
        const categoriaNormalizada = categoria.toLowerCase();

        console.log('=== CONTROLE DE ACESSO ===');
        console.log('Categoria do usuário:', categoriaNormalizada);

        // Adiciona classe de categoria ao body para controle via CSS
        document.body.setAttribute('data-user-role', categoriaNormalizada);

        // Mantém a navegação da página de formulário sujeita às permissões da categoria.
        const botoesPermitidos = permissoes[categoriaNormalizada]?.permitidos || permissoes.usuario.permitidos;

        console.log('Botões permitidos:', botoesPermitidos);

        // Lista de todos os botões possíveis
        const todosOsBotoes = [
            'botaoconfightml',
            'botaoformulariohtml',
            'botaodiagramahtml',
            'botaoparametrohtml',
            'botaotrafohtml',
            'botaotptchtml',
            'botaoajustehtml',
            'botaotabelarelehtml',
            'botaoestudoshtml',
            'botaoajustesGDhtml',
            'botaotabelaGDhtml',
            'botaoestudosGDhtml',
            'botaoanalisehtml',
            'botaosairhtml'
        ];

        let botoesEncontrados = 0;
        let botoesExibidos = 0;
        let botoesOcultados = 0;

        // Mostra/oculta botões baseado nas permissões
        todosOsBotoes.forEach(botaoId => {
            const botao = document.getElementById(botaoId);
            if (botao) {
                botoesEncontrados++;
                if (botoesPermitidos.includes(botaoId)) {
                    // Adiciona classe para mostrar o botão
                    botao.classList.add('btn-permitido');
                    botao.classList.remove('btn-bloqueado');
                    botoesExibidos++;
                    console.log('✓ Exibindo:', botaoId);
                } else {
                    // Adiciona classe para ocultar o botão
                    botao.classList.add('btn-bloqueado');
                    botao.classList.remove('btn-permitido');
                    botoesOcultados++;
                    console.log('✗ Ocultando:', botaoId);
                }
            } else {
                console.log('⚠ Botão não encontrado:', botaoId);
            }
        });

        console.log(`Resumo: ${botoesEncontrados} botões encontrados | ${botoesExibidos} exibidos | ${botoesOcultados} ocultados`);

        // Adiciona classe loaded ao h1 para fade-in suave
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.classList.add('loaded');
        }

        // Remove a classe de carregamento do body se existir
        document.body.classList.remove('loading');

        // Adiciona informação do usuário logado (opcional)
        console.log(`Usuário logado: ${localStorage.getItem("usuario")} | Categoria: ${categoria}`);
    }

    function configurarNavegacaoHeader() {
        document.addEventListener('click', function (event) {
            const botao = event.target.closest('button[data-nav-target]');
            if (!botao) return;

            const destino = botao.getAttribute('data-nav-target');
            if (destino) {
                window.location.href = destino;
            }
        });
    }

    function configurarBotaoFormulario() {
        const botaoConfiguracoes = document.getElementById('botaoconfightml');
        const header = botaoConfiguracoes?.parentElement;
        const botaoFormularioExistente = document.getElementById('botaoformulariohtml');
        if (botaoFormularioExistente) {
            if (window.location.pathname.toLowerCase().endsWith('/formulario.html')) {
                botaoFormularioExistente.classList.add('nav-active');
            }
            return;
        }

        if (!botaoConfiguracoes || !header) {
            return;
        }

        const botaoFormulario = document.createElement('button');
        botaoFormulario.id = 'botaoformulariohtml';
        botaoFormulario.className = 'dark-mode-toggle';
        botaoFormulario.type = 'button';
        botaoFormulario.textContent = 'FORMULÁRIO';
        botaoFormulario.dataset.navTarget = 'formulario.html';
        if (window.location.pathname.toLowerCase().endsWith('/formulario.html')) {
            botaoFormulario.classList.add('nav-active');
        }
        botaoConfiguracoes.insertAdjacentElement('afterend', botaoFormulario);
    }

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            configurarBotaoFormulario();
            configurarNavegacaoHeader();
            aplicarPermissoes();
        });
    } else {
        configurarBotaoFormulario();
        configurarNavegacaoHeader();
        aplicarPermissoes();
    }
})();



// INICIO Controle de acesso para ocultar dimensionamento por tensão de saturação para a categoria 'usuario'

function ocultarSaturacaoUsuario() {
    const categoria = (localStorage.getItem('usuarioCategoria') || '').toLowerCase();
    if (categoria === 'usuario') {
        // TP-TC.html: Oculta o título e tabela de saturação
        const tituloSaturacao = Array.from(document.getElementsByClassName('tp-tc-caption-main'))
            .find(div => div.textContent && div.textContent.includes('DIMENSIONAMENTO TC (CRITÉRIO SATURAÇÃO POR TENSÃO'));
        if (tituloSaturacao) {
            tituloSaturacao.style.display = 'none';
        }
        const tabelas = document.getElementsByClassName('tabela-container');
        for (let i = 0; i < tabelas.length; i++) {
            if (tabelas[i].previousElementSibling === tituloSaturacao) {
                tabelas[i].style.display = 'none';
                break;
            }
        }

        // estudos.html: Oculta o bloco de cálculo de saturação do TC
        const blocoSaturacaoEstudos = document.getElementById('bloco-calculo-saturacao-tc') ||
            document.getElementById('criteriocalculotcimpedancia')?.closest('.estudos-secao-bloco');
        if (blocoSaturacaoEstudos) {
            blocoSaturacaoEstudos.style.display = 'none';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ocultarSaturacaoUsuario);
} else {
    ocultarSaturacaoUsuario();
}

// FIM Controle de acesso para ocultar dimensionamento por tensão de saturação para a categoria 'usuario'