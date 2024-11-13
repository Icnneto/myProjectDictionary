const main = document.querySelector('main');
const iconesFavoritar = document.querySelectorAll('#btn-favoritar_termo');

iconesFavoritar.forEach((icone) => {

    icone.addEventListener('click', (e) => {
        favoritarCard(e);
    });
    
});


function favoritarCard (e) {
    const icone = e.target;
    const card = icone.closest('#card') || icone.closest('#card-favoritado');
    console.log(card)
    const cardId = card.id;
    
    if (cardId === 'card') {
        card.id = cardId + '-favoritado';
        icone.classList.remove('fill-none');
        icone.classList.add('fill-laranja-fraco');

        criarToastFavoritado();

    };
    
    if (cardId === 'card-favoritado') {
        card.id = 'card';
        icone.classList.remove('fill-laranja-fraco');
        icone.classList.add('fill-none');

        criarToastRemocaoFavorito();
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

}