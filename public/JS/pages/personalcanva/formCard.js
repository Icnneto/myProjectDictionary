import { registrarNovoTermo } from "./realtimeDatabase.js";
import { favoritarCard } from "./favoritarTermo.js";
import { exibirModalEdicao } from "./editarTermo.js";
import { exibirModalExclusao } from "./deletarTermo.js";
const formulario = document.querySelector('[data-form_add-termo]');
const inputsFormulario = document.querySelectorAll('[data-input_new-term]')
const secaoListaTermos = document.querySelector('#lista-termos');
const modalAdicionarTermo = document.querySelector('#modal_novoTermo');
const btnCancelarTermo = document.querySelector('#btn_cancelar-termo');
const btnAddTermo = document.querySelector('#btn_add-termo');
const main = document.querySelector('main');

const user = JSON.parse(sessionStorage.getItem('userInfo'));

const tiposDeErro = ['valueMissing'];

const mensagens = {
    termo: {
        valueMissing: "O campo 'Termo' não pode estar vazio.",
    },
    descricao: {
        valueMissing: "O campo 'Descrição' não pode estar vazio.",
    }
};

inputsFormulario.forEach(input => {
    input.addEventListener('blur', () => verificaCampo(input));
    input.addEventListener('invalid', evento => evento.preventDefault());
});

function verificaCampo(input) {
    let mensagem = '';
    input.setCustomValidity('');

    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagens[input.name][erro];
        };
    });

    const mensagemErro = input.parentNode.querySelector('.mensagem-erro');
    const validadorInput = input.checkValidity();

    if (!validadorInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = '';
    };

};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const listaInputs = {
        'termo': e.target.elements['termo'].value,
        'descricao': e.target.elements['descricao'].value
    };

    try {
        const userId = user.userId;
        await registrarNovoTermo(listaInputs, userId);
        // criarEAcrescentarCard(listaInputs.termo, listaInputs.descricao);
        exibirToastSucesso();

    } catch (error) {
        console.error("Erro ao registrar o termo:", error);
        exibirToastFalha();
    }

    limparCamposFormularios(inputsFormulario);

    modalAdicionarTermo.close();
});

function criarEAcrescentarCard(termo, descricao, dbKey) {
    const divPai = document.createElement('div');
    const estilizacaoDivPai = ['flex', 'flex-col', 'border', 'border-slate-200', 'rounded-xl', 'shadow-lg', 'px-4', 'py-6', 'w-[300px]', 'gap-y-6'];
    divPai.classList.add(...estilizacaoDivPai);
    divPai.id = 'card';
    divPai.setAttribute('data-key', `${dbKey}`);

    const iconeEditar = '../img/icon_edit.svg';
    const iconeDeletar = '../img/icon_delete.svg'

    divPai.innerHTML = `
        <div class="flex flex-row items-center gap-y-4 gap-x-6 mx-2 place-content-between">
            <h4 id="cardTermo" class="text-lg text-laranja-escuro font-semibold flex-wrap">${termo}</h4>
            <div class="flex flex-row gap-x-2 items-center">
                <img id="btn-editar_termo" class="w-7 h-7 cursor-pointer p-1 rounded-lg hover:bg-gray-200" src="${iconeEditar}" 
                    alt="icone para editar o termo">
                <svg id="btn-favoritar_termo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-8 h-8 cursor-pointer p-1 rounded-lg fill-none hover:bg-gray-200 stroke-2 stroke-laranja-fraco">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <img id="btn-deletar_termo" class="w-7 h-7 cursor-pointer p-1 rounded-lg hover:bg-gray-200" src="${iconeDeletar}" 
                    alt="ícone para deletar o termo">
            </div>
        </div>
        <div class="flex justify-center">
            <hr class="w-[96%] bg-laranja-fraco h-0.5 opacity-30">
        </div>
        <div class="mx-2">
            <p id="cardDescricao" class="text-preto-padrao text-justify">${descricao}</p>
        </div>
    `
    const btnFavoritar = divPai.querySelector('#btn-favoritar_termo');
    btnFavoritar.addEventListener('click', (e) => {
        favoritarCard(e.target);
    });

    const btnEditarTermo = divPai.querySelector('#btn-editar_termo');
    btnEditarTermo.addEventListener('click', (e) => {
        exibirModalEdicao(e.target);
    });

    const btnDeletar = divPai.querySelector('#btn-deletar_termo');
    btnDeletar.addEventListener('click', (e) => {
        exibirModalExclusao(e.target);
    });

    secaoListaTermos.appendChild(divPai);
};

function exibirToastSucesso() {
    let mensagemSucesso = 'Termo adicionado com sucesso!'

    const toastAdicao = document.createElement('div');
    toastAdicao.classList.add(
        'toast',
        'toast-bottom',
        'toast-right',
        'z-50'
    );

    toastAdicao.innerHTML = `
        <div class="alert font-quicksand text-green-600 border-green-600 bg-branco-fundo">
            <span>${mensagemSucesso}</span>
        </div>
    `

    main.append(toastAdicao);

    setTimeout(() => {
        toastAdicao.remove();
    }, 2000);

};

function exibirToastFalha() {
    let mensagemFalha = 'Falha ao adicionar Termo!'

    const toastFalha = document.createElement('div');
    toastFalha.classList.add(
        'toast',
        'toast-bottom',
        'toast-right',
        'z-50'
    );

    toastFalha.innerHTML = `
        <div class="alert font-quicksand text-red-600 border-red-600 bg-branco-fundo">
            <span>${mensagemFalha}</span>
        </div>
    `

    main.append(toastFalha);

    setTimeout(() => {
        toastFalha.remove();
    }, 2000);

};

function limparCamposFormularios(inputs) {
    inputs.forEach(input => {
        input.value = '';
    });
};

btnCancelarTermo.addEventListener('click', () => {
    inputsFormulario.forEach(input => {
        input.value = '';
    });

    modalAdicionarTermo.close();
});

export { criarEAcrescentarCard };