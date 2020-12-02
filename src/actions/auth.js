
// Constants
import auth from '../constants/firebase/auth';
import { newProfile } from '../constants/userProfiles';
import FEEDBACK from '../constants/feedback';
// Actions
import setLoading from './loading';
import { handleProfileData } from '../actions/user';

export const setUser = (dispatch, user) => {
    dispatch({
        type: "SET_USER",
        data: user
    })
}
export const onAuthStateChanged = (dispatch, hist) => {
    setLoading(dispatch, true);
    auth.onAuthStateChanged(async (user) => {
        if (user === null) {
            setUser(dispatch, user);
            setLoading(dispatch, false);
            hist.push('/login-page');
        } else if (user) {
            setUser(dispatch, user);
            hist.push('/profile-page');
        }
    }, function (error) {
        console.log(error.message);
        setLoading(dispatch, false);
    })
};
export const createUserWithEmailAndPassword = (data, feedback, hist) => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            res.user.sendEmailVerification()
                .then(() => {
                    handleProfileData({
                        action: 'set',
                        user: res.user,
                        data: newProfile(res.user)
                    })
                    hist.push('/createProfile-page');
                })
        })
        .catch(error => {
            feedback('error', error.message)
        })
}
export const signIn = (data, hist, feedback) => {
    auth.signInWithEmailAndPassword(data.email, data.password)
        .then(() => hist.push('/'))
        .catch(err => feedback("error", err.message))
}
export const signOut = (hist) => {
    if (window.confirm('Are you sure you want to leave?')) {
        auth.signOut();
        hist.push('/');
    }
};
export const deleteUser = (user) => {
    return new Promise((resolve, reject) => {
        user.delete()
            .then(() => resolve(true))
            .catch(error => reject(error.message))
    });
}
export const handleVerification = (user, feedback) => {
    user.sendEmailVerification()
        .then(function () {
            feedback(FEEDBACK.TYPE.SUCCESS, FEEDBACK.MESSAGE.EMAIL_SENT)
        }).catch(function (error) {
            feedback('error', error.message)
        });
};