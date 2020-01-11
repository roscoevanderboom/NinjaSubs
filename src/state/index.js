/* eslint-disable */
// Services
import React, { useState, createContext } from 'react';
import { useSnackbar } from 'notistack';

import routes from '../routes'

import * as constants from '../constants';
import * as fb from '../constants/firebase/constants';

// Components
import { createFeedback } from '../containers/components/feedback';

import { useStyles } from '../styles';

// TODO setup push notifications
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('TODO -- setup push notifications');

  } else {
    console.log('Unable to get permission to notify.');
  }
});

export const GlobalState = createContext();

export const GlobalStatePovider = (props) => {
  // *******************************************************
  // ********************* State ***************************
  // *******************************************************
  // Global styles
  const classes = useStyles()
  // Loading / New user / History
  const [history, setHistory] = useState(true);
  const [loading, setLoading] = useState(true);
  // Get user details
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(false);
  const [stars, setStars] = useState([]);
  // Set page title
  const [title, setTitle] = useState('');
  // Get data from DB
  const [noticeboardQuery, setNoticeboardQuery] = useState([]);
  const [activitiesQuery, setActivitiesQuery] = useState([]);
  const [availableSubs, setAvailableSubs] = useState([]);
  const [inbox, setInbox] = useState([]);
  // Create / Edit posts
  const [post_to_edit, set_post_to_edit] = useState(false);
  const [candidate, setCandidate] = useState(false);
  // Chat
  const [selectedChat, setSelectedChat] = useState(false);
  // Modals
  const [modals, setModals] = useState({
    ChangeAvatar: false,
    CreatePost: false,
    CandidateDetails: false,
    UpdateUserInfo: false,
    ChangeEmail: false,
    ChangePassword: false,
    BlockedUsers: false
  });

  // *******************************************************
  // ******************** Methods **************************
  // *******************************************************

  const handleModals = (modal) => {
    setModals({
      ...modals,
      [modal]: modals[modal]
        ? false
        : true
    })
  };
  // Methods for user feedback
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const feedback = (variant, message, action, duration) => {
    createFeedback(variant, message, action, duration, enqueueSnackbar, closeSnackbar);
  };
  // Collect Firebase data / SignIn
  const handleAuthState = () => {
    setLoading(true);
    fb.handleAuthState(setUser, setLoading);
  };
  const handleProfileData = async (uid) => {
    fb.handleProfileData(uid, setProfileData, setLoading)
  };
  const updateProfileData = async (data) => {
    let res = await fb.updateProfileData(user, profileData, data)
    if (res) {
      feedback('success', 'Profile updated')
    }
  };
  const queryNoticeboard = () => {
    fb.queryNoticeboard(profileData.locations, setNoticeboardQuery);
  }
  const queryActivities = () => {
    fb.queryActivities(profileData.uid, setActivitiesQuery);
  }
  const handleAvailableSubs = async () => {
    fb.handleAvailableSubs(profileData, setAvailableSubs);
  }
  const handleInbox = async () => {
    fb.handleInbox(user, setInbox);
  };
  const startChat = (chatee) => {
    let newChat = constants.newChat(profileData, chatee)
    fb.privateChats.doc(`${newChat.id}`).set(newChat)
      .then((doc) => {
        followChat(newChat.id);
        setModals({ ...modals, CandidateDetails: false });
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const searchInbox = (chatee) => {
    if (chatee.uid === profileData.uid) {
      return;
    }
    let res = inbox.filter(chat =>
      chat.participants.includes(chatee.uid) &&
      chat.participants.includes(profileData.uid));
    if (res.length === 1) {
      followChat(res[0].id);
      setModals({ ...modals, CandidateDetails: false });
      return;
    }
    if (!confirm(`Are you sure you want to chat to ${chatee.name}?`)) {
      return;
    }
    startChat(chatee)
  }
  const followChat = async (id) => {
    fb.privateChats.doc(`${id}`).onSnapshot(function (doc) {
      if (doc.exists) {
        setSelectedChat(doc.data());
        history.push('/home/chatroom');
        return;
      }
    })
  }

  // Check user status
  const checkStars = () => {
    let count = [];
    if (profileData.name !== null) {
      count.push('name');
    }
    if (profileData.image !== constants.noUserImage) {
      count.push('image');
    }
    if (profileData.bio !== '') {
      count.push('bio');
    }
    if (user.emailVerified) {
      count.push('verified');
    }
    setStars(count);
  }
  const isUserVerfied = () => {
    let currentUser = fb.auth.currentUser;
    if (!currentUser.emailVerified) {
      feedback('error', 'Unverified users cannot use this feature');
      return false;
    }
    return true
  }

  const state = {
    // User state
    user, profileData, stars,
    // App state
    classes, history, loading,
    title, post_to_edit, candidate,
    selectedChat, modals, inbox,
    noticeboardQuery, activitiesQuery,
    availableSubs,
    // Navigation
    routes
  };

  const methods = {
    // General
    isUserVerfied, setHistory, setTitle,
    setLoading, handleModals, feedback,
    setModals, checkStars,
    // FireBase data methods
    handleAuthState, handleProfileData,
    updateProfileData, queryNoticeboard,
    queryActivities, handleInbox,
    handleAvailableSubs,
    // Chat methods
    followChat, searchInbox, startChat,
    // Methods for employers
    set_post_to_edit, setCandidate
  };

  // Create provider
  return (<GlobalState.Provider value={{
    state, methods, constants, fb
  }}>
    {props.children}
  </GlobalState.Provider>)
}
