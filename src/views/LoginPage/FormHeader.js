import React, { useContext } from "react";
// Store
import store from 'state';

// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default ({ props }) => {
    const { classes, title } = props;
    const { fb, hist, constants } = useContext(store);
    const firebase_ = fb.firebase.firebase_.apps[0].firebase_;

    const handleOAuth = (value) => {
        console.log(value);
        switch (value) {
            case 'google':
                googleSignIn();
                break;
            case 'facebook':
                facebookSignIn();
                break;
            default:
                break;
        }

    }
    const googleSignIn = () => {
        var provider = new firebase_.auth.GoogleAuthProvider();
        popUp(provider);
    };
    const facebookSignIn = () => {
        var provider = new firebase_.auth.FacebookAuthProvider();
        popUp(provider);
    };
    const popUp = (provider) => {
        fb.auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            let data = constants.newUser(user);
            data = {
                ...data,
                name: user.displayName,
                email: user.email,
                uid: user.uid
            }
            title === 'Register'
                ? fb.createProfileData(user, data)
                : hist.push('profile-page');

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
            <div className={classes.socialLine}>
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
            </div>
        </CardHeader>
    )
}

