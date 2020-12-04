// constants
import { availableSubs } from '../constants/firebase/collections';
import { FieldValue } from '../constants/firebase';

export const setAvailableSubs = (dispatch, data) => {
    dispatch({
        type: "SET_AVAILABLESUBS",
        data: data
    })
};
export const queryAvailableSubs = (dispatch) => {
    availableSubs.where('available', '==', true)
        .onSnapshot((querySnapshot) => {
            let subs = [];
            querySnapshot.forEach(function (doc) {
                subs.push(doc.data());
            });
            setAvailableSubs(dispatch, subs)
        }, function () {
            setAvailableSubs(dispatch, [])
        });
};
export const like = (sub, profileData, setLiked) => {
    availableSubs.doc(sub.uid).update({
        likes: FieldValue.arrayUnion(profileData.uid),
    }).then(() => { setLiked(true) })
};
export const unlike = (sub, profileData, setLiked) => {
    availableSubs.doc(sub.uid).update({
        likes: FieldValue.arrayRemove(profileData.uid),
    }).then(() => { setLiked(false) })
};
export const deleteSubListing = (uid) => {
    availableSubs.doc(uid).delete()
};
export const handleSubProfile = (user, { action, data }) => {
    return new Promise((resolve, reject) => {
        availableSubs.doc(user.uid)[action](data)
            .then(() => resolve(true))
            .catch((err) => reject(err.message))
    })
}