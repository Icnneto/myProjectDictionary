import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
import { app } from "../../firebaseConfig.js";

const db = getDatabase(app);

function registrarNovoTermo(listaInputs, uId) {
    const dadosCard = {
        termo: listaInputs.termo,
        descricao: listaInputs.descricao,
        favoritado: false,
    };

    const newTermKey = push(child(ref(db), 'termos/')).key;

    const updates = {};
    updates['/termos/' + newTermKey] = dadosCard;
    updates['/users-termos/' + uId + '/' + newTermKey] = true;

    return update(ref(db), updates);

};

export { registrarNovoTermo };