let rsvs = JSON.parse(
    localStorage.getItem("reservas")
) || [];


function gerarCdg() {

    const crts =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let cdg = "RES-";

    for (let i = 0; i < 6; i++) {

        const numero = Math.floor(
            Math.random() * crts.length
        );

        cdg += crts[numero];
    }

    return cdg;
}


function criarReserva() {

    const client =
        document.getElementById("cliente").value.trim();

    const item =
        document.getElementById("item").value;

    if (client === "" || item === "") {

        alert("Preencha todos os campos.");

        return;
    }


    const novaReserva = {

        id: Date.now(),

        cdg: gerarCdg(),

        client: client,

        item: item,

        data: new Date().toLocaleString("pt-BR"),

        status: "Pendente"
    };


    rsvs.push(novaReserva);

    salvarRsrvs();

    attTabela();


    document.getElementById("cliente").value = "";

    document.getElementById("item").value = "";


    mostrarMSG(
        "Reserva criada com sucesso! Código: " +
        novaReserva.cdg
    );
}


function attTabela() {

    const lista =
        document.getElementById("listaReservas");

    lista.innerHTML = "";


    if (rsvs.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhuma reserva cadastrada.
                </td>
            </tr>
        `;

        return;
    }


    rsvs.forEach(function (rsv) {

        let sts = "";


        if (rsv.status === "Pendente") {

            sts = "pendente";

        } else if (rsv.status === "Concluído") {

            sts = "concluido";

        } else {

            sts = "cancelado";
        }


        let btn = "";


        if (rsv.status === "Pendente") {

            btn = `

                <button
                    class="botao botao-concluir"
                    onclick="concluirReserva(${rsv.id})"
                >
                    Validar Código
                </button>

                <button
                    class="botao botao-cancelar"
                    onclick="cancelarReserva(${rsv.id})"
                >
                    Cancelar
                </button>

            `;
        }


        lista.innerHTML += `

            <tr>

                <td>
                    <span class="codigo">
                        ${rsv.codigo}
                    </span>
                </td>

                <td>
                    ${rsv.cliente}
                </td>

                <td>
                    ${rsv.item}
                </td>

                <td>
                    ${rsv.data}
                </td>

                <td>

                    <span class="status ${sts}">
                        ${rsv.status}
                    </span>

                </td>

                <td>

                    <div class="acoes">
                        ${btn}
                    </div>

                </td>

            </tr>
        `;
    });
}


function concluirReserva(id) {

    const rsrv = rsvs.find(
        function (item) {
            return item.id === id;
        }
    );


    if (!rsrv) {
        return;
    }


    const codigoDigitado = prompt(
        "Digite o código de resgate para validar:",
        ""
    );


    if (codigoDigitado === null) {
        return;
    }


    if (
        codigoDigitado.trim().toUpperCase()
        !== rsrv.codigo
    ) {

        alert("Código de resgate inválido.");

        return;
    }


    rsrv.status = "Concluído";

    salvarRsrvs();

    attTabela();


    mostrarMSG(
        "Código validado! Pedido concluído."
    );
}


function cancelarRsrv(id) {

    const rsrv = rsvs.find(
        function (item) {
            return item.id === id;
        }
    );


    if (!rsrv) {
        return;
    }


    const confirmar = confirm(
        "Deseja realmente cancelar esta reserva?"
    );


    if (!confirmar) {
        return;
    }


    rsrv.status = "Cancelado";

    salvarRsrvs();

    attTabela();


    mostrarMSG(
        "Reserva cancelada com sucesso."
    );
}


function salvarRsrvs() {

    localStorage.setItem(
        "reservas",
        JSON.stringify(rsvs)
    );
}


function mostrarMSG(texto) {

    const mensagem =
        document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.style.display = "block";


    setTimeout(function () {

        mensagem.style.display = "none";

    }, 4000);
}


attTabela();

