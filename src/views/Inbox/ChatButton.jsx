import React, { useContext, useState, useEffect } from 'react';

// Store
import store from 'state';

import { Avatar } from '@material-ui/core';

import { useStyles } from './styles'

export default ({ chat }) => {
  const classes = useStyles();
  const { state, setState, fb, constants, hist, methods } = useContext(store);
  const { profileData } = state;
  const { setSelectedChat } = setState;
  const { isUserVerfied } = methods;

  const [recipient, setRecipient] = useState({ name: '', image: '' });

  const selectChat = () => {
    // if (!isUserVerfied()) {
    //   return;
    // }
    fb.followChat(chat.room_id, hist, setSelectedChat);
  }

  useEffect(() => {
    if (chat.user1 !== undefined) {   
      profileData.uid === chat.user1.uid
        ? setRecipient(chat.user2)        
        : setRecipient(chat.user1);
    }
  }, [chat, profileData])

  return (chat.user1 !== undefined &&
    <div onClick={selectChat} className={classes.contactBtn}>
      <Avatar src={recipient.image === ''
        ? constants.noUserImage
        : recipient.image} alt={`${recipient.name}`} className={classes.avatar} />
      <div className={classes.nameTag}>
        {recipient.name}
      </div>
    </div>);
}
