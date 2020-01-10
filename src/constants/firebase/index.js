

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

let credentials = {
    apiKey: "AIzaSyAlg4EbIuzn6Uxz-tD9VRCIrr7m6PkjUiI",
    authDomain: "test-781ac.firebaseapp.com",
    databaseURL: "https://test-781ac.firebaseio.com",
    projectId: "test-781ac",
    storageBucket: "test-781ac.appspot.com",
    messagingSenderId: "760785602127",
    appId: "1:760785602127:web:95ee369afd7de699be8c3a"
}

export default app.initializeApp(credentials)