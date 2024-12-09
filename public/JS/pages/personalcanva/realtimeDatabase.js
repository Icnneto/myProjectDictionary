import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
import { app } from "../../firebaseConfig.js";

const db = getDatabase(app);

export function registrarNovoTermo(termo, descricao, uId) {
    const dadosCard = {
        termo: termo,
        descricao: descricao,
        favoritado: false,
    };

    const newTermKey = push(child(ref(db), 'termos/')).key;

    const updates = {};
    updates['/termos/' + newTermKey] = dadosCard;
    updates['/users-termos/' + uId + '/' + newTermKey] = true;

    return update(ref(db), updates);

};

registrarNovoTermo('termo', 'descrição', 'israel1234');

function teste(userId, name, email) {
    const reference = ref(db, 'users-termos/' + userId);

    set(reference, {
        username: name,
        email: email
    })
};

teste('1243', 'israel', 'i@i.com');