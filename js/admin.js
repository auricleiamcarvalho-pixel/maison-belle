const formulario = document.getElementById("formProduto");


// pega produtos salvos ou cria uma lista vazia
let produtosAdmin = JSON.parse(localStorage.getItem("produtos")) || [];
produtosAdmin = produtosAdmin.map(produto => {


    return {

        ...produto,

        avaliacao: produto.avaliacao || "5.0",

        estoque: produto.estoque || "0",

        categoria: produto.categoria || "vestidos",

        tamanhos: produto.tamanhos || [
            "P",
            "M",
            "G",
            "GG"
        ]

    };


});


localStorage.setItem(
    "produtos",
    JSON.stringify(produtosAdmin)
);
let produtoEditando = null;
let produtosMostrar = produtosAdmin;
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");
const imagemArquivo = document.getElementById("imagemArquivo");
let imagemAtual = "";
formulario.addEventListener("submit", async function(event){
    event.preventDefault();
if(imagemArquivo.files[0]){


    imagemAtual = await lerImagem(imagemArquivo.files[0]);


}

    const novoProduto = {

        nome: document.getElementById("nome").value,

        preco: Number(
            document.getElementById("preco").value
        ),

      categoria: document.getElementById("categoria").value,

imagem: imagemAtual,

descricao: document.getElementById("descricao").value,

        descricaoCompleta:
        document.getElementById("descricaoCompleta").value,


        avaliacao:
        document.getElementById("avaliacao").value || "5.0",


        estoque:
        document.getElementById("estoque").value || "0",


        tamanhos:[
            "P",
            "M",
            "G",
            "GG"
        ]

    };

if(produtoEditando === null){


    produtosAdmin.push(novoProduto);


    alert("Produto cadastrado com sucesso! 💙");


}else{


    produtosAdmin[produtoEditando] = novoProduto;


    alert("Produto atualizado com sucesso! 💙");


    produtoEditando = null;


}

localStorage.setItem(
    "produtos",
    JSON.stringify(produtosAdmin)
);


formulario.reset();


botaoSalvar.innerHTML = "💙 Salvar Produto";

botaoCancelar.style.display = "none";


});
const listaAdmin = document.getElementById("produtos-admin");
const pesquisaProduto = document.getElementById("pesquisaProduto");
const filtroCategoria = document.getElementById("filtroCategoria");
function mostrarProdutosAdmin(){

    listaAdmin.innerHTML = "";

    produtosMostrar.forEach((produto, index)=>{

        listaAdmin.innerHTML += `

        <div class="produto-admin">

            <img src="${produto.imagem}">


            <div>

                <h4>${produto.nome}</h4>
<p>
    💰 R$ ${produto.preco.toFixed(2).replace(".",",")}
</p>

<p>
    📂 Categoria: ${produto.categoria}
</p>

<p>
    📦 Estoque: ${produto.estoque} unidades
</p>

<p>
    ⭐ Avaliação: ${produto.avaliacao}
</p>


<button onclick="editarProduto(${index})">
    Editar
</button>


<button onclick="excluirProduto(${index})">
    Excluir
</button>

            </div>


        </div>

        `;


    });

}



mostrarProdutosAdmin();
function excluirProduto(index){


    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );


    if(confirmar){


        produtosAdmin.splice(index,1);


        localStorage.setItem(
            "produtos",
            JSON.stringify(produtosAdmin)
        );


        mostrarProdutosAdmin();


        alert("Produto excluído com sucesso! 💙");

    }

}



function editarProduto(index){

    produtoEditando = index;


    botaoSalvar.innerHTML = "✏️ Atualizar Produto";


    botaoCancelar.style.display = "block";


    const produto = produtosAdmin[index];


    document.getElementById("nome").value = produto.nome;

    document.getElementById("preco").value = produto.preco;

    document.getElementById("categoria").value = produto.categoria;

    imagemAtual = produto.imagem;

    document.getElementById("descricao").value = produto.descricao;

    document.getElementById("descricaoCompleta").value = produto.descricaoCompleta;

    document.getElementById("avaliacao").value = produto.avaliacao;

    document.getElementById("estoque").value = produto.estoque;


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


botaoCancelar.addEventListener("click", function(){


    formulario.reset();


    imagemAtual = "";


    produtoEditando = null;


    botaoSalvar.innerHTML = "💙 Salvar Produto";


    botaoCancelar.style.display = "none";


});
function filtrarProdutos(){


    const texto = pesquisaProduto.value.toLowerCase();


    const categoria = filtroCategoria.value;



    produtosMostrar = produtosAdmin.filter(produto =>{


        const nomeCombina = produto.nome
        .toLowerCase()
        .includes(texto);



        const categoriaCombina = 
        categoria === "todos" ||
        produto.categoria === categoria;



        return nomeCombina && categoriaCombina;


    });



    mostrarProdutosAdmin();


}



pesquisaProduto.addEventListener(
"input",
filtrarProdutos
);



filtroCategoria.addEventListener(
"change",
filtrarProdutos
);
function lerImagem(arquivo){

    return new Promise((resolve)=>{


        const leitor = new FileReader();


        leitor.onload = function(){

            resolve(leitor.result);

        };


        leitor.readAsDataURL(arquivo);


    });

}