const CHAVE_STORAGE = "reservas";

let ando = null;

let reservas = carregarReservas();

function gerarCodigo() {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigo = "RES-";

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(
            Math.random() * caracteres.length
        );

        codigo += caracteres[indice];
    }

    const codigoExiste = reservas.some(
        function (reserva) {
            return reserva.codigo === codigo;
        }
    );

    if (codigoExiste) {
        return gerarCodigo();
    }

    return codigo;
}

function criarReserva() {
    const campoCliente =
        document.getElementById("cliente");

    const campoItem =
        document.getElementById("item");

    const cliente =
        campoCliente.value.trim();

    const item =
        campoItem.value;

    if (cliente === "" || item === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (idReservaalterando !== null) {
        const reserva =
            encontrarReserva(idReservaalterando);

        if (!reserva) {
            cancelarEdicao();
            return;
        }

        reserva.cliente = cliente;
        reserva.item = item;

        salvarReservas();
        atualizarTabela();

        mostrarMensagem(
            "Reserva alterada com sucesso!"
        );

        cancelarEdicao();

        return;
    }

    const novaReserva = {
        id: Date.now(),
        codigo: gerarCodigo(),
        cliente: cliente,
        item: item,
        data: new Date().toLocaleString("pt-BR"),
        status: "Pendente"
    };

    reservas.push(novaReserva);

    salvarReservas();
    atualizarTabela();

    campoCliente.value = "";
    campoItem.value = "";

    mostrarMensagem(
        "Reserva criada com sucesso! Código: " +
        novaReserva.codigo
    );
}

function alterarReserva(id) {
    const reserva =
        encontrarReserva(id);

    if (!reserva) {
        return;
    }

    if (reserva.status !== "Pendente") {
        alert(
            "Somente reservas pendentes podem ser alteradas."
        );

        return;
    }

    idReservaalterando = id;

    document.getElementById("cliente").value =
        reserva.cliente;

    document.getElementById("item").value =
        reserva.item;

    document.getElementById(
        "tituloFormulario"
    ).textContent = "alterar Reserva";

    document.getElementById(
        "botaoFormulario"
    ).textContent = "Salvar Alterações";

    document.getElementById(
        "botaoCancelarEdicao"
    ).style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function cancelarEdicao() {
    idReservaalterando = null;

    document.getElementById(
        "cliente"
    ).value = "";

    document.getElementById(
        "item"
    ).value = "";

    document.getElementById(
        "tituloFormulario"
    ).textContent = "Nova Reserva";

    document.getElementById(
        "botaoFormulario"
    ).textContent = "Criar Reserva";

    document.getElementById(
        "botaoCancelarEdicao"
    ).style.display = "none";
}

function atualizarTabela() {
    const lista =
        document.getElementById("listaReservas");

    lista.innerHTML = "";

    if (reservas.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhuma reserva cadastrada.
                </td>
            </tr>
        `;

        return;
    }

    const reservasOrdenadas =
        [...reservas].reverse();

    reservasOrdenadas.forEach(
        function (reserva) {
            const classeStatus =
                obterClasseStatus(
                    reserva.status
                );

            const botoes =
                criarBotoesAcoes(reserva);

            lista.innerHTML += `
                <tr>

                    <td>
                        <span class="codigo">
                            ${escaparHTML(reserva.codigo)}
                        </span>
                    </td>

                    <td>
                        ${escaparHTML(reserva.cliente)}
                    </td>

                    <td>
                        ${escaparHTML(reserva.item)}
                    </td>

                    <td>
                        ${escaparHTML(reserva.data)}
                    </td>

                    <td>
                        <span class="status ${classeStatus}">
                            ${escaparHTML(reserva.status)}
                        </span>
                    </td>

                    <td>
                        <div class="acoes">
                            ${botoes}
                        </div>
                    </td>

                </tr>
            `;
        }
    );
}

function obterClasseStatus(status) {
    switch (status) {
        case "Pendente":
            return "pendente";

        case "Concluído":
            return "concluido";

        case "Cancelado":
            return "cancelado";

        default:
            return "";
    }
}

function criarBotoesAcoes(reserva) {
    if (reserva.status !== "Pendente") {
        return "";
    }

    return `
        <button
            type="button"
            class="botao botao-alterar"
            onclick="alterarReserva(${reserva.id})"
        >
            alterar
        </button>

        <button
            type="button"
            class="botao botao-concluir"
            onclick="concluirReserva(${reserva.id})"
        >
            Validar Código
        </button>

        <button
            type="button"
            class="botao botao-cancelar"
            onclick="cancelarReserva(${reserva.id})"
        >
            Cancelar
        </button>
    `;
}

function concluirReserva(id) {
    const reserva =
        encontrarReserva(id);

    if (!reserva) {
        return;
    }

    const codigoDigitado =
        prompt(
            "Digite o código de resgate para validar:",
            ""
        );

    if (codigoDigitado === null) {
        return;
    }

    const codigo =
        codigoDigitado
            .trim()
            .toUpperCase();

    if (codigo !== reserva.codigo) {
        alert(
            "Código de resgate inválido."
        );

        return;
    }

    reserva.status = "Concluído";

    salvarReservas();
    atualizarTabela();

    mostrarMensagem(
        "Código validado! Pedido concluído."
    );
}

function cancelarReserva(id) {
    const reserva =
        encontrarReserva(id);

    if (!reserva) {
        return;
    }

    const confirmar =
        confirm(
            "Deseja realmente cancelar esta reserva?"
        );

    if (!confirmar) {
        return;
    }

    reserva.status = "Cancelado";

    salvarReservas();
    atualizarTabela();

    mostrarMensagem(
        "Reserva cancelada com sucesso."
    );
}

function encontrarReserva(id) {
    return reservas.find(
        function (reserva) {
            return reserva.id === id;
        }
    );
}

function carregarReservas() {
    try {
        const dados =
            localStorage.getItem(
                CHAVE_STORAGE
            );

        if (!dados) {
            return [];
        }

        const reservasSalvas =
            JSON.parse(dados);

        if (!Array.isArray(reservasSalvas)) {
            return [];
        }

        return reservasSalvas.map(
            function (reserva) {
                return {
                    id: reserva.id,

                    codigo:
                        reserva.codigo ||
                        reserva.cdg ||
                        "RES-" +
                        Math.random()
                            .toString(36)
                            .substring(2, 8)
                            .toUpperCase(),

                    cliente:
                        reserva.cliente ||
                        reserva.client ||
                        "",

                    item:
                        reserva.item ||
                        "",

                    data:
                        reserva.data ||
                        new Date().toLocaleString(
                            "pt-BR"
                        ),

                    status:
                        reserva.status ||
                        "Pendente"
                };
            }
        );

    } catch (erro) {
        console.error(
            "Erro ao carregar reservas:",
            erro
        );

        return [];
    }
}

function salvarReservas() {
    try {
        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(reservas)
        );

    } catch (erro) {
        console.error(
            "Erro ao salvar reservas:",
            erro
        );

        alert(
            "Não foi possível salvar as reservas."
        );
    }
}

function mostrarMensagem(texto) {
    const mensagem =
        document.getElementById("mensagem");

    if (!mensagem) {
        return;
    }

    mensagem.textContent = texto;

    mensagem.style.display = "block";

    setTimeout(
        function () {
            mensagem.style.display = "none";
        },
        4000
    );
}

function escaparHTML(valor) {
    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(valor ?? "");

    return elemento.innerHTML;
}

atualizarTabela();