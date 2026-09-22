let currentRating = 0;

document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector(".btn-publish");
  const campoIdPedido = document.getElementById("idPedido");
  const stars = document.querySelectorAll(".star");

  campoIdPedido.value = gerarIdPedido();
  campoIdPedido.readOnly = true;

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      currentRating = Number(star.dataset.value);
      updateStars(stars);
    });

    star.addEventListener("mouseover", () => {
      highlightStars(stars, index + 1);
    });

    star.addEventListener("mouseout", () => {
      updateStars(stars);
    });
  });

  botao.addEventListener("click", (event) => {
    event.preventDefault();

    const avaliacao = {
      idPedido: campoIdPedido.value,
      nome: document.getElementById("nome").value.trim(),
      comentario: document.getElementById("comentario").value.trim(),
      estrelas: currentRating
    };

    if (!avaliacao.nome || !avaliacao.comentario || !avaliacao.estrelas) {
      alert("Preencha todos os campos");
      return;
    }

    const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

    lista.push(avaliacao);

    localStorage.setItem("avaliacoes", JSON.stringify(lista));

    listar();
    limparFormulario();
  });

  listar();
});

function listar() {
  const tbody = document.getElementById("bodyTabela");
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

  tbody.innerHTML = "";

  lista.forEach((item, indice) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.idPedido}</td>
        <td>${item.nome}</td>
        <td>${"★".repeat(item.estrelas)}</td>
        <td>${item.comentario}</td>
        <td>
          <button type="button" onclick="excluir(${indice})">
            Excluir
          </button>
          <button type="button" onclick="carregar(${indice})">
            Carregar
          </button>
        </td>
      </tr>
    `;
  });
}

function carregar(indice) {
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
  const avaliacao = lista[indice];

  document.getElementById("idPedido").value = avaliacao.idPedido;
  document.getElementById("nome").value = avaliacao.nome;
  document.getElementById("comentario").value = avaliacao.comentario;

  currentRating = Number(avaliacao.estrelas);
  updateStars(document.querySelectorAll(".star"));

  document.getElementById("btnSalvar").hidden = false;
  document.getElementById("btnSalvar").onclick = () => alterar(indice);
}

function alterar(indice) {
  let lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];

  lista[indice].estrelas = currentRating;
  lista[indice].nome = document.getElementById("nome").value;
  lista[indice].comentario = document.getElementById("comentario").value;
  lista[indice].idPedido = document.getElementById("idPedido").value;

  localStorage.setItem("avaliacoes", JSON.stringify(lista));

  document.getElementById("btnSalvar").hidden = true;

  listar();
  limparFormulario();
}

function excluir(indice) {
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

  lista.splice(indice, 1);

  localStorage.setItem("avaliacoes", JSON.stringify(lista));
  listar();
}

function limparFormulario() {
  document.getElementById("idPedido").value = gerarIdPedido();
  document.getElementById("nome").value = "";
  document.getElementById("comentario").value = "";

  currentRating = 0;
  updateStars(document.querySelectorAll(".star"));
}

function highlightStars(stars, count) {
  stars.forEach((star, index) => {
    star.textContent = index < count ? "★" : "☆";
    star.style.color = index < count ? "#f39c12" : "#ccc";
  });
}

function updateStars(stars) {
  highlightStars(stars, currentRating);
}

function gerarIdPedido() {
  return Math.floor(Math.random() * 1000000000);
}