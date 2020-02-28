import React, { useContext, useState, useEffect } from 'react';
import store from 'state';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// import firebase from 'constants/firebase';

import firebase from 'constants/firebase';

// let credentials = {
//     apiKey: "AIzaSyBITwvEtuVCOpfe5bFGV-Swo4qt8oOVbFk",
//     authDomain: "ninjasubs-test.firebaseapp.com",
//     databaseURL: "https://ninjasubs-test.firebaseio.com",
//     projectId: "ninjasubs-test",
//     storageBucket: "ninjasubs-test.appspot.com",
//     messagingSenderId: "981066403004",
//     appId: "1:981066403004:web:ba53ac0169e01f915914b9",
//     measurementId: "G-465MW8WWZP"
// }

// firebase.initializeApp(credentials)

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccess: () => false
    }
}

export default () => {
    const { state } = useContext(store);
    

    useEffect(() => {
        console.log(state.user);

    }, [state.user])

    return (
        <div>
            Login page
        </div>
    )
}