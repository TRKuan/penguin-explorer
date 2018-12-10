import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

var config = {
  apiKey: "AIzaSyD-Ls-1CgkbSnKDA-tik1MhUd-xWd8JHyg",
  authDomain: "module2penguin.firebaseapp.com",
  databaseURL: "https://module2penguin.firebaseio.com",
  projectId: "module2penguin",
  storageBucket: "module2penguin.appspot.com",
  messagingSenderId: "1095574970372"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
db.collection("users").get()
const auth = firebase.auth();
const users = db.collection("users")
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider, users, storage };
