function criarModalExclusao() {
    const divPai = document.createElement('dialog');
    const divPaiId = 'modal_excluirTermo';

    divPai.classList.add('modal', 'modal-bottom', 'sm:modal-middle');
    divPai.id = divPaiId;

    let mensagemConfirmacao = 'Você tem certeza?';
    let textoBtnCancelar = 'Cancelar';
    let textoBtnConfirmar = 'Confirmar';

    divPai.innerHTML = `
        <div class="modal-box bg-branco-fundo">
            <p class="text-preto-padrao font-semibold">${mensagemConfirmacao}</p>
            <div class="flex flex-row justify-end gap-x-4">
                <button id="btn_cancelar-deletar_termo" class="btn text-preto-padrao bg-branco-fundo border-1 border-laranja-escuro" onclick="">${textoBtnCancelar}</button>
                <button id="btn_confirmar-deletar_termo" onclick="" class="btn bg-gradient-to-r from-laranja-fraco to-laranja-medio text-branco-fundo hover:ring-1 hover:ring-laranja-medio">
                    ${textoBtnConfirmar}
                </button>
            </div>
        </div>
    `

    return divPai;
};

export { criarModalExclusao };