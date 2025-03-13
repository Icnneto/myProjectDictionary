import { registrarNovoTermo } from "./firestore/firestore.js";
import { criarExibirToast } from "../../components/toast.js"
const formulario = document.querySelector('[data-form_add-termo]');
const inputsFormulario = document.querySelectorAll('[data-input_new-term]')
const modalAdicionarTermo = document.querySelector('#modal_novoTermo');
const btnCancelarTermo = document.querySelector('#btn_cancelar-termo');
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

function limparCamposFormularios(inputs) {
    inputs.forEach(input => {
        input.value = '';
    });
};

inputsFormulario.forEach(input => {
    input.addEventListener('blur', () => verificaCampo(input));
    input.addEventListener('invalid', evento => evento.preventDefault());
});

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const listaInputs = {
        'termo': e.target.elements['termo'].value,
        'descricao': e.target.elements['descricao'].value
    };

    try {
        const userId = user.userId;
        await registrarNovoTermo(listaInputs, userId);

        const mensagem = 'Termo adicionado com sucesso!'
        const funcionalidade = 'positivo'
        criarExibirToast(mensagem, funcionalidade, main);

    } catch (error) {
        console.error("Erro ao registrar o termo:", error);
        const mensagem = 'Falha ao adicionar Termo!'
        const funcionalidade = 'negativo'
        criarExibirToast(mensagem, funcionalidade, main);
    }

    limparCamposFormularios(inputsFormulario);

    modalAdicionarTermo.close();
});

btnCancelarTermo.addEventListener('click', () => {
    inputsFormulario.forEach(input => {
        input.value = '';
    });
    
    modalAdicionarTermo.close();
});