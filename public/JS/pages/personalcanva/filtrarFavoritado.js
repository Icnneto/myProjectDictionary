import { resgatarECriarApenasFavoritos } from "../personalcanva/firestore/firestore.js";

const secaoListaTermos = document.querySelector('#lista-termos');
const btnMeusFavoritos = document.querySelector('[data-filtrar_favorito]');

btnMeusFavoritos.addEventListener('click', async () => {
    try {
        secaoListaTermos.innerHTML = '';
        await resgatarECriarApenasFavoritos();
    } catch (error) {
        console.log(error)
    }
})