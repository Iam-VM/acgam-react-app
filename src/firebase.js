import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
});

// export const user = app.user();
// export const db = app.firestore();
firebase.auth();
firebase.firestore();


export default firebase;
