import { produtos } from "./produtos.js";
import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const listaProdutos = document.getElementById("lista-produtos");



async function carregarProdutos() {


    const produtosFirebase = [];


    const consulta = await getDocs(
        collection(db, "produtos")
    );


    consulta.forEach((doc) => {

        produtosFirebase.push({
            id: doc.id,
            ...doc.data()
        });

    });



    const todosProdutos = [
        ...produtos,
        ...produtosFirebase
    ];



    todosProdutos.forEach((produto) => {


        const card = document.createElement("div");

        card.classList.add("produto", produto.categoria);



        card.innerHTML = `

        <button 
        class="favorito"
        data-nome="${produto.nome}"
        data-imagem="${produto.imagem}"
        data-preco="${produto.preco}">
            ♡
        </button>


        <img src="${produto.imagem}" alt="${produto.nome}">


        <div class="avaliacao">
            ★★★★★ <span>${produto.avaliacao}</span>
        </div>


        <h3>
            ${produto.nome}
        </h3>


        <p class="preco">
            R$ ${produto.preco.toFixed(2).replace(".", ",")}
        </p>


        <p class="parcelamento">
            ou 10x de R$ ${(produto.preco / 10).toFixed(2).replace(".", ",")} sem juros
        </p>


        <p class="descricao">
            ${produto.descricao}
        </p>



        <details class="mais-informacoes">

            <summary>
                Ver descrição completa
            </summary>


            <p>
                ${produto.descricaoCompleta}
            </p>


            <ul class="detalhes">

            ${(produto.detalhes || []).map(item => `
                <li>✓ ${item}</li>
            `).join("")}

            </ul>

        </details>



        <div class="acoes-produto">


            <label>
                Tamanho
            </label>



            <select class="tamanho">

                ${(produto.tamanhos || []).map(tamanho => `
                    <option>${tamanho}</option>
                `).join("")}

            </select>




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
            onclick="comprarAgora(
            '${produto.nome}',
            ${produto.preco},
            '${produto.imagem}'
            )">

                ⚡ Comprar Agora

            </button>


        </div>


        `;



        listaProdutos.appendChild(card);



    });


}



carregarProdutos();