import React, { useContext } from "react";
// Store
import store from 'state';

// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default ({ props }) => {
    const { classes, title, data } = props;
    const { fb, hist, methods } = useContext(store);
    const firebase_ = fb.firebase.firebase_.apps[0].firebase_;

    const popUp = (provider) => {
        if (title === 'Register' && !data.terms) {
            methods.feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PLEASE_ACCEPT_TERMS_AND_CONDITIONS);
            return;
        }
        fb.auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;
            let data = {
                name: user.displayName,
                email: user.email,
                uid: user.uid
            }
            fb.users.doc(user.uid).update(data)
                .then(() => {
                    hist.push('/profile-page');
                })
                .catch((err) => {
                    fb.createProfileData(user, data);
                    hist.push('/createProfile-page');
                })

        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;

            var errorMessage = error.message;
            methods.feedback('error',errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential);
            // ...
        });
    };
    const googleSignIn = () => {
        var provider = new firebase_.auth.GoogleAuthProvider();
        popUp(provider);
    };
    const facebookSignIn = () => {
        var provider = new firebase_.auth.FacebookAuthProvider();
        popUp(provider);
    };

    return (
        <CardHeader color="primary" className={classes.cardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.socialLine}>
                <Button
                    justIcon
                    color="transparent"
                    onClick={googleSignIn} >
                    <i className={"fab fa-google"} />
                </Button>
                <Button
                    justIcon
                    color="transparent"
                    onClick={facebookSignIn} >
                    <i className={"fab fa-facebook"} />
                </Button>
            </div>
        </CardHeader>
    )
}

