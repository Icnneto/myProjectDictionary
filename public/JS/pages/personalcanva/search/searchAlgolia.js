const { liteClient: algoliasearch } = window['algoliasearch/lite'];

const searchClient = await algoliasearch(
    'RD9R3TLDU2',
    '534d9aa726460c2680275a3a10efec99'
);

const search = instantsearch({
    indexName: 'cards',
    searchClient,
});

search.start();

async function teste() {
    try {
        const results = await searchClient.search([
            {
                indexName: 'cards',
                query: 'natal',
            },
        ]);
        console.log(results);
    } catch (error) {
        console.error('Erro na busca:', error);
    }
}

teste();

// Teste funcionou
// Próximos passos:
// 1 - em searchClient - appId tem que ser uma .env
// 2 - filtro usuário
// 3 - buscar a partir da query da search bar
// 4 - mostrar resultados com criação dos cards






