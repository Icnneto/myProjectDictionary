const iconesDeletar = document.querySelectorAll('#btn-deletar_termo');
const user = JSON.parse(sessionStorage.getItem('userInfo'));
const modal = criarModalExclusao();
document.querySelector('main').append(modal);

function exibirModalExclusao(e) {
    // const icone = e.target;
    const card = e.closest('#card') || e.closest('#card-favoritado');
    console.log(card);
    

    modal.showModal();

    modal.querySelector('#btn_cancelar-deletar_termo').onclick = () => {
        fecharModal('cancelar', card);
    };
    
      modal.querySelector('#btn_confirmar-deletar_termo').onclick = () => {
        fecharModal('confirmar', card);
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

function fecharModal (acao, card) {
    if (acao === 'confirmar'){
        card.remove()
    };

    modal.close();
};

export { exibirModalExclusao };