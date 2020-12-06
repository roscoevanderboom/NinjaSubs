// Constants
import { FieldValue } from '../constants/firebase';
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
    }, function () {
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

export const handleLocations = (user, profileData, location) => () => {
    users.doc(user.uid).update({
        locations: profileData.locations.includes(location)
            ? FieldValue.arrayRemove(location)
            : FieldValue.arrayUnion(location)
    })
}