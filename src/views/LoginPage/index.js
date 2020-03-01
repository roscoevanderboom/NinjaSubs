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
// const messaging = firebase.messaging();

// messaging.usePublicVapidKey('BBu6ytYgJcwLX5eTlQfD2SS6kFhWNY4PDPJ40UgVsgOSRG1cUnoaf7M28DFw4N81mGJ8dUDFhQ624ZXJW75QxL8');

// window.addEventListener('load', function() {
//     if('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('/sw.js')
//         .then(function(reg) {
//           // firebase methods，use same sw.js
//           messaging.useServiceWorker(reg);
//         })
//         // fail
//         .catch(function(err) {
//           console.log('error: ', err);
//         });
//     }
  
//     messaging.requestPermission().then(function() {
  
//       // see if there's token in cookie, if no, get token
//       const ckv = document.cookie.replace(/(?:(?:^|.*;\\s*)augustusWsPush\s*\=\s*([^;]*).*$)|^.*$/, "$1") || null;
  
//       // cookies don't exist, request permission with user
//       if(!ckv) {
//         // get token，firebase-messaging-sw.js will store in Service Workers
//         messaging.getToken().then(function(currentToken) {
  
//           // token存至firebase
//           const id = currentToken.split(':')[0];
//           firebase.database().ref('pushUsers/' + id).set({'token': currentToken});
  
//           // token存至cookies
//           document.cookie = "augustusWsPush=" + currentToken;
  
//         });
//       }
//       // cookies exist, get token from cookies then set in firebase
//       else {
//         const id = ckv.split(':')[0];
//         firebase.database().ref('pushUsers/' + id).set({'token': ckv});
//       }
  
//     }).catch(function(err) {
//       console.log('error: ', err);
//     });
//   });

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