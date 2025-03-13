import { favoritarTermoDatabase } from "./firestore/firestore.js";
import { criarExibirToast } from "../../components/toast.js"
const main = document.querySelector('main');


async function favoritarCard (e) {
    const card = e.closest('#card');
    const cardKey = card.getAttribute('data-key');

    try {
        const res = await favoritarTermoDatabase(cardKey);
        if (res === 'favoritado') {
            e.classList.remove('fill-none');
            e.classList.add('fill-laranja-fraco');
            const mensagem = 'Termo favoritado com sucesso!'
            const funcionalidade = 'positivo'
            criarExibirToast(mensagem, funcionalidade, main);
        };

        if (res === 'desfavoritado') {
            e.classList.remove('fill-laranja-fraco');
            e.classList.add('fill-none');
            const mensagem = 'Termo retirado dos favoritos!'
            const funcionalidade = 'negativo'
            criarExibirToast(mensagem, funcionalidade, main);
        }
        
    } catch (error) {
        alert('No momento não conseguimos favoritar seu termo! Tente novamente mais tarde' + error);
    };
};

export { favoritarCard }