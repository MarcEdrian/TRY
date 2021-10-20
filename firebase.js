import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyD8BUHiT2g4RYNuy0kZqyWixHN3bhmqla0",
    authDomain: "newoct20.firebaseapp.com",
    projectId: "newoct20",
    storageBucket: "newoct20.appspot.com",
    messagingSenderId: "369497580848",
    appId: "1:369497580848:web:a7e404b001ee16e5fe14f5"
};
let app;
if (firebase.apps.length === 0) {
app = firebase.initializeApp(firebaseConfig);
} else {
app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };