document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-publish").addEventListener("click", () => {
        var nome = document.getElementById("avaliacaoNome").value;
        var estrelas = document.getElementById("avaliacaoEstrelas").value;
        var comentario = document.getElementById("avalicaoComentario").value;

        if (nome === "" || estrelas === "" || comentario === "") {
            alert("Preencha todos os campos");
        }
    });
    

});

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
      s.innerHTML = '&#9733;'; // Estrela preenchida
      s.style.color = '#f39c12';
    } else {
      s.innerHTML = '&#9734;'; // Estrela vazia
      s.style.color = '#ccc';
    }
  });
}

function updateStars() {
  highlightStars(currentRating);
}
