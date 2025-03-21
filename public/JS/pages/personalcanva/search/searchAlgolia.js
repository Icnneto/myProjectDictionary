import { criarEAcrescentarCard } from "../../../components/cardTermo.js";

const { liteClient: algoliasearch } = window['algoliasearch/lite'];
const secaoListaTermos = document.querySelector('#lista-termos');
const queryInput = document.querySelector('#search');
const user = JSON.parse(sessionStorage.getItem("userInfo"));
const userId = user.userId;

const response = await fetch('http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/getApiKey');
const data = await response.json();

const searchClient = await algoliasearch(
    data.algoliaId,
    '534d9aa726460c2680275a3a10efec99'
);

async function buscarTermo(query) {
    try {
        const { results } = await searchClient.search([
            {
                indexName: 'cards',
                filters: `userID:${userId}`,
                query: query,
            },
        ]);

       const hits = results[0].hits;
       secaoListaTermos.innerHTML = '';
       hits.forEach(hit => {
        criarEAcrescentarCard(hit.termo, hit.descricao, hit.objectID, hit.favoritado, secaoListaTermos)
       });
       
    } catch (error) {
        console.error('Erro na busca:', error);
    }
};

queryInput.addEventListener('input', async (event) => {
    const query = event.target.value;

    if (query.trim() === '') {
        window.location.reload();
    } else {
        await buscarTermo(query);
    }
});