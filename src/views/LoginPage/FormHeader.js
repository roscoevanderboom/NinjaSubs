import React, { useContext } from "react";
// Store
import store from 'state';
import { firebase } from 'constants/firebase/constants';

// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default ({ props }) => {
    const { classes, title } = props;
    const { fb } = useContext(store);

    const handleOAuth = (value) => {
        console.log(value);
        switch (value) {
            case 'google':
                googleSignIn();
                break;
            case 'facebook':
                googleSignIn();
                break;
            default:
                break;
        }

    }
    const facebookSignIn = () => {


    }
    const googleSignIn = () => {
        console.log(firebase);

        // var provider = firebase.auth.GoogleAuthProvider();
        // popUp(provider);
    };
    const popUp = (provider) => {
        fb.auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential);
            // ...
        });
    };

    return (
        <CardHeader color="primary" className={classes.cardHeader}>
            <h3 className={classes.title}>{title}</h3>
            {/* <div className={classes.socialLine}>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('twitter')} >
                    <i className={"fab fa-twitter"} />
                </Button>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('facebook')} >
                    <i className={"fab fa-facebook"} />
                </Button>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('google')} >
                    <i className={"fab fa-google"} />
                </Button>
            </div> */}
        </CardHeader>
    )
}

