import { editarTermoDatabase } from "./firestore/firestore.js";
import { criarModalEdicao } from "../../components/modalEdicao.js";
const modalEdicao = criarModalEdicao();
document.querySelector('main').append(modalEdicao);

// inserir lógica de verificação dos campos - para não permitir que a pessoa salve com tudo em branco

function exibirModalEdicao (e) {
    const card = e.closest('#card');
    const cardKey = card.getAttribute('data-key');
    console.log(card);

    const campoTermoCard = card.querySelector('[data-termo]');
    const campoDescricaoCard = card.querySelector('[data-descricao]');

    const campoTermoModal = modalEdicao.querySelector('#termo');
    campoTermoModal.value = campoTermoCard.innerText;

    const campoDescricaoModal = modalEdicao.querySelector('#descricao');
    campoDescricaoModal.value = campoDescricaoCard.innerText;

    modalEdicao.showModal();

    modalEdicao.querySelector('#btn_cancelar-ajuste').onclick = () => {
        fecharModal('cancelar', campoTermoCard, campoDescricaoCard, campoTermoModal, campoDescricaoModal, cardKey);
    };

    modalEdicao.querySelector('#btn_add-alteracao').onclick = () => {
        fecharModal('alterar', campoTermoCard, campoDescricaoCard, campoTermoModal, campoDescricaoModal, cardKey)
    };

};

async function fecharModal (acao, novoTermo, novaDescricao, campoTermoModal, campoDescricaoModal, cardKey) {
    try {
        if (acao === 'alterar') {
            novoTermo = campoTermoModal.value;
            novaDescricao = campoDescricaoModal.value;
            console.log("Chamando editarTermoDatabase...");
            await editarTermoDatabase(novoTermo, novaDescricao, cardKey)
                .then(() => console.log("Termo atualizado no Firestore!"))
                .catch(error => console.error("Erro dentro de editarTermoDatabase:", error));
        };
    } catch (error) {
        console.error("Erro ao fechar modal:", error);
    };
    modalEdicao.close();
};

function atualizarCardNaUI (termo, descricao, dbKey, favoritado, secao) {
    const cardExistente = document.querySelector(`[data-key="${dbKey}"]`);

    if (cardExistente) {
        const elementoTermo = cardExistente.querySelector('[data-termo]');
        if (elementoTermo) elementoTermo.textContent = termo;
        
        // Atualizar a descrição
        const elementoDescricao = cardExistente.querySelector('[data-descricao]');
        if (elementoDescricao) elementoDescricao.textContent = descricao;

        const setFavoritado = favoritado ? 'fill-laranja-fraco' : 'fill-none';
        const classFavoritado = [
            'w-8', 'h-8', 'cursor-pointer', 'p-1', 'rounded-lg', setFavoritado, 'hover:bg-gray-200', 'stroke-2', 'stroke-laranja-fraco'
        ]
        const btnFavoritar = cardExistente.querySelector('[data-favoritar-termo]');

        if (btnFavoritar) {
            btnFavoritar.setAttribute('class', classFavoritado.join(' '));
        }

        console.log(`Card ${dbKey} atualizado na UI`);
    }
};

export { exibirModalEdicao, atualizarCardNaUI }