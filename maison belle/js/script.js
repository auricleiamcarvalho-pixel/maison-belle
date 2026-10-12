// ============================
// CARRINHO MAISON BELLE
// ============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
function corrigirCaminhoImagem(imagem) {
    if (!imagem) return "";

    if (imagem.startsWith("/")) {
        return imagem;
    }

    return "/" + imagem.replace(/^\.?\//, "");
}
atualizarContador();

// ============================
// ADICIONAR PRODUTO
// ============================

function adicionarCarrinho(nome, preco, imagem){

    const produtoExistente = carrinho.find(produto => produto.nome === nome);

    if(produtoExistente){

        produtoExistente.quantidade++;

    }else{

        carrinho.push({

            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1

        });

    }

    salvarCarrinho();

    atualizarContador();

    alert("Produto adicionado ao carrinho!");

}

// ============================
// SALVAR
// ============================

function salvarCarrinho(){

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

// ============================
// CONTADOR
// ============================

function atualizarContador(){

    const contador = document.getElementById("contador");

    if(!contador) return;

    let quantidade = 0;

    carrinho.forEach(produto=>{

        quantidade += produto.quantidade;

    });

    contador.innerHTML = quantidade;

}

// ============================
// MOSTRAR CARRINHO
// ============================

function carregarCarrinho(){

    const lista = document.getElementById("listaCarrinho");

    const total = document.getElementById("valorTotal");

    if(!lista) return;

    lista.innerHTML="";

    let soma=0;

    carrinho.forEach((produto,index)=>{

        soma += produto.preco * produto.quantidade;

        lista.innerHTML += `

        <div class="item">

            <img src="${corrigirCaminhoImagem(produto.imagem)}" alt="${produto.nome}">

            <div>

                <h3>${produto.nome}</h3>

                <p>R$ ${produto.preco.toFixed(2)}</p>

                <div class="quantidade">

                    <button onclick="diminuir(${index})">-</button>

                    <span>${produto.quantidade}</span>

                    <button onclick="aumentar(${index})">+</button>

                </div>

                <button onclick="remover(${index})">

                    Remover

                </button>

            </div>

        </div>

        `;

    });

    if(total){

        total.innerHTML =

        "R$ "+soma.toFixed(2);

    }

}

// ============================
// AUMENTAR
// ============================

function aumentar(index){

    carrinho[index].quantidade++;

    salvarCarrinho();

    atualizarContador();

    carregarCarrinho();

}

// ============================
// DIMINUIR
// ============================

function diminuir(index){

    if(carrinho[index].quantidade>1){

        carrinho[index].quantidade--;

    }else{

        carrinho.splice(index,1);

    }

    salvarCarrinho();

    atualizarContador();

    carregarCarrinho();

}

// ============================
// REMOVER
// ============================

function remover(index){

    carrinho.splice(index,1);

    salvarCarrinho();

    atualizarContador();

    carregarCarrinho();

}
const pesquisa = document.getElementById("pesquisa");

if(pesquisa){

pesquisa.addEventListener("keyup", function(){

const filtro = pesquisa.value.toLowerCase();

const produtos = document.querySelectorAll(".produto");

produtos.forEach(produto=>{

const nome = produto.innerText.toLowerCase();

produto.style.display = nome.includes(filtro)
? "block"
: "none";

});

});

}
//==========================
// FILTRAR PRODUTOS
//==========================

function filtrarProdutos(categoria){

const produtos = document.querySelectorAll(".produto");

produtos.forEach(produto=>{

if(categoria==="todos"){

produto.style.display="block";

}else{

if(produto.classList.contains(categoria)){

produto.style.display="block";

}else{

produto.style.display="none";

}

}

});

const botoes=document.querySelectorAll(".categorias button");

botoes.forEach(botao=>{

botao.classList.remove("ativo");

});

event.target.classList.add("ativo");

}
//===========================
// ESCOLHER TAMANHO
//===========================

document.querySelectorAll(".tamanhos button").forEach(botao=>{

botao.addEventListener("click",function(){

const grupo=this.parentElement;

grupo.querySelectorAll("button").forEach(btn=>{

btn.style.background="white";

btn.style.color="black";

});

this.style.background="#123D84";

this.style.color="white";

});

});
// ============================
// COMPRAR AGORA
// ============================

function comprarAgora(nome, preco, imagem){

    carrinho.push({

        nome:nome,

        preco:preco,

        imagem:imagem,

        quantidade:1

    });


    salvarCarrinho();


    atualizarContador();


    window.location.href="checkout.html";

}
// ============================
// SISTEMA DE FAVORITOS MAISON BELLE
// ============================


function pegarFavoritos(){

    return JSON.parse(localStorage.getItem("favoritos")) || [];

}



// ADICIONAR FAVORITO

function adicionarFavorito(nome, imagem, preco){


    let favoritos = pegarFavoritos();



    let existe = favoritos.some(
        produto => produto.nome === nome
    );



    if(!existe){


        favoritos.push({

            nome:nome,

            imagem:imagem,

            preco:preco

        });



        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );


    }



    atualizarCoracoes();


    atualizarContadorFavoritos();


    mostrarNotificacaoFavorito(nome);


}





// ATUALIZAR CORAÇÃO


function atualizarCoracoes(){


    let favoritos = pegarFavoritos();



    document.querySelectorAll(".favorito")
    .forEach(botao=>{


        let nome =
        botao.dataset.nome;



        let existe =
        favoritos.some(
            produto=>produto.nome===nome
        );



        if(existe){


            botao.innerHTML="💙";

            botao.classList.add("ativo");


        }else{


            botao.innerHTML="♡";

            botao.classList.remove("ativo");


        }


    });


}





// CLIQUE NO CORAÇÃO


document.addEventListener(
"click",
function(e){


if(e.target.classList.contains("favorito")){


let nome =
e.target.dataset.nome;


let imagem =
e.target.dataset.imagem;


let preco =
Number(e.target.dataset.preco);



adicionarFavorito(
nome,
imagem,
preco
);



}


});





// CONTADOR


function atualizarContadorFavoritos(){


let favoritos =
pegarFavoritos();



let contador =
document.getElementById(
"contador-favoritos"
);



if(contador){

contador.innerHTML =
favoritos.length;

}


}





// NOTIFICAÇÃO


function mostrarNotificacaoFavorito(nome){


let notificacao =
document.querySelector(
".notificacao-favorito"
);



if(!notificacao){

notificacao =
document.createElement("div");

notificacao.className =
"notificacao-favorito";


document.body.appendChild(notificacao);


}



notificacao.innerHTML =
`
💙 <span>${nome}</span> foi salvo nos favoritos!
`;



notificacao.classList.add("ativa");



setTimeout(()=>{

notificacao.classList.remove("ativa");

},3000);


}
// ============================
// MOSTRAR FAVORITOS NA PÁGINA
// ============================

function carregarFavoritos(){

    let lista = document.getElementById("lista-favoritos");


    if(!lista) return;



    let favoritos = pegarFavoritos();



    if(favoritos.length === 0){


        lista.innerHTML = `

        <div class="favoritos-vazio">

            <h3>
            Você ainda não possui favoritos 💙
            </h3>

            <p>
            Clique no coração das peças para salvar.
            </p>

        </div>

        `;


        return;

    }



    lista.innerHTML = "";



    favoritos.forEach((produto,index)=>{


        lista.innerHTML += `


        <div class="produto favorito-card">


            <img src="${corrigirCaminhoImagem(produto.imagem)}" alt="${produto.nome}">



            <h3>
            ${produto.nome}
            </h3>



            <p class="preco">

            R$ ${produto.preco.toFixed(2)}

            </p>



            <button
            class="carrinho"
            onclick="adicionarCarrinho(
            '${produto.nome}',
            ${produto.preco},
            '${produto.imagem}'
            )">

            🛒 Adicionar ao Carrinho

            </button>



            <button
            class="comprar"
            onclick="removerFavorito(${index})">

            ❌ Remover

            </button>


        </div>


        `;


    });


}



// REMOVER FAVORITO

function removerFavorito(index){


    let favoritos = pegarFavoritos();


    favoritos.splice(index,1);



    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );



    carregarFavoritos();


    atualizarContadorFavoritos();


    atualizarCoracoes();


}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function () {

    carregarFavoritos();

    atualizarCoracoes();

    atualizarContadorFavoritos();

});

window.adicionarCarrinho = adicionarCarrinho;
window.comprarAgora = comprarAgora;
window.filtrarProdutos = filtrarProdutos;