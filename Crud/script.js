document.getElementById('bt_enviar').addEventListener("click", () => { //escuta o evento de click do botão enviar
    let nome = document.getElementById("nome").value;

    let lista = JSON.parse(localStorage.getItem("categorias")) || []; //recupera a lista do localStorage, se não existir cria uma lista vazia

    lista.push({ //adiciona uma nova categoria na lista
        nome: nome
    });
    localStorage.setItem("categorias", JSON.stringify(lista)); //converte objeto em string e salva no localStorage

    limparCampos();

    listar();
});

function listar(){
    let lista = JSON.parse(localStorage.getItem("categorias")) || [];
    document.getElementById("p_categorias").innerHTML = ""; //limpa a lista antes de listar novamente

    let indice = 0; //contador de posição do array

    for(let categoria of lista){ //laço for of para percorrer a lista de categorias
        document.getElementById("p_categorias").innerHTML += `
        <li>
            <span class="categoria-nome">${categoria.nome}</span>
            <div class="categoria-acoes">
                <button onclick="excluir(${indice})">Excluir</button>
                <button onclick="carregar(${indice})">Carregar</button>
            </div>
        </li>`; //injeta a categoria na tela com os botões excluir e carregar usando o índice do array
        indice++; //soma 1 ao índice para a próxima categoria
    }

}

function excluir(indice){
    let lista = JSON.parse(localStorage.getItem("categorias")) || [];
    lista.splice(indice,1); //remove a categoria da lista pelo índice
    localStorage.setItem("categorias", JSON.stringify(lista)); //converte objeto em string e salva no localStorage
    listar(); //chama a função listar para atualizar a lista na tela
}

function carregar(indice){
    let lista = JSON.parse(localStorage.getItem("categorias")) || [];
    document.getElementById("nome").value = lista[indice].nome; //pega a categoria no array e joga o valor salvo no input para alterar
    document.getElementById("alterar").innerHTML = `<button onclick="alterar(${indice})">Alterar</button>`; //injeta o botão alterar na tela com a função alterar passando o índice da categoria
}

function alterar(indice){
    let lista = JSON.parse(localStorage.getItem("categorias"));
    lista[indice].nome = document.getElementById("nome").value; //pega a categoria no array e altera o valor com o novo valor do input
    localStorage.setItem("categorias", JSON.stringify(lista));
    limparCampos();
    document.getElementById("alterar").innerHTML = ""; //remove o botão alterar depois de usar
    listar(); //chama a função listar para atualizar a lista na tela
}

function limparCampos() {
    document.getElementById("cadcat").reset(); //limpa o formulário
}