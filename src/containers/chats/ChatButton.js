import React, { useContext, useState, useEffect } from 'react';

import { GlobalState } from '../../state';

import { noUserImage } from '../../constants';

import { Avatar } from '@material-ui/core';

import { useStyles } from './styles';

export default ({ chat }) => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { profileData } = state;
  const { followChat } = methods;

  const [recipient, setRecipient] = useState({ name: '', image: '' });
  
  const selectChat = () => {
    followChat(chat.id);
  }

  useEffect(() => {
    if (chat) {
      profileData.name === chat.user1_Name
        ? setRecipient({ name: chat.user2_Name, image: chat.user2_Image })
        : setRecipient({ name: chat.user1_Name, image: chat.user1_Image });
    }
  }, [chat, profileData])

  return (
    <div onClick={selectChat} className={classes.contactBtn}>
      <Avatar src={recipient.image === ''
        ? noUserImage
        : recipient.image} alt={`${recipient.name}`} className={classes.avatar} />
      <div className={classes.nameTag}>
        {recipient.name}
      </div>
    </div>);
}
