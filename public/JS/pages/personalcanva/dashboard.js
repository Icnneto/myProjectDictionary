const formulario = document.querySelector('[data-form_add-termo]');

// inserir fetch e toda lógica dele
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const listaInputs = {
        'termo': e.target.elements['termo'].value,
        'descricao': e.target.elements['descricao'].value
    };

    console.log(JSON.stringify(listaInputs));
});

