document.getElementById('bt_enviar').addEventListener("click", () => { //escuta o evento de click do botão enviar
    let nome = document.getElementById("nome").value;
    let quantidade = document.getElementById("quantidade").value;
    let preconormal = document.getElementById("preconormal").value;
    let precopromo = document.getElementById("precopromo").value;
    let horario = document.getElementById("horario").value;

    let lista = JSON.parse(localStorage.getItem("produtos")) || []; //recupera a lista do localStorage, se não existir cria uma lista vazia

    lista.push({ //adiciona um novo produto na lista
        nome:nome,
        quantidade: quantidade,
        preconormal: preconormal,
        precopromo: precopromo,
        horario: horario
    });
    localStorage.setItem("produtos", JSON.stringify(lista)); //converte objeto em string e salva no localStorage

    limparCampos();

    listar();
});

function listar(){
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    document.getElementById("p_produtos").innerHTML = ""; //limpa a lista antes de listar novamente

    let indice = 0; //contador de posição do array

    for(let produto of lista){ //laço for of para percorrer a lista de produtos
        document.getElementById("p_produtos").innerHTML += `<li>
        ${produto.nome}<button onclick="excluir(${indice})">Excluir</button>
        <button onclick="carregar(${indice})">Carregar</button>`; //injeta o produto na tela com os botões excluir e carregar usando as variáveis do produto e o índice do array
        indice++; //soma 1 ao índice para o próximo produto
    }

}

function excluir(indice){
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.splice(indice,1); //remove o produto da lista pelo índice
    localStorage.setItem("produtos", JSON.stringify(lista)); //converte objeto em string e salva no localStorage
    listar(); //chama a função listar para atualizar a lista na tela
}

function carregar(indice){
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    document.getElementById("nome").value = lista[indice].nome; //pega o produto no array e joga os valores salvos nos inputs para alterar
    document.getElementById("quantidade").value = lista[indice].quantidade;
    document.getElementById("preconormal").value = lista[indice].preconormal;
    document.getElementById("precopromo").value = lista[indice].precopromo;
    document.getElementById("horario").value = lista[indice].horario;
    document.getElementById("alterar").innerHTML = `<button onclick="alterar(${indice})">Alterar</button>`; //injeta o botão alterar na tela com a função alterar passando o índice do produto
}

function alterar(indice){ 
    let lista = JSON.parse(localStorage.getItem("produtos"));
    lista[indice].nome = document.getElementById("nome").value; //pega o produto no array e altera os valores com os novosvalores dos inputs
    lista[indice].quantidade = document.getElementById("quantidade").value;
    lista[indice].preconormal = document.getElementById("preconormal").value;
    lista[indice].precopromo = document.getElementById("precopromo").value;
    lista[indice].horario = document.getElementById("horario").value;
    localStorage.setItem("produtos", JSON.stringify(lista)); 
    listar(); //chama a função listar para atualizar a lista na tela
}

function limparCampos() {
    document.getElementById("cadprod").reset(); //limpa o formulário
}