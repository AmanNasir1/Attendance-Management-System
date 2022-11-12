import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxCpLP7vdV4ik1P-c5ok6E6tsArTDACxo",
    authDomain: "smithackathon2022.firebaseapp.com",
    projectId: "smithackathon2022",
    storageBucket: "smithackathon2022.appspot.com",
    messagingSenderId: "267881097366",
    appId: "1:267881097366:web:6a6da309a50244d5607ab7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const login = document.querySelector("#login");
login?.addEventListener("click", () => {
    const email = document.querySelector("#admin-email");
    const password = document.querySelector("#admin-password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("log in")
            window.location = "pages/panel.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})

window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user)
        } else {
            console.log("Sign out")
        }
    });

}

const logOut = document.querySelector("#logout");
logOut?.addEventListener("click",()=>{
    signOut(auth).then(() => {
        console.log("log out")
        window.location = "../index.html"
      }).catch((error) => {
        console.log(error)
      });
      
})

