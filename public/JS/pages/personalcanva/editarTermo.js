import { editarTermoDatabase } from "./firestore/firestore.js";
import { criarModalEdicao } from "../../components/modalEdicao.js";
const modalEdicao = criarModalEdicao();
document.querySelector('main').append(modalEdicao);

// inserir lógica de verificação dos campos - para não permitir que a pessoa salve com tudo em branco

function exibirModalEdicao (e) {
    const card = e.closest('#card');
    const cardKey = card.getAttribute('data-key');
    console.log(card);

    const campoTermoCard = card.querySelector('#cardTermo');
    const campoDescricaoCard = card.querySelector('#cardDescricao');

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
            await editarTermoDatabase(novoTermo, novaDescricao, cardKey)
                .catch(error => console.error(error));
        };
        
    } catch (error) {
        
    };
    modalEdicao.close();
};

export { exibirModalEdicao };