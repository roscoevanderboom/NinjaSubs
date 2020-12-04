// Constants
import { privateChats } from '../constants/firebase/collections';
import { newChatRoom, chatPost } from '../constants/chat';
import { FieldValue } from '../constants/firebase';
// Actions
import { setModals } from '../actions/modals';

export const setInbox = (dispatch, chats) => {
    dispatch({
        type: "SET_INBOX",
        data: chats
    });
};
export const setSelectedChat = (dispatch, chat) => {
    dispatch({
        type: "SET_SELECTED_CHAT",
        data: chat
    });
};
export const handleInbox = (user, dispatch) => {
    privateChats.where('participants', 'array-contains', `${user.uid}`)
        .onSnapshot((querySnapshot) => {
            let myChats = [];
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    myChats.push(doc.data());
                    return;
                }
            });
            setInbox(dispatch, myChats)
        }, function () {
            setInbox(dispatch, []);
        });
};
export const deleteChatroom = (id, dispatch, hist) => {
    privateChats.doc(`${id}`).delete()
        .then(() => {
            hist.push('/inbox');
            setSelectedChat(dispatch, false);
        })
        .catch(err => {
            console.log(err.message)
        })
};
export const startChat = (profileData, chatee, history, dispatch) => {
    let newChat = newChatRoom(profileData, chatee)
    privateChats.doc(`${newChat.room_id}`).set(newChat)
        .then(() => {
            followChat(newChat.room_id, history, dispatch)
        })
        .catch((err) => { console.log(err.message) })
};
export const followChat = (id, history, dispatch) => {
    privateChats.doc(`${id}`).onSnapshot(function (doc) {
        if (doc.exists) {
            setSelectedChat(dispatch, doc.data());
            history.push('/chatroom');
        }
    }, () => {
        history.push('/inbox');
    })
};
export const deleteAllChatrooms = (user) => {
    privateChats.where('participants', 'array-contains', `${user.uid}`)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                privateChats.doc(doc.id).delete()
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
};
export const searchInbox = (inbox, profileData, chatee, history, dispatch) => {
    if (chatee.uid === profileData.uid) {
        return;
    }
    let res = inbox.filter(chat =>
        chat.participants.includes(chatee.uid) &&
        chat.participants.includes(profileData.uid));
    if (res.length === 1) {
        followChat(res[0].room_id, history, dispatch);
        setModals(dispatch, 'CandidateDetails');
        return;
    }
    if (!window.confirm(`Are you sure you want to start a conversation with ${chatee.name}?`)) {
        return;
    }
    startChat(profileData, chatee, history, dispatch)
    setModals(dispatch, 'CandidateDetails');
};
export const handleNewChatMessage = (profileData, newPost, selectedChat) => {
    var newChat = chatPost(profileData, newPost, selectedChat);

    return new Promise((resolve, reject) => {
        privateChats.doc(`${selectedChat.room_id}`).update({
            messages: FieldValue.arrayUnion(newChat)
        })
            .then(() => resolve(true))
            .catch((err) => reject(err.message))
    })
};