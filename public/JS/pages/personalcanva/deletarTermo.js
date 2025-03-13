import { deletarTermoDatabase } from "./firestore/firestore.js";
import { criarModalExclusao } from "../../components/modalExclusao.js";
const modal = criarModalExclusao();
document.querySelector('main').append(modal);

function exibirModalExclusao(e) {
    const card = e.closest('#card');
    const cardKey = card.getAttribute('data-key');

    modal.showModal();

    modal.querySelector('#btn_cancelar-deletar_termo').onclick = async () => {
        await fecharModal('cancelar', card, cardKey);
    };
    
    modal.querySelector('#btn_confirmar-deletar_termo').onclick = async () => {
        await fecharModal('confirmar', card, cardKey);
    };
};

async function fecharModal (acao, card, cardKey) {
    
    try {
        if (acao === 'confirmar'){
            await deletarTermoDatabase(cardKey);
            card.remove();
        };
        modal.close();
        
    } catch (error) {
        console.error(error)
        modal.close();
    };
};

export { exibirModalExclusao };