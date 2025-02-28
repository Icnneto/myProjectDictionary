import { deletarTermoDatabase } from "./firestore/firestore.js";
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

function criarModalExclusao() {
    const divPai = document.createElement('dialog');
    const divPaiId = 'modal_excluirTermo';

    divPai.classList.add('modal', 'modal-bottom', 'sm:modal-middle');
    divPai.id = divPaiId;

    let mensagemConfirmacao = 'Você tem certeza?';
    let textoBtnCancelar = 'Cancelar';
    let textoBtnConfirmar = 'Confirmar';

    divPai.innerHTML = `
        <div class="modal-box">
            <p class="font-semibold">${mensagemConfirmacao}</p>
            <div class="flex flex-row justify-end gap-x-4">
                <button id="btn_cancelar-deletar_termo" class="btn" onclick="">${textoBtnCancelar}</button>
                <button id="btn_confirmar-deletar_termo" onclick="" class="btn bg-gradient-to-r from-laranja-fraco to-laranja-medio text-branco-fundo hover:ring-1 hover:ring-laranja-medio">
                    ${textoBtnConfirmar}
                </button>
            </div>
        </div>
    `

    return divPai;
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