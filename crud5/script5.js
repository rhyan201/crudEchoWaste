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

    const idPedido = campoIdPedido.value;
    const nome = document.getElementById("nome").value.trim();
    const comentario = document.getElementById("comentario").value.trim();
    const estrelas = Number(currentRating);

    if (!nome || !comentario || !estrelas || !idPedido) {
      alert("Preencha todos os campos");
      return;
    }

    const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

    const avaliacao = {
      idPedido,
      nome,
      comentario,
      estrelas
    };

    if (indiceEmEdicao !== null) {
      lista[indiceEmEdicao] = avaliacao;
      indiceEmEdicao = null;
    } else {
      lista.push(avaliacao);
    }

    localStorage.setItem("avaliacoes", JSON.stringify(lista));

    listar();
    limparFormulario();
    campoIdPedido.value = gerarIdPedido();
    updateStars(stars);
  });

  listar();
});

function listar() {
  const tbody = document.getElementById("bodyTabela");
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

  tbody.innerHTML = "";

  lista.forEach((item, indice) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
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
    `;

    tbody.appendChild(tr);
  });
}

function excluir(indice) {
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

  lista.splice(indice, 1);

  localStorage.setItem("avaliacoes", JSON.stringify(lista));
  listar();
}

function carregar(indice) {
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
  const avaliacao = lista[indice];

  document.getElementById("idPedido").value = avaliacao.idPedido;
  document.getElementById("nome").value = avaliacao.nome;
  document.getElementById("comentario").value = avaliacao.comentario;

  currentRating = Number(avaliacao.estrelas);
  indiceEmEdicao = indice;

  updateStars(document.querySelectorAll(".star"));
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("comentario").value = "";

  currentRating = 0;
  document.getElementById("idPedido").value = gerarIdPedido();

  const stars = document.querySelectorAll(".star");
  updateStars(stars);
}

function highlightStars(stars, count) {
  stars.forEach((star, index) => {
    const preenchida = index < Number(count);

    star.textContent = preenchida ? "★" : "☆";
    star.style.color = preenchida ? "#f39c12" : "#ccc";
  });
}

function updateStars(stars) {
  highlightStars(stars, currentRating);
}

function gerarIdPedido() {
  return Math.floor(Math.random() * 1000000000);
}