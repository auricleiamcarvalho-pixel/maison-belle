import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const botaoEntrar = document.getElementById("entrar");

const erro = document.getElementById("erro");

botaoEntrar.addEventListener("click", async () => {

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        window.location.href = "admin.html";

    } catch (e) {

        erro.innerHTML = "E-mail ou senha incorretos.";

    }

});