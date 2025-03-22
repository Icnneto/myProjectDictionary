import { resgatarECriarApenasFavoritos } from "../personalcanva/firestore/firestore.js";

const secaoListaTermos = document.querySelector('#lista-termos');
const btnMeusFavoritos = document.querySelectorAll('[data-filtrar_favorito]');

btnMeusFavoritos.forEach((btn) => {
    btn.addEventListener('click', async () => {
        try {
            secaoListaTermos.innerHTML = '';
            await resgatarECriarApenasFavoritos();
        } catch (error) {
            console.log(error)
        }
    })
});

