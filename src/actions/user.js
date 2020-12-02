// Constants
import { users } from '../constants/firebase/collections';
// Actions
import setLoading from '../actions/loading';
export const setProfileData = (dispatch, data) => {
    dispatch({
        type: "SET_PROFILEDATA",
        data: data
    })
}

export const watchProfileData = (user, dispatch, hist) => {
    users.doc(user.uid).onSnapshot(function (doc) {
        if (doc.exists && doc.data().type !== undefined) {
            setProfileData(dispatch, doc.data());
        } else if (doc.exists && doc.data().type === undefined) {
            setProfileData(dispatch, doc.data());
            hist.push('/createProfile-page');
        } else if (!doc.exists) {
            hist.push('/login-page');
        }
        setLoading(dispatch, false);
    }, function (error) {
        console.log(error.message);
        setProfileData(dispatch, false);
        setLoading(dispatch, false);
    });
}

export const handleProfileData = ({ action, user, data }) => {
    return new Promise((resolve, reject) => {
        users.doc(user.uid)[action](data)
            .then(() => {
                resolve(true);
            }).catch((err) => {
                reject(err.message)
            })
    })
}
