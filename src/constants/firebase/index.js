

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let credentials = {
    apiKey: "AIzaSyBd0MJSCCN1nUdzYoCpzYopaU9uCaet-AA",
    authDomain: "ninjasubs-taipei.firebaseapp.com",
    databaseURL: "https://ninjasubs-taipei.firebaseio.com",
    projectId: "ninjasubs-taipei",
    storageBucket: "ninjasubs-taipei.appspot.com",
    messagingSenderId: "504240713231",
    appId: "1:504240713231:web:60f91e943b7bcf79f77d7a",
    measurementId: "G-KEX87QTP3Z"
}

export default app.initializeApp(credentials)