// Constants
import { FieldValue } from '../constants/firebase';
import { noticeboard } from '../constants/firebase/collections'
import { newJobApplicationData } from '../constants';
import { setModals } from '../actions/modals';
export const setNoticeboardQuery = (dispatch, data) => {
    dispatch({
        type: 'SET_NOTICEBOARD',
        data: data
    })
};
export const setPostToEdit = (dispatch, data) => {
    dispatch({
        type: 'SET_POST_TO_EDIT',
        data: data
    })
};
export const queryNoticeboard = (dispatch) => {
    noticeboard.onSnapshot(function (querySnapshot) {
        let posts = [];
        querySnapshot.forEach(function (doc) {
            posts.push(doc.data());
        });
        if (posts.length === 0) {
            setNoticeboardQuery(dispatch, [])
            return;
        }
        setNoticeboardQuery(dispatch, posts)
    }, function () {
        setNoticeboardQuery(dispatch, [])
    })
};
const handleFirebase = (key, post, profileData, details) => {
    let data = {};
    const add = {
        candidates: FieldValue.arrayUnion(details),
        candidates_uid: FieldValue.arrayUnion(profileData.uid)
    }
    const remove = {
        candidates: FieldValue.arrayRemove(details),
        candidates_uid: FieldValue.arrayRemove(profileData.uid)
    }

    if (key === 'add') {
        data = add;
    } else if (key === 'remove') {
        data = remove;
    }

    return new Promise((resolve, reject) => {
        noticeboard.doc(`${post.ref}`).update(data)
            .then(() => resolve(true))
            .catch((err) => reject(err.message))
    })
};
export const newJobPost = (post, stars, dispatch, feedback) => {
    noticeboard.doc(`${post.ref}`).set({ ...post, stars: stars })
        .then(() => {
            setModals(dispatch, 'JobPostModal')
        })
        .catch(err => { feedback('error', err.message) })
};
export const applyToJobPost = (post, profileData, feedback) => {
    let details = newJobApplicationData(profileData);
    handleFirebase('add', post, profileData, details)
        .catch((err) => {
            feedback('error', err.message)
        })
};
export const removeJobApplication = (post, profileData, feedback) => {
    let details = {}
    post.candidates_uid.forEach((uid, index) => {
        if (uid === profileData.uid) {
            details = post.candidates[index]
        }
    });
    handleFirebase('remove', post, profileData, details)
        .catch((err) => {
            feedback('error', err.message)
        })
};
export const deleteJobPost = (post, feedback) => {
    noticeboard.doc(`${post.ref}`).delete()
        .then(() => {
            feedback('success', "Post was delete");
        })
        .catch((err) => {
            feedback('error', err.message);
        })
};

