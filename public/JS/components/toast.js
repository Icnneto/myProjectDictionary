function criarExibirToast(mensagem, funcionalidade, body) {
    let mensagemParaUser = mensagem;

    const addToast = document.createElement('div');
    addToast.classList.add(
        'toast',
        'toast-top',
        'toast-center'
    );

    if (funcionalidade === 'positivo') {
        addToast.innerHTML = `
            <div class="alert font-quicksand text-green-600 border-green-600 bg-branco-fundo">
                <span>${mensagemParaUser}</span>
            </div>
        `
    };

    if (funcionalidade === 'negativo') {
        addToast.innerHTML = `
            <div class="alert font-quicksand text-red-600 border-red-600 bg-branco-fundo">
            <span>${mensagemParaUser}</span>
        </div>
        `
    };

    if (funcionalidade === 'aviso') {
        addToast.innerHTML = `
            <div class="alert font-quicksand text-preto-padrao border-laranja-medio bg-branco-fundo">
            <span>${mensagemParaUser}</span>
        </div>
        `
    };

    body.append(addToast);

    setTimeout(() => {
        addToast.remove();
    }, 2000);
};

export { criarExibirToast }

