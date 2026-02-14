// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBH4BOtbsV9h_egQPW249DkU_pqB50FHkU",
    authDomain: "crixblog-55694.firebaseapp.com",
    projectId: "crixblog-55694",
    storageBucket: "crixblog-55694.firebasestorage.app",
    // storageBucket: "crixblog-55694.appspot.com",
    messagingSenderId: "328723471832",
    appId: "1:328723471832:web:cea1d6a17dee1d50c466ad",
    measurementId: "G-0DEJ1PHL5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// google auth

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user
    })
    .catch((err)=>{
        console.log(err);
    })
    return user;
}