// 
// App
import Firebase from './index';
// Auth
export const auth = Firebase.auth();
// Firestore DB
export const db = Firebase.firestore();
export const noticeboard = db.collection('noticeboard');
export const substitutes = db.collection('availableSubs');
export const users = db.collection('users');
export const privateChats = db.collection('chats');
// Messaging
export const messaging = Firebase.messaging();
messaging.usePublicVapidKey('BNhEupwDy7M8WKuLNiM14714ipDCYZc0ltzDK3mT03_R-JSCTIbvi-ZEcij7m_4qHbFo6Ib-_pMUzgyb3EbOCrA')
// File Storage
export const storage = Firebase.storage();
export const storageRef = storage.ref();
// ******************************************************
//  Functions that are called from global state provider
// ******************************************************
export const handleAuthState = (setUser, setLoading) => {
    auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser === null) {
            setUser(null);
            setLoading(false);
            return;
        }
        setUser(currentUser);
    });
};
export const handleProfileData = (uid, setProfileData, setLoading) => {
    if (!uid) {
        setProfileData(false);
        setLoading(false);
        return;
    }
    users.doc(uid).onSnapshot(function (doc) {
        if (doc.exists && doc.data().type !== undefined) {
            setProfileData(doc.data());
            setLoading(false);
            return;
        }
        setProfileData(false);
        setLoading(false);
    });
};
export const queryNoticeboard = (locations, setNoticeboardQuery) => {
    if (locations.length !== 0 && locations !== undefined) {
        noticeboard
            .where('location', 'in', locations)
            .get().then((querySnapshot) => {
                let posts = [];
                querySnapshot.forEach(function (doc) {
                    posts.push(doc.data())
                });
                if (posts.length === 0) {
                    console.log('no matches found');
                    setNoticeboardQuery([])
                    return;
                }
                setNoticeboardQuery(posts)
            }).catch(err => {
                console.log(err.message);
            });
    }

};
export const queryActivities = (uid, setActivitiesQuery) => {
    noticeboard
        .where('uid', '==', uid)
        .get().then((querySnapshot) => {
            let posts = [];
            querySnapshot.forEach(function (doc) {
                posts.push(doc.data())
            });
            if (posts.length === 0) {
                setActivitiesQuery([])
                return;
            }
            setActivitiesQuery(posts)
        }).catch(err => {
            console.log(err.message);
        });
};
export const handleAvailableSubs = (profileData, setAvailableSubs) => {
    substitutes.where('available', '==', true).get().then((querySnapshot) => {
        let subs = [];
        querySnapshot.forEach(function (doc) {
            subs.push(doc.data());
        });
        setAvailableSubs(subs)
    }).catch(err => {
        console.log(err.message);
    });
};
export const handleInbox = (user, setInbox) => {
    if (user === null) {
        return;
    }
    privateChats.where('participants', 'array-contains', `${user.uid}`)
        .get().then((querySnapshot) => {
            let myChats = [];
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    myChats.push(doc.data());
                    return;
                }
            });
            setInbox(myChats);
        }).catch(err => {
            setInbox([]);
        })
};
export const updateProfileData = (user, profileData, data) => {   
    if (user === null || !profileData) {
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
// ******************************************************
//      Functions that are called from this module
// ******************************************************
export const handleVerification = (user) => {
    return new Promise((resolve, reject) => {
        if (user.emailVerified) {
            reject('You are already verified')
            return;
        }
        user.sendEmailVerification()
            .then(function () {
                resolve(true)
                updateProfileData(user, { emailSent: true })
            }).catch(function (error) {
                reject(error.message)
            });
    })
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
export const handleSignOut = () => {
    auth.signOut()
};
export const remove_user_from_auth = (user) => {

    return new Promise((resolve, reject) => {
        user.delete().then(() => {
            resolve(true)
        }).catch((err) => {
            reject(err.message)
        })
    })
};
export const remove_user_from_sub_db = (user) => {
    return new Promise((resolve, reject) => {
        substitutes.doc(user.uid).delete().then(() => {
            resolve(true)
        }).catch((err) => {
            reject(err.message)
        })
    })
};
export const remove_user_from_db = (user) => {
    return new Promise((resolve, reject) => {
        users.doc(user.uid).delete().then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.message);
        })
    })
};
