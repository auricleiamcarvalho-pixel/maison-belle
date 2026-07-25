import { auth, db } from "./firebase.js";
import{
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
onAuthStateChanged(auth, (usuario) => {

    if (!usuario) {

        window.location.href = "login.html";

    }

});
const formulario = document.getElementById("formProduto");


// pega produtos salvos ou cria uma lista vazia
let produtosAdmin = [];
async function carregarProdutosFirebase(){

    const produtosBanco = [];

    const consulta = await getDocs(
        collection(db,"produtos")
    );


    consulta.forEach((documento)=>{

        produtosBanco.push({

            id: documento.id,

            ...documento.data()

        });

    });


    produtosAdmin = produtosBanco;

    produtosMostrar = produtosAdmin;


    mostrarProdutosAdmin();

}


let produtoEditando = null;

let produtosMostrar = produtosAdmin;

carregarProdutosFirebase();
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

   await addDoc(
    collection(db, "produtos"),
    novoProduto
);

await carregarProdutosFirebase();

alert("Produto cadastrado com sucesso! 💙");
}else{

    await updateDoc(
        doc(db, "produtos", produtoEditando),
        novoProduto
    );


    alert("Produto atualizado com sucesso! 💙");


    produtoEditando = null;


    await carregarProdutosFirebase();

}

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

<button onclick="editarProduto('${produto.id}')">
    Editar
</button>

<button onclick="excluirProduto('${produto.id}')">
    Excluir
</button>

            </div>


        </div>

        `;


    });

}



mostrarProdutosAdmin();
async function excluirProduto(id){

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );


    if(confirmar){

        await deleteDoc(
            doc(db, "produtos", id)
        );


        alert("Produto excluído com sucesso! 💙");


        carregarProdutosFirebase();

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

        leitor.onload = function(e){

            const img = new Image();

            img.onload = function(){

                const canvas = document.createElement("canvas");

                const larguraMaxima = 700;

                const escala = larguraMaxima / img.width;

                canvas.width = larguraMaxima;
                canvas.height = img.height * escala;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const imagemComprimida =
                canvas.toDataURL(
                    "image/jpeg",
                    0.7
                );

                resolve(imagemComprimida);

            };

            img.src = e.target.result;

        };

        leitor.readAsDataURL(arquivo);

    });

}


        leitor.readAsDataURL(arquivo);


    });

}
const botaoSair = document.getElementById("sair");


if(botaoSair){

    botaoSair.addEventListener("click", async ()=>{

        await signOut(auth);

        window.location.href = "login.html";

    });

}
window.excluirProduto = excluirProduto;
window.editarProduto = editarProduto;