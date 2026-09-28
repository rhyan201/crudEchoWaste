document.getElementById('bt_enviar').addEventListener("click", () => { //escuta o evento de click do botão enviar
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let tipoconta = document.getElementById("tipoconta").value;

    let lista = JSON.parse(localStorage.getItem("usuarios")) || []; //recupera a lista do localStorage, se não existir cria uma lista vazia

    lista.push({
        nome: nome,
        email: email,
        senha: senha,    
        tipoconta: tipoconta
    });
    localStorage.setItem("usuarios", JSON.stringify(lista)); //converte objeto em string e salva no localStorage
    
    limparCampos()
    listar();
});

function listar(){
    let lista = JSON.parse(localStorage.getItem("usuarios")) || [];
    document.getElementById("p_usuarios").innerHTML = ""; //limpa a lista antes de listar novamente

    let indice = 0; //contador de posição do array

    for(let usuario of lista){ //laço for of para percorrer a lista de produtos
        document.getElementById("p_usuarios").innerHTML += `<li>
        ${usuario.nome}<button onclick="excluir(${indice})">Excluir</button>
        <button onclick="carregar(${indice})">Carregar</button>`; //injeta o produto na tela com os botões excluir e carregar usando as variáveis do produto e o índice do array
        indice++; //soma 1 ao índice para o próximo produto
    }
}
function excluir(indice){
    let lista = JSON.parse(localStorage.getItem("usuarios")) || [];
    lista.splice(indice,1); //remove o produto da lista pelo índice
    localStorage.setItem("usuarios", JSON.stringify(lista)); //converte objeto em string e salva no localStorage
    listar(); //chama a função listar para atualizar a lista na tela
}
function carregar(indice){
    let lista = JSON.parse(localStorage.getItem("usuarios")) || [];
    document.getElementById("nome").value = lista [indice].nome; //pega o produto no array e joga os valores salvos nos inputs para alterar
    document.getElementById("email").value = lista [indice].email;
    document.getElementById("senha").value = lista [indice].senha;
    document.getElementById("tipoconta").value = lista [indice].tipoconta;
    document.getElementById("alterar").innerHTML = `<button onclick="alterar(${indice})">Alterar</button>`; //injeta o botão alterar na tela com a função alterar passando o índice do produto
}
function alterar(indice){
    let lista = JSON.parse(localStorage.getItem("usuarios"));
    lista[indice].nome = document.getElementById("nome").value; //pega o produto no array e altera os valores com os novosvalores dos inputs
    lista[indice].email = document.getElementById("email").value;
    lista[indice].senha = document.getElementById("senha").value;
    lista[indice].tipoconta = document.getElementById("tipoconta").value;
    localStorage.setItem("usuarios", JSON.stringify(lista));
    listar(); //chama a função listar para atualizar a lista na tela
}
function limparCampos(){
    document.getElementById("cad_usuario").reset(); //limpa o formulário
}
listar();