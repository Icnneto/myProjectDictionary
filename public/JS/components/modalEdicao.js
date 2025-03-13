function criarModalEdicao () {
    const dialogPai = document.createElement('dialog');
    const dialogPaiId = 'modal_editarTermo';

    dialogPai.classList.add('modal', 'modal-bottom', 'sm:modal-middle');
    dialogPai.id = dialogPaiId;

    dialogPai.innerHTML = `
        <div class="modal-box">
            <form action="" method="" data-form_add-termo class="flex flex-col justify-center gap-y-4">

                <fieldset class="flex flex-col gap-y-2">
                    <label for="termo" class="text-preto-padrao text-base font-semibold">Termo</label>
                    <input name="termo" id="termo"
                        class="p-2 rounded-lg border border-slate-300 shadow-md text-sm hover:border-laranja-fraco hover:ring-1 hover:ring-laranja-fraco focus:outline-none"
                        data-input_new-term type="text" required autocomplete="off" />
                    <span class="mensagem-erro text-sm text-red-600 mb-2"></span>
                </fieldset>

                <fieldset class="flex flex-col gap-y-2">
                    <label for="descricao" class="text-preto-padrao text-base font-semibold">Descrição</label>
                    <textarea name="descricao" id="descricao"
                        class="p-2 rounded-lg border border-slate-300 shadow-md text-sm hover:border-laranja-fraco hover:ring-1 hover:ring-laranja-fraco focus:outline-none"
                        data-input_new-term type="text" rows="5" required></textarea>
                    <span class="mensagem-erro text-sm text-red-600 mb-2"></span>
                </fieldset>

                <div class="flex flex-row justify-end gap-x-4">
                    <button id="btn_cancelar-ajuste" class="btn" onclick="">Cancelar</button>
                    <input value="Adicionar" id="btn_add-alteracao" type="submit"
                        class="btn bg-gradient-to-r from-laranja-fraco to-laranja-medio text-branco-fundo hover:ring-1 hover:ring-laranja-medio" />
                </div>
            </form>
        </div>
    `
    return dialogPai;
};

export { criarModalEdicao };