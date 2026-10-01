document.getElementById("bt_enviar").addEventListener("click", () => {
  //escuta o evento de click do botão enviar
  let nome = document.getElementById("nome").value; //.value pega o que o usuário digitou no input
  let quantidade = document.getElementById("quantidade").value;
  let preconormal = document.getElementById("preconormal").value;
  let precopromo = document.getElementById("precopromo").value;
  let horario = document.getElementById("horario").value;

  if (!validar(nome, quantidade, preconormal, precopromo)) {
    return; //se a função validar retornar false, o código para aqui e não adiciona o produto na lista
  }

  let lista = JSON.parse(localStorage.getItem("produtos")) || []; //recupera a lista do localStorage, se não existir cria uma lista vazia

  lista.push({
    //adiciona um novo produto na lista
    nome: nome,
    quantidade: Number(quantidade), //converte a quantidade para número, pois o input retorna uma string'
    preconormal: Number(preconormal),
    precopromo: Number(precopromo),
    horario: horario,
  });
  localStorage.setItem("produtos", JSON.stringify(lista)); //converte objeto em string e salva no localStorage

  limparCampos();

  listar();
});

function listar() {
  let lista = JSON.parse(localStorage.getItem("produtos")) || [];
  document.getElementById("p_produtos").innerHTML = ""; //limpa a lista antes de listar novamente, sem isso, cada vez que listar() rodasse, os produtos apareceriam repetidos.

  let indice = 0; //contador de posição do array

  for (let produto of lista) {
    //laço for of para percorrer a lista de produtos
    document.getElementById("p_produtos").innerHTML += `<li>
            <details> <!-- cria um dropdown automatico -->
                <summary>${produto.nome}</summary>
                <p>Quantidade: ${produto.quantidade} kg</p>
                <p>Preço normal: R$ ${Number(produto.preconormal).toFixed(2)}</p>
                <p>Preço promocional: R$ ${Number(produto.precopromo).toFixed(2)}</p>
                <p>Horário para retirada: ${produto.horario ? new Date(produto.horario).toLocaleString("pt-BR") : "Não informado"}</p> <!-- operador ternário: se tem horário, formata a data; se não, mostra "Não informado" -->
            </details>
            <div class="produto-acoes">
                <button onclick="excluir(${indice})">Excluir</button>
                <button onclick="carregar(${indice})">Carregar</button>
            </div>
        </li>`; //injeta o produto na tela com os detalhes e os botões excluir e carregar usando as variáveis do produto e o índice do array
    indice++; //soma 1 ao índice para o próximo produto
  }
}

function excluir(indice) {
  //recebe a posição do produto no array para excluir
  let lista = JSON.parse(localStorage.getItem("produtos")) || [];
  lista.splice(indice, 1); //remove o produto da lista pelo índice
  localStorage.setItem("produtos", JSON.stringify(lista)); //converte objeto em string e salva no localStorage
  limparCampos(); //limpa os campos do formulário
  document.getElementById("alterar").innerHTML = ""; //remove o botão alterar da tela
  listar(); //chama a função listar para atualizar a lista na tela
}

function carregar(indice) {
  let lista = JSON.parse(localStorage.getItem("produtos")) || [];
  document.getElementById("nome").value = lista[indice].nome; //pega o produto no array e joga os valores salvos nos inputs para alterar
  document.getElementById("quantidade").value = lista[indice].quantidade;
  document.getElementById("preconormal").value = lista[indice].preconormal;
  document.getElementById("precopromo").value = lista[indice].precopromo;
  document.getElementById("horario").value = lista[indice].horario;
  document.getElementById("alterar").innerHTML =
    `<button onclick="alterar(${indice})">Alterar</button>`; //injeta o botão alterar na tela com a função alterar passando o índice do produto
}

function alterar(indice) { //recebe a posição do produto no array para alterar
  let nome = document.getElementById("nome").value;
  let quantidade = document.getElementById("quantidade").value;
  let preconormal = document.getElementById("preconormal").value;
  let precopromo = document.getElementById("precopromo").value;
  let horario = document.getElementById("horario").value;

  if (!validar(nome, quantidade, preconormal, precopromo)) {
    return; //se a função validar retornar false, o código para aqui e não altera o produto na lista
  }

  let lista = JSON.parse(localStorage.getItem("produtos")); //recupera a lista do localStorage
  lista[indice].nome = nome;
  lista[indice].quantidade = Number(quantidade);
  lista[indice].preconormal = Number(preconormal);
  lista[indice].precopromo = Number(precopromo);
  lista[indice].horario = horario;
  localStorage.setItem("produtos", JSON.stringify(lista)); //converte objeto em string e salva no localStorage

  limparCampos(); //limpa os campos do formulário
  document.getElementById("alterar").innerHTML = ""; //remove o botão alterar da tela
  listar(); //chama a função listar para atualizar a lista na tela
}


function limparCampos() {
  document.getElementById("cadprod").reset(); //limpa o formulário
}

function validar(nome, quantidade, preconormal, precopromo) {
  //função para validar os campos do formulário
  if (
    nome.trim() === "" || //trim() remove espaços em branco no início e no final da string
    quantidade === "" || //verifica se o campo está vazio
    preconormal === "" ||
    precopromo === ""
  ) {
    alert("Preencha todos os campos!"); //alerta para o usuário preencher todos os campos
    return false; //retorna false para não enviar o formulário
  }
  if (Number(precopromo) >= Number(preconormal)) {
    alert("O preço promocional precisa ser menor que o preço normal!");
    return false; //retorna false para não enviar o formulário
  }
  if (
    Number(quantidade) <= 0 ||
    Number(preconormal) <= 0 ||
    Number(precopromo) <= 0
  ) {
    alert("Os valores precisam ser maiores que zero!"); //alerta para o usuário preencher um valor positivo
    return false; //retorna false para não enviar o formulário
  }

  return true; //retorna true para enviar o formulário
}

listar(); //mostra os produtos já salvos assim que a página abre
