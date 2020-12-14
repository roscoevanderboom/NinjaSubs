// constants
import { availableSubs } from '../constants/firebase/collections';
import { FieldValue } from '../constants/firebase';
import { subBoardListing } from "../constants"
// Actions
import { handleProfileData } from "./user";

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
export const handleSubProfile = (uid, { action, data }) => {
    return new Promise((resolve, reject) => {
        availableSubs.doc(uid)[action](data)
            .then(() => resolve(true))
            .catch((err) => reject(err.message))
    })
}
export const createNewSub = (profileData) => {
    handleSubProfile(profileData.uid, {
        action: 'set',
        data: subBoardListing(profileData)
    })
};
export const handleAvailable = async (profileData, user, feedback) => {
    if (user === null) {
        return;
    }
    if (profileData.name === '') {
        feedback('error', 'Please give yourself a display name and click update.');
        return;
    }
    const availability = { available: !profileData.available };
    await handleProfileData({
        action: 'update',
        user,
        data: availability
    })
    handleSubProfile(profileData.uid, {
        action: 'update',
        data: availability
    })
};