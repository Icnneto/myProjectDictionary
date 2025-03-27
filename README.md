# MyProjectDictionary #

Build a unified dictionary to ensure your team is on the same page. Standardize concepts and prevent project misalignment.

**link**: https://myprojectdictionary-9cb59.web.app/

## 🚀 Technologies ##

- **Frontend**:
  - HTML
  - Tailwind CSS
  - Javascript (vanilla)

- **Backend**:
  - Node.js
  - **Firebase**
     - Authentication: user sign-in
     - Firestore: NoSQL database for storing words and definitions.

- **Extensions**:
  - Algolia: lightning-fast search and indexing.

## Project Usability ##

- **Add/Edit/Delete** terms with definitions
- **Real-time search** powered by Algolia.

## Firebase ##

### 1. Firebase Authentication ###
Implemented secure user login with Google OAuth and Github OAuth

### 2. Firebase Firestore ###
The Firestore structure for storing user terms follows this hierarchy:
```bash
users/{usersId}/termos/{termoId}/
```

- **users**: collection of users.
- **{userId}**: unique ID of the user.
- **termos**: subcollection containing the user's registered terms.
- **{termoId}**: unique ID of the registered term.

Each document inside `termos/{termoId}` contains details about the term, as shown below:

```bash
"termo": string,
"descricao": string,
"favoritado": boolean
```

### 3. Firebase Functions ###
The Cloud Functions in `/functions` handle Firestore data operations and integration with Algolia for search indexing.

#### Initialization ####
The project initializes Firebase Admin SDK and Algolia:

```javascript
  const admin = require('firebase-admin');
  const functions = require('firebase-functions');
  const algoliasearch = require('algoliasearch');
  
  const appId = process.env.ALGOLIA_ID;
  const apiKey = process.env.ALGOLIA_API;
  
  const client = algoliasearch(appId, apiKey);
  const index = client.initIndex('cards');
  
  const serviceAccountKey = 'serviceAccountKey.json';
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://myprojectdictionary-9cb59-default-rtdb.firebaseio.com"
  });
```
#### API Endpoints ####

- **getApiKey**: Returns project environment variables for frontend configuration.
- **editarTermo**: Updates a term in Firestore and synchronizes changes in Algolia.
- **addToIndex**: Indexes a new term in Algolia.
- **changeFavoriteIndex**: Updates the "favoritado" status of a term in Algolia.

#### Note ####
Some Firestore operations are handled directly in the frontend, as Firebase provides built-in security rules to ensure safe data manipulation.

For example, the listener in `public/js/pages/personalcanva/firestore/firestore.js` uses `onSnapshot` to monitor real-time changes in the termos collection.
This allows the UI to update automatically when a term is added, modified, or deleted without requiring a manual refresh.

Additionally, actions like adding, favoriting, and deleting terms are also performed on the frontend, while some operations (such as indexing data in Algolia) are handled via Cloud Functions.

## Algolia ##
The Algolia attributes structure for indexing user terms follows this hierarchy:

```bash
  "objectID": string,
  "termo": string,
  "descricao": string,
  "favoritado": boolean,
  "userID": string,
  "path": string,
  "lastModified": int
```
- `termo` and `descricao` are set as `searchable attributes`, allowing users to search for terms based on their name or description.
- `userID` is configured as a `facet`, enabling filtering of terms by specific users.

### Search ###
The search feature utilizes Algolia’s API to provide fast and efficient lookups of stored terms. 
To ensure that users can only access their own data, the search query applies a **filter on `userID`**.

#### How It Works:  
- When the user types in the search field, the query is sent to Algolia.  
- The results update dynamically, displaying only matching terms.  
- If the search input is cleared, the page reloads to show all terms.  

```javascript
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
            criarEAcrescentarCard(hit.termo, hit.descricao, hit.objectID, hit.favoritado, secaoListaTermos);
        });
    } catch (error) {
        console.error('Search error:', error);
    }
}
```

## Conclusion ##
`MyProjectDictionary` was built with the goal of studying new technologies and learning how to work with Firebase and Algolia.

🔧 The project is in continuous development, and suggestions for improvement are always welcome.

🤝 Feel free to reach out for collaboration — the author is open to connections and happy to chat!

Thanks for checking out the project!
