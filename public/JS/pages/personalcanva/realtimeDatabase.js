import { getDatabase, ref, child, push, update, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
import { app } from "../../firebaseConfig.js";
import { criarEAcrescentarCard } from "./formCard.js"
const user = JSON.parse(sessionStorage.getItem('userInfo'));
const userId = user.userId;
const db = getDatabase(app);

const databaseRef = ref(db, `users-termos/${userId}`);

// onValue(databaseRef, async (snapshot) => {
//     const dataTermosUser = snapshot.val();
//     const termos = await resgatarTermoNoDatabase(dataTermosUser);
//     resgatarDadosEAtualizarPagina(termos);
// }, {
//     onlyOnce: true
// });

onChildAdded(databaseRef, async (snapshot) => {
    const termoKey = snapshot.key;
    const dbTermos = ref(db, `termos/${termoKey}`);
    onValue(dbTermos, async (snapshot) => {
        criarEAcrescentarCard(snapshot.val().termo, snapshot.val().descricao, termoKey);
    }, {
        onlyOnce: true
    })
})

// function resgatarTermoNoDatabase(data) {
//     return new Promise ((resolve) => {
//         let listaTermos = [];

//         const promises = Object.keys(data).map(key => {
//             return new Promise (resolve => {
//                 const termoDatabaseRef = ref(db, `termos/${key}`);
//                 onValue(termoDatabaseRef, (snapshot) => {
//                     const termo = snapshot.val()
//                     listaTermos.push({key, termo});
//                     resolve();
//                 });
//             });
//         });

//         Promise.all(promises).then(() => {
//             resolve(listaTermos)
//         });
//     }); 
// };

function resgatarDadosEAtualizarPagina(termosUser) {
    Object.values(termosUser).forEach(entry => {
        const { key, termo } = entry;
        criarEAcrescentarCard(termo.termo, termo.descricao, key);
    });
}

function registrarNovoTermo(listaInputs, uId) {
    const dadosCard = {
        termo: listaInputs.termo,
        descricao: listaInputs.descricao,
        favoritado: false,
    };

    const newTermKey = push(child(ref(db), 'termos/')).key;

    const updates = {};
    updates['termos/' + newTermKey] = dadosCard;
    updates['users-termos/' + uId + '/' + newTermKey] = true;

    return update(ref(db), updates);
};

export { registrarNovoTermo };