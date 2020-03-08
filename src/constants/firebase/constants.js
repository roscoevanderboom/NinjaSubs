// 
import * as constants from '../';
// App
import Firebase from './index';
export const firebase = Firebase;
// Auth
export const auth = Firebase.auth();
// Firestore DB
export const db = Firebase.firestore();
export const noticeboard = db.collection('noticeboard');
export const availableSubs = db.collection('availableSubs');
export const users = db.collection('users');
export const userNames = db.collection('userNames');
export const privateChats = db.collection('chats');
export const mailbox = db.collection('mailbox');

// File Storage
export const storage = Firebase.storage();
export const storageRef = storage.ref();

// ******************************************************
//  Functions that are called from global state provider
// ******************************************************
export const handleAuthState = (setUser, setLoading, setLoggedIn) => {
    setLoading(true);
    auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser === null) {
            setUser(currentUser);
            setLoggedIn(false)
            setLoading(false);
            return;
        }
        setLoggedIn(true)
        setUser(currentUser);
    }, function (error) {
        console.log(error.message);
    })
};
export const handleProfileData = (uid, setProfileData, setLoading, hist) => {
    users.doc(uid).onSnapshot(function (doc) {
        if (doc.exists && doc.data().type !== undefined) {
            setProfileData(doc.data());
            setLoading(false);
            // hist.push('/profile-page')
            return;
        }
        if (doc.exists && doc.data().type === undefined) {
            setProfileData(doc.data());
            setLoading(false);
            // hist.push('/createProfile-page')
            return;
        }

    }, function (error) {
        console.log(error.message);
        setProfileData(false);
        setLoading(false);
    });
};
export const updateProfileData = (user, data) => {
    if (user === null) {
        console.log('fail')
        return;
    }
    return new Promise((resolve, reject) => {
        users.doc(user.uid).update(data).then(() => {
            resolve(true);
        }).catch((err) => {
            console.log(err.message);
            reject(err.message)
        })
    })
};
export const queryNoticeboard = (setNoticeboardQuery) => {
    noticeboard.onSnapshot(function (querySnapshot) {
        let posts = [];
        querySnapshot.forEach(function (doc) {
            posts.push(doc.data());
        });
        if (posts.length === 0) {
            setNoticeboardQuery([])
            return;
        }
        setNoticeboardQuery(posts)
    }, function (error) {
        setNoticeboardQuery([])
        console.log(error.message);
    })
}
export const queryAvailableSubs = (setAvailableSubs) => {
    availableSubs.where('available', '==', true)
        .onSnapshot((querySnapshot) => {
            let subs = [];
            querySnapshot.forEach(function (doc) {
                subs.push(doc.data());
            });
            setAvailableSubs(subs)
        }, function (error) {
            setAvailableSubs([])
            console.log(error.message);
        });
};
export const handleInbox = (user, setInbox) => {
    if (user === null) {
        return;
    }
    privateChats.where('participants', 'array-contains', `${user.uid}`)
        .onSnapshot((querySnapshot) => {
            let myChats = [];
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    myChats.push(doc.data());
                    return;
                }
            });
            setInbox(myChats);
        }, function (error) {
            setInbox([])
            console.log(error.message);
        })
};
export const startChat = (profileData, chatee, history, setSelectedChat) => {
    let newChat = constants.newChatRoom(profileData, chatee)
    privateChats.doc(`${newChat.room_id}`).set(newChat)
        .then(() => {
            followChat(newChat.room_id, history, setSelectedChat)
        })
        .catch((err) => { console.log(err.message) })
};
export const followChat = async (id, history, setSelectedChat) => {
    privateChats.doc(`${id}`).onSnapshot(function (doc) {
        if (doc.exists) {
            setSelectedChat(doc.data());
            history.push('/chatroom');
            return;
        }
    })
}
export const searchInbox = (inbox, profileData, chatee, history, setSelectedChat, handleModals) => {
    if (chatee.uid === profileData.uid) {
        return;
    }
    let res = inbox.filter(chat =>
        chat.participants.includes(chatee.uid) &&
        chat.participants.includes(profileData.uid));
    if (res.length === 1) {
        followChat(res[0].room_id, history, setSelectedChat);
        handleModals('CandidateDetails', false);
        return;
    }
    if (!window.confirm(`Are you sure you want to start a conversation with ${chatee.name}?`)) {
        return;
    }
    startChat(profileData, chatee, history, setSelectedChat)
    handleModals('CandidateDetails', false);
}
export const deleteChatroom = (id, setSelectedChat, hist) => {
    privateChats.doc(`${id}`).delete()
        .then(() => {
            hist.push('/contacts');
            setSelectedChat(false);
        })
        .catch(err => {
            console.log(err.message)
        })
}
export const applyToJobPost = async (post, profileData, feedback) => {
    let details = constants.newJobApplicationData(profileData);
    noticeboard.doc(`${post.ref}`).update({
        candidates: constants.add_if_not_included(post.candidates, details),
        candidates_uid: constants.add_if_not_included(post.candidates_uid, profileData.uid)
    })
        .catch((err) => {
            feedback('error', err.message)
        })
}
export const removeJobApplication = (post, profileData, feedback) => {
    let details = {}
    post.candidates_uid.forEach((uid, index) => {
        if (uid === profileData.uid) {
            details = post.candidates[index]
        }
    });
    noticeboard.doc(`${post.ref}`).update({
        candidates: constants.remove_from_array(post.candidates, details),
        // candidates_uid: constants.remove_from_array(post.candidates_uid, profileData.uid)
        candidates_uid: post.candidates_uid.filter(uid => uid !== profileData.uid)
    })
        .catch((err) => {
            feedback('error', err.message)
        })
}
export const deleteUser = async (user, profileData, feedback, hist) => {
    if (profileData.type === 'Substitute') {
        await availableSubs.doc(profileData.uid).delete()
            .catch(error => feedback('error', error.message))
    }

    privateChats.where('participants', 'array-contains', `${user.uid}`)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                privateChats.doc(doc.id).delete()
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

    await users.doc(profileData.uid).delete()
        .catch(error => feedback('error', error.message))
    await user.delete()
        .then(() => { hist.push('/') })
        .catch(error => feedback('logout', error.message))
}

// ******************************************************
//      Functions that are called from this module
// ******************************************************

export const handleSignOut = (hist) => {
    if (window.confirm('Are you sure you want to leave?')) {
        auth.signOut();
        hist.push('/');
    }
};
export const handleVerification = (user, feedback) => {
    user.sendEmailVerification()
        .then(function () {
            feedback(FEEDBACK.TYPE.SUCCESS, FEEDBACK.MESSAGE.EMAIL_SENT)
        }).catch(function (error) {
            feedback('error', error.message)
        });
};
export const createProfileData = (user, data) => {
    if (user === null) {
        return;
    }
    return new Promise((resolve, reject) => {
        users.doc(user.uid).set(data)
            .then(() => {
                resolve(true);
            }).catch((err) => {
                console.log(err.message);
                reject(err.message)
            })
    })
};
export const newJobPost = (post, stars, handleModals, feedback) => {
    noticeboard.doc(`${post.ref}`).set({ ...post, stars: stars })
        .then(() => {
            handleModals('JobPostModal', false)
        })
        .catch(err => { feedback('error', err.message) })
}
export const deleteJobPost = (post, feedback) => {
    noticeboard.doc(`${post.ref}`).delete()
        .then(() => {
            feedback(FEEDBACK.TYPE.SUCCESS, FEEDBACK.MESSAGE.POST_DELETED);
        })
        .catch((err) => {
            feedback('error', err.message);
        })
}
export const followDoc = (collection, id, setState) => {
    collection.doc(id).onSnapshot(function (doc) {
        if (doc.exists) {
            setState(doc.data());
            return;
        }
    })
}
export const unfollowDoc = (collection, id) => {
    collection.doc(id).onSnapshot(function () {
        return;
    })
}