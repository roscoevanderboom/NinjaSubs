import React, { useContext } from "react";
// Store
import store from 'state';
// Constants
import { newProfile } from '../../constants/userProfiles';
import auth from '../../constants/firebase/auth';
import firebase from '../../constants/firebase'
// Actions
import { handleProfileData } from '../../actions/user';
// Feedback
import FEEDBACK from '../../constants/feedback';
// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default ({ props }) => {
    const { classes, title, data } = props;
    const { hist, feedback } = useContext(store);
    const firebase_ = firebase.firebase_.apps[0].firebase_;

    const popUp = (provider) => {
        if (title === 'Register' && !data.terms) {
            feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PLEASE_ACCEPT_TERMS_AND_CONDITIONS);
            return;
        }
        auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;
            let data = newProfile(user);
            handleProfileData({
                action: 'update',
                user,
                data: data
            })
            .then(() => {
                hist.push('/profile-page');
            })
            .catch((err) => {
                handleProfileData({
                    action: 'set',
                    user,
                    data: data
                })
                .then(() => {
                    hist.push('/createProfile-page');
                })                
            })

        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;

            var errorMessage = error.message;
            feedback(FEEDBACK.TYPE.ERROR, errorMessage);
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

