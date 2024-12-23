import { favoritarTermoDatabase } from "./realtimeDatabase.js";
const main = document.querySelector('main');
const user = JSON.parse(sessionStorage.getItem('userInfo'));

async function favoritarCard (e) {
    const card = e.closest('[data-card]');
    const cardKey = card.id;

    try {
        const res = await favoritarTermoDatabase(cardKey);
        if (res === 'favoritado') {
            e.classList.remove('fill-none');
            e.classList.add('fill-laranja-fraco');
            criarToastFavoritado();
        };

        if (res === 'desfavoritado') {
            e.classList.remove('fill-laranja-fraco');
            e.classList.add('fill-none');
            criarToastRemocaoFavorito();
        }
        
    } catch (error) {
        alert('No momento não conseguimos favoritar seu termo! Tente novamente mais tarde' + error);
    };
};    


function criarToastFavoritado () {
    let mensagemSucesso = 'Termo favoritado com sucesso!'

    const toastAdicaoFavoritado = document.createElement('div');
    toastAdicaoFavoritado.classList.add(
        'toast',
        'toast-top',
        'toast-center'
    );

    toastAdicaoFavoritado.innerHTML = `
        <div class="alert font-quicksand text-green-600 border-green-600 bg-branco-fundo">
            <span>${mensagemSucesso}</span>
        </div>
    `

    main.append(toastAdicaoFavoritado);

    setTimeout(() => {
        toastAdicaoFavoritado.remove();
    }, 2000);

};

function criarToastRemocaoFavorito () {
    let mensagemRemocao = 'Termo retirado dos favoritos!'

    const toastRemocaoFavoritado = document.createElement('div');
    toastRemocaoFavoritado.classList.add(
        'toast',
        'toast-top',
        'toast-center'
    );

    toastRemocaoFavoritado.innerHTML = `
        <div class="alert font-quicksand text-red-600 border-red-600 bg-branco-fundo">
            <span>${mensagemRemocao}</span>
        </div>
    `

    main.append(toastRemocaoFavoritado);

    setTimeout(() => {
        toastRemocaoFavoritado.remove();
    }, 2000);

};

export { favoritarCard }