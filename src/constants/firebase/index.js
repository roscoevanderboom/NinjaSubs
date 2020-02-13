

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage';

let credentials = {
    apiKey: "AIzaSyBITwvEtuVCOpfe5bFGV-Swo4qt8oOVbFk",
    authDomain: "ninjasubs-test.firebaseapp.com",
    databaseURL: "https://ninjasubs-test.firebaseio.com",
    projectId: "ninjasubs-test",
    storageBucket: "ninjasubs-test.appspot.com",
    messagingSenderId: "981066403004",
    appId: "1:981066403004:web:ba53ac0169e01f915914b9",
    measurementId: "G-465MW8WWZP"
}

export default app.initializeApp(credentials)