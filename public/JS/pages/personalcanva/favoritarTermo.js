const main = document.querySelector('main');
const user = JSON.parse(sessionStorage.getItem('userInfo'));

// Favoritado trocará o valor booleano do DB para true - não trocará o id da div
// function favoritarCard (e) {
//     const icone = e.target;
//     const card = icone.closest('#card') || icone.closest('#card-favoritado');
//     console.log(card)
//     const cardId = card.id;
    
//     if (cardId === 'card') {
//         card.id = cardId + '-favoritado';
//         icone.classList.remove('fill-none');
//         icone.classList.add('fill-laranja-fraco');

//         // enviarDadosBackendInclusao() -> if success chama o criarToastFavoritado()
//         criarToastFavoritado();

//     };
    
//     if (cardId === 'card-favoritado') {
//         card.id = 'card';
//         icone.classList.remove('fill-laranja-fraco');
//         icone.classList.add('fill-none');

//         // enviarDadosBackendExclusao() -> if success chama o criarToastRemocaoFavorito()
//         criarToastRemocaoFavorito();
//     };
// };

function favoritarCard (e) {
    // encontar o elemento pai para poder passar as informações dele para o realtimeDatabase
    // implementar lógica do true e false para preencher o coração
    const card = e.closest('#card') || e.closest('#card-favoritado');
    console.log(e);
    console.log(card);
}

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

export { favoritarCard };