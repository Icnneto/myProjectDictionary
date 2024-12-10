import { getDatabase, ref, set, child, push, update, onValue, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
import { app } from "../../firebaseConfig.js";
const user = JSON.parse(sessionStorage.getItem('userInfo'));
const userId = user.userId;
const db = getDatabase(app);

// acessando cards do usuário no DB e carregando na página
const databaseRef = ref(db, `users-termos/${userId}`);
// encontrei a lista de termos do usuário
onValue(databaseRef, (snapshot) => {
    const dataTermosUser = snapshot.val();
    const termos = resgataTermoNoDatabase(dataTermosUser);
    // termos está voltando com uma array preenchida, contudo não consigo iterar sobre ela
    console.log(termos)
    termos.forEach(termo => console.log(termo.descricao))
})

// consegui resgatar os dados dos termos
function resgataTermoNoDatabase (data) {
    let listaTermos = [];

    Object.keys(data).forEach(key => {
        let termoDatabaseRef = ref(db, `termos/${key}`);
        onValue(termoDatabaseRef, (snapshot) => {
            const termo = snapshot.val()
            listaTermos.push(termo);
        })
    });
    return listaTermos;
};

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