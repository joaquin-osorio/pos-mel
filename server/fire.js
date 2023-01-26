const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const authDb = db.collection("auth");
const AuthDocRef = authDb.doc("jfYwciYniCtOTZwJZhQk");

const getAuth = () => {
  return AuthDocRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
    }
  });
};

const exampleDb = db.collection('MLA402916')

const addReg = data => {
  const d = new Date();
  exampleDb.doc().set({
    date: d,
    ...data
  })
  .then(() => console.log("Document successfully written EJEMPLO!"))
}


const pushAuth = (data) => {
  AuthDocRef.update({
    ACCESS_TOKEN: data.ACCESS_TOKEN,
    REFRESH_TOKEN: data.REFRESH_TOKEN,
  })
    .then(() => console.log("Document successfully written!"))
    .catch((error) => console.error("Error writing document: ", error));
};

exports.pushAuth = pushAuth;
exports.getAuth = getAuth;
exports.addReg = addReg;
