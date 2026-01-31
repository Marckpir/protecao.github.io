// Sistema de Controle de Acesso por Categoria de Usuário
// Aplica permissões baseadas na categoria armazenada no localStorage

(function() {
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
        
        // Se a categoria não existe nas permissões, trata como usuário comum
        const botoesPermitidos = permissoes[categoriaNormalizada]?.permitidos || permissoes.usuario.permitidos;
        
        console.log('Botões permitidos:', botoesPermitidos);
        
        // Lista de todos os botões possíveis
        const todosOsBotoes = [
            'botaoconfightml',
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

    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aplicarPermissoes);
    } else {
        aplicarPermissoes();
    }
})();
