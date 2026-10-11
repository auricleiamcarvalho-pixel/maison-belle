// ============================
// CHECKOUT MAISON BELLE
// ============================


let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];



function carregarResumo(){


    const resumo = document.getElementById("resumoPedido");

    const totalPedido = document.getElementById("totalPedido");


    if(!resumo) return;



    resumo.innerHTML="";


    let total = 0;


    if(carrinho.length === 0){


        resumo.innerHTML = `

        <p>
        Seu carrinho está vazio.
        </p>

        `;

        return;

    }



    carrinho.forEach(produto => {



        total += produto.preco * produto.quantidade;



        resumo.innerHTML += `


        <div class="produto-checkout">


            <img src="${produto.imagem}">


            <div>


                <h3>
                ${produto.nome}
                </h3>


                <p>
                Quantidade: ${produto.quantidade}
                </p>


                <p>
                R$ ${(produto.preco * produto.quantidade).toFixed(2)}
                </p>


            </div>


        </div>


        `;



    });



    totalPedido.innerHTML =

    "R$ " + total.toFixed(2);



}




carregarResumo();