document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector(".btn-publish");

  botao.addEventListener("click", (event) => {
    event.preventDefault();

    let idPedido = document.getElementById("idPedido").value;
    let nome = document.getElementById("nome").value;
    let comentario = document.getElementById("comentario").value;
    let estrelas = Number(currentRating);

    if (!nome || !comentario || !estrelas || !idPedido) {
      alert("Preencha todos os campos");
      return;
    }

    let lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

    lista.push({
      idPedido: idPedido,
      nome: nome,
      comentario: comentario,
      estrelas: estrelas
    });

    localStorage.setItem("avaliacoes", JSON.stringify(lista));
    listar();
    document.getElementById("idPedido").value= ""; 
    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";
    currentRating = 0;
    updateStars();

  });

  listar();
});

function listar() {
  const tbody = document.querySelector("tbody");
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");

  tbody.innerHTML = "";

  lista.forEach((item) => {
    const tr = document.createElement("tr");

    const tdIdPedido = document.createElement("td");
    tdIdPedido.textContent = item.idPedido;

    const tdNome = document.createElement("td");
    tdNome.textContent = item.nome;

    const tdEstrelas = document.createElement("td");
    tdEstrelas.textContent = item.estrelas;

    const tdComentario = document.createElement("td");
    tdComentario.textContent = item.comentario;

    tr.appendChild(tdIdPedido);
    tr.appendChild(tdNome);
    tr.appendChild(tdEstrelas);
    tr.appendChild(tdComentario);
    tbody.appendChild(tr);
  });
}


  /* Sistema de estrelas */
  const stars = document.querySelectorAll('.star');
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      currentRating = star.getAttribute('data-value');
      updateStars();
    });
    
    star.addEventListener('mouseover', () => {
      highlightStars(index + 1);
    });
    
    star.addEventListener('mouseout', () => {
      updateStars();
    });
  });

  function highlightStars(count) {
    stars.forEach((s, i) => {
      if (i < count) {
        s.innerHTML = '&#9733;'; 
        s.style.color = '#f39c12';
      } else {
        s.innerHTML = '&#9734;';
        s.style.color = '#ccc';
      }
    });
  }

  function updateStars() {
    highlightStars(currentRating);
  }
 /* Função para adicionar um número aleatório para ID de pedido. */
  function gerarIdPedido() {
  return Math.floor(Math.random() * 1000000000);
}
