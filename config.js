window.addEventListener("load", async function () {
    const botaoConfig = document.getElementById("botaoconfightml");
    if (botaoConfig) {
        botaoConfig.classList.add("nav-active");
    }

    const headerButtons = document.querySelector("h1");
    if (headerButtons) {
        headerButtons.classList.add("loaded");
        headerButtons.addEventListener("click", function (event) {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            const button = target.closest("button[data-nav-target]");
            if (!(button instanceof HTMLButtonElement)) return;

            const destination = button.dataset.navTarget;
            if (!destination) return;
            window.location.href = destination;
        });
    }

    const usuarioLogado = localStorage.getItem("usuario");
    if (!usuarioLogado) {
        window.location.href = "index.html";
        return;
    }

    const statusMessage = document.getElementById("statusMessage");
    if (typeof supabase === "undefined" || typeof dcodeIO === "undefined") {
        showMessage("❌ Erro: Bibliotecas não carregadas", "error");
        return;
    }

    const supabaseUrl = "https://nelzhukmxrgdoarsxcek.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lbHpodWtteHJnZG9hcnN4Y2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMDIxNzUsImV4cCI6MjA3MTU3ODE3NX0.KHvfJHVimKwiraEzbyZWyLnTO5P5VEvM86GlyE7y09k";
    const { createClient } = supabase;
    const sb = createClient(supabaseUrl, supabaseKey);
    const bcrypt = dcodeIO.bcrypt;

    const form = document.getElementById("userForm");
    const loginForm = document.getElementById("loginForm");
    const tableBody = document.querySelector("#userTable tbody");
    const logTableBody = document.querySelector("#logTable tbody");
    const userCount = document.getElementById("userCount");
    const logCount = document.getElementById("logCount");
    const logsSection = document.getElementById("logsSection");
    const toggleLogsBtn = document.getElementById("toggleLogsBtn");

    function showMessage(message, type) {
        if (!statusMessage) return;
        const messageType = type || "success";
        statusMessage.textContent = message;
        statusMessage.classList.remove("is-hidden", "status-success", "status-error");
        statusMessage.classList.add(messageType === "success" ? "status-success" : "status-error");
        setTimeout(function () {
            statusMessage.classList.add("is-hidden");
        }, 5000);
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function emailExiste(email) {
        const result = await sb
            .from("users_login")
            .select("email")
            .eq("email", email)
            .maybeSingle();

        if (result.error) {
            throw result.error;
        }
        return !!result.data;
    }

    function formatarData(dataISO) {
        if (!dataISO) return "N/A";
        const data = new Date(dataISO);
        if (Number.isNaN(data.getTime())) return dataISO;
        return new Intl.DateTimeFormat("pt-BR", {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(data);
    }

    function clearChildren(element) {
        if (!element) return;
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function createCell(text, textAlign) {
        const cell = document.createElement("td");
        cell.className = "table-cell" + (textAlign === "center" ? " table-cell-center" : "");
        cell.textContent = text;
        return cell;
    }

    function createCategoriaBadge(categoria) {
        const badge = document.createElement("span");
        badge.className = "user-badge";
        if (categoria === "admin") {
            badge.classList.add("badge-admin");
        } else if (categoria === "tecnico") {
            badge.classList.add("badge-tecnico");
        } else {
            badge.classList.add("badge-usuario");
        }
        badge.textContent = String(categoria || "usuario").toUpperCase();
        return badge;
    }

    function renderEmptyRow(targetBody, colspan, message, color) {
        clearChildren(targetBody);
        if (!targetBody) return;
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.className = "empty-row-cell";
        cell.colSpan = colspan;
        if (color) {
            cell.classList.add(color === "#666" ? "text-muted" : "text-error");
        }
        cell.textContent = message;
        row.appendChild(cell);
        targetBody.appendChild(row);
    }

    async function loadUsers() {
        try {
            const result = await sb
                .from("users_login")
                .select("id, email, categoria, created_at")
                .order("created_at", { ascending: false });

            if (result.error) {
                throw result.error;
            }

            const users = result.data || [];
            if (!users.length) {
                renderEmptyRow(tableBody, 4, "Nenhum usuário cadastrado");
                if (userCount) userCount.textContent = "Total: 0 usuários";
                return;
            }

            clearChildren(tableBody);
            if (userCount) {
                userCount.textContent = "Total: " + users.length + " usuário(s) cadastrado(s)";
            }

            users.forEach(function (user) {
                const row = document.createElement("tr");
                row.className = "table-row-white";

                row.appendChild(createCell(user.email || ""));

                const categoriaCell = createCell("");
                categoriaCell.appendChild(createCategoriaBadge(user.categoria));
                row.appendChild(categoriaCell);

                row.appendChild(createCell(formatarData(user.created_at)));

                const actionCell = createCell("", "center");

                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn-edit-user action-btn action-btn-edit";
                editButton.dataset.userId = user.id;
                editButton.dataset.userEmail = user.email;
                editButton.dataset.userCategoria = user.categoria;
                editButton.textContent = "✏️ Editar";

                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn-delete-user action-btn action-btn-delete";
                deleteButton.dataset.userId = user.id;
                deleteButton.dataset.userEmail = user.email;
                deleteButton.textContent = "🗑️ Excluir";

                actionCell.appendChild(editButton);
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);

                if (tableBody) {
                    tableBody.appendChild(row);
                }
            });
        } catch (error) {
            showMessage("Erro ao carregar usuários: " + error.message, "error");
        }
    }

    async function loadLoginLogs() {
        try {
            const result = await sb
                .from("login_logs")
                .select("email, categoria, login_timestamp")
                .order("login_timestamp", { ascending: false })
                .limit(100);

            if (result.error) {
                throw result.error;
            }

            const logs = result.data || [];
            if (!logs.length) {
                renderEmptyRow(logTableBody, 3, "Nenhum log de acesso registrado", "#666");
                if (logCount) logCount.textContent = "Total: 0 acessos registrados";
                return;
            }

            clearChildren(logTableBody);
            if (logCount) {
                logCount.textContent = "Total: " + logs.length + " acesso(s) registrado(s) (últimos 100)";
            }

            logs.forEach(function (log, index) {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "table-row-alt" : "table-row-white";

                row.appendChild(createCell(log.email || ""));

                const categoriaCell = createCell("");
                categoriaCell.appendChild(createCategoriaBadge(log.categoria));
                row.appendChild(categoriaCell);

                row.appendChild(createCell(formatarData(log.login_timestamp)));

                if (logTableBody) {
                    logTableBody.appendChild(row);
                }
            });
        } catch (error) {
            let errorMsg = error.message;
            if (error.message && (error.message.includes("relation") || error.message.includes("does not exist"))) {
                errorMsg = "Tabela \"login_logs\" não encontrada. Execute o SQL no Supabase primeiro!";
            }

            clearChildren(logTableBody);
            if (logTableBody) {
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.className = "empty-row-cell text-error";
                cell.colSpan = 3;
                cell.textContent = "❌ Erro ao carregar logs: " + errorMsg;

                const detail = document.createElement("div");
                detail.className = "error-detail";
                detail.textContent = "Verifique o console (F12) para mais detalhes";

                cell.appendChild(detail);
                row.appendChild(cell);
                logTableBody.appendChild(row);
            }

            if (logCount) {
                logCount.textContent = "Erro ao carregar logs";
            }
        }
    }

    async function editUser(id, email, categoriaAtual) {
        const novaCategoria = prompt("Editar: " + email + "\nNova categoria (admin/tecnico/usuario):", categoriaAtual);
        if (!novaCategoria) return;

        const cat = novaCategoria.toLowerCase().trim();
        if (!["admin", "tecnico", "usuario"].includes(cat)) {
            showMessage("Categoria inválida!", "error");
            return;
        }

        const alterarSenha = confirm("Alterar senha também?");
        const updateData = { categoria: cat };

        if (alterarSenha) {
            const novaSenha = prompt("Nova senha (mínimo 6 caracteres):");
            if (!novaSenha || novaSenha.length < 6) {
                showMessage("Senha inválida!", "error");
                return;
            }
            updateData.senha = bcrypt.hashSync(novaSenha, 10);
        }

        try {
            const result = await sb.from("users_login").update(updateData).eq("id", id);
            if (result.error) {
                throw result.error;
            }
            showMessage("✅ Usuário atualizado!", "success");
            await loadUsers();
        } catch (error) {
            showMessage("❌ Erro ao editar: " + error.message, "error");
        }
    }

    async function deleteUser(id, email) {
        if (!confirm("⚠️ Excluir " + email + "?\nEsta ação não pode ser desfeita!")) {
            return;
        }

        try {
            const result = await sb.from("users_login").delete().eq("id", id);
            if (result.error) {
                throw result.error;
            }
            showMessage("✅ Usuário " + email + " excluído!", "success");
            await loadUsers();
        } catch (error) {
            showMessage("❌ Erro ao excluir: " + error.message, "error");
        }
    }

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const emailInput = document.getElementById("email");
            const senhaInput = document.getElementById("senha");
            const categoriaInput = document.getElementById("categoria");

            const email = String(emailInput && emailInput.value ? emailInput.value : "").trim().toLowerCase();
            const senha = String(senhaInput && senhaInput.value ? senhaInput.value : "");
            const categoria = String(categoriaInput && categoriaInput.value ? categoriaInput.value : "");

            if (!validarEmail(email)) {
                showMessage("Email inválido!", "error");
                return;
            }

            if (senha.length < 6) {
                showMessage("A senha deve ter no mínimo 6 caracteres!", "error");
                return;
            }

            if (!categoria) {
                showMessage("Selecione uma categoria!", "error");
                return;
            }

            try {
                if (await emailExiste(email)) {
                    showMessage("Este email já está cadastrado!", "error");
                    return;
                }

                const hash = bcrypt.hashSync(senha, 10);
                const result = await sb.from("users_login").insert([{ email: email, categoria: categoria, senha: hash }]);
                if (result.error) {
                    throw result.error;
                }

                showMessage("✅ Usuário " + email + " cadastrado com sucesso!", "success");
                await loadUsers();
                form.reset();
            } catch (error) {
                showMessage("❌ Erro ao cadastrar: " + error.message, "error");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const loginEmailInput = document.getElementById("loginEmail");
            const loginSenhaInput = document.getElementById("loginSenha");
            const email = String(loginEmailInput && loginEmailInput.value ? loginEmailInput.value : "").trim().toLowerCase();
            const senha = String(loginSenhaInput && loginSenhaInput.value ? loginSenhaInput.value : "");

            if (!validarEmail(email)) {
                showMessage("Email inválido!", "error");
                return;
            }

            try {
                const result = await sb
                    .from("users_login")
                    .select("id, email, senha, categoria, created_at")
                    .eq("email", email)
                    .single();

                if (result.error || !result.data) {
                    showMessage("❌ Usuário não encontrado!", "error");
                    return;
                }

                const user = result.data;
                const senhaCorreta = bcrypt.compareSync(senha, user.senha);

                if (!senhaCorreta) {
                    showMessage("❌ Senha incorreta!", "error");
                    return;
                }

                const logResult = await sb.from("login_logs").insert([
                    {
                        email: user.email,
                        categoria: user.categoria,
                        login_timestamp: new Date().toISOString()
                    }
                ]);

                if (logResult.error) {
                    showMessage("⚠️ Login válido mas erro ao registrar log: " + logResult.error.message, "error");
                } else {
                    showMessage(
                        "✅ Login válido!\n\nEmail: " + user.email + "\nCategoria: " + user.categoria + "\nCadastrado em: " + formatarData(user.created_at),
                        "success"
                    );
                }

                loginForm.reset();
            } catch (error) {
                showMessage("❌ Erro ao validar login: " + error.message, "error");
            }
        });
    }

    if (tableBody) {
        tableBody.addEventListener("click", function (event) {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;

            if (target.classList.contains("btn-edit-user")) {
                const id = target.dataset.userId || "";
                const email = target.dataset.userEmail || "";
                const categoria = target.dataset.userCategoria || "usuario";
                if (id) {
                    editUser(id, email, categoria);
                }
                return;
            }

            if (target.classList.contains("btn-delete-user")) {
                const id = target.dataset.userId || "";
                const email = target.dataset.userEmail || "";
                if (id) {
                    deleteUser(id, email);
                }
            }
        });
    }

    if (toggleLogsBtn && logsSection) {
        toggleLogsBtn.addEventListener("click", async function () {
            if (logsSection.classList.contains("is-hidden")) {
                logsSection.classList.remove("is-hidden");
                toggleLogsBtn.textContent = "📊 Ocultar Logs de Acesso";
                toggleLogsBtn.classList.remove("btn-logs-show");
                toggleLogsBtn.classList.add("btn-logs-hide");
                await loadLoginLogs();
            } else {
                logsSection.classList.add("is-hidden");
                toggleLogsBtn.textContent = "📊 Exibir Logs de Acesso";
                toggleLogsBtn.classList.remove("btn-logs-hide");
                toggleLogsBtn.classList.add("btn-logs-show");
            }
        });
    }

    await loadUsers();

    function gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos) {
        let d = "";
        let primeiro = true;
        for (let i = 0; i <= pontos; i += 1) {
            const corrente = iMin + ((iMax - iMin) * (i / pontos));
            const denominador = (Math.pow(corrente / ip, alfa) - k);
            if (denominador <= 0) continue;
            let tempo = dial * (beta / denominador);
            if (tempo > 1000) tempo = 1000;
            const svgX = 50 + ((corrente - iMin) * 500 / (iMax - iMin));
            const svgY = 350 - (tempo * 300 / 1000);
            if (primeiro) {
                d += "M" + svgX + "," + svgY;
                primeiro = false;
            } else {
                d += " L" + svgX + "," + svgY;
            }
        }
        return d;
    }

    const dial = 90000;
    const beta = 300;
    const alfa = 2;
    const k = 1;
    const ip = 0.5;
    const iMin = ip * 2.01;
    const iMax = 300;
    const pontos = 1000;
    const dInverso = gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos);

    const svg = document.querySelector("svg");
    if (svg) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "curva-inversa");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#ff0080");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("stroke-dasharray", "1000");
        path.setAttribute("stroke-dashoffset", "1000");
        path.setAttribute("d", dInverso);
        svg.appendChild(path);
    }
});