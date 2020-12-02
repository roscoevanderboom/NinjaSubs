import React, { useContext, useState, useEffect } from 'react';
// Store
import store from 'state';
// Constants
import { noUserImage } from '../../constants';
// Actions
import { followChat } from '../../actions/privatechat';
import { Avatar } from '@material-ui/core';

import { useStyles } from './styles'

export default ({ chat }) => {
  const classes = useStyles();
  const { state, hist, dispatch } = useContext(store);
  const { profileData, user } = state;

  const [recipient, setRecipient] = useState({ name: '', image: '' });

  const selectChat = () => {
    if (user === null) {
      return;
    }
    followChat(chat.room_id, hist, dispatch);
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
        ? noUserImage
        : recipient.image} alt={`${recipient.name}`} className={classes.avatar} />
      <div className={classes.nameTag}>
        {recipient.name}
      </div>
    </div>);
}
