import { favoritarCard } from "../pages/personalcanva/favoritarTermo.js";
import { exibirModalEdicao } from "../pages/personalcanva/editarTermo.js";
import { exibirModalExclusao } from "../pages/personalcanva/deletarTermo.js";

function criarEAcrescentarCard(termo, descricao, dbKey, favoritado, secao) {
    const divPai = document.createElement('div');
    const estilizacaoDivPai = [
        'flex', 'flex-col', 'border', 'border-slate-200', 'rounded-xl', 'shadow-lg', 'px-4', 'py-6', 'w-[300px]', 'gap-y-6'
    ];
    divPai.classList.add(...estilizacaoDivPai);
    divPai.id = 'card';
    divPai.setAttribute('data-key', `${dbKey}`);

    const iconeEditar = '../img/icon_edit.svg';
    const iconeDeletar = '../img/icon_delete.svg'
    const setFavoritado = favoritado ? 'fill-laranja-fraco' : 'fill-none';

    divPai.innerHTML = `
        <div class="flex flex-row items-center gap-y-4 gap-x-6 mx-2 place-content-between">
            <h4 id="cardTermo" class="text-lg text-laranja-escuro font-semibold flex-wrap">${termo}</h4>
            <div class="flex flex-row gap-x-2 items-center">
                <img id="btn-editar_termo" class="w-7 h-7 cursor-pointer p-1 rounded-lg hover:bg-gray-200" src="${iconeEditar}" 
                    alt="icone para editar o termo">
                <svg id="btn-favoritar_termo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-8 h-8 cursor-pointer p-1 rounded-lg ${setFavoritado} hover:bg-gray-200 stroke-2 stroke-laranja-fraco">
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

    secao.appendChild(divPai);
};

export { criarEAcrescentarCard };