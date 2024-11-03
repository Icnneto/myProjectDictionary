const formulario = document.querySelector('[data-form_add-termo]');
const inputsFormulario = document.querySelectorAll('[data-input_new-term]')
const secaoListaTermos = document.querySelector('#lista-termos');
const modalAdicionarTermo = document.querySelector('#my_modal_5');

// inserir fetch e toda lógica dele
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const listaInputs = {
        'termo': e.target.elements['termo'].value,
        'descricao': e.target.elements['descricao'].value
    };

    const card = criarCard(listaInputs.termo, listaInputs.descricao);
    secaoListaTermos.appendChild(card);
    
    inputsFormulario.forEach(input => {
        input.value = '';
    });

    // console.log(JSON.stringify(listaInputs));
});

function criarCard(termo, descricao) {
    const divPai = document.createElement('div');
    const estilizacaoDivPai = ['flex', 'flex-col', 'border', 'border-slate-200', 'rounded-xl', 'shadow-lg', 'px-4', 'py-6', 'w-[360px]', 'gap-y-6']
    divPai.classList.add(...estilizacaoDivPai);

    const iconeEditar = '../../img/icon_edit.svg';
    const iconeFavoritar = '../../img/icon_favorite.svg';
    const iconeDeletar = '../../img/icon_delete.svg'

    divPai.innerHTML = `
        <div class="flex flex-row items-center gap-y-2 gap-x-6 mx-2 place-content-between">
            <h4 class="text-lg text-laranja-escuro font-semibold flex-wrap">${termo}</h4>
            <div class="flex flex-row gap-x-4 items-center">
                <img id="btn-editar_termo" class="cursor-pointer" src="${iconeEditar}" alt="icone para editar o termo">
                <img id="btn-favoritar_termo" class="cursor-pointer" src="${iconeFavoritar}" alt="icone para favoritar o termo">
                <img id="btn-deletar_termo" class="cursor-pointer" src="${iconeDeletar}" alt="ícone para deletar o termo">
            </div>
        </div>
        <div class="flex justify-center">
            <hr class="w-[96%] bg-laranja-fraco h-0.5 opacity-30">
        </div>
        <div class="mx-2">
            <p class="text-preto-padrao text-justify">${descricao}</p>
        </div>
    `
    return divPai;
}
