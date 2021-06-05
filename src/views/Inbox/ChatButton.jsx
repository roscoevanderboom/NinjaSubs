import React, { useContext, useState, useEffect } from 'react';
// Store
import store from 'state';
// Actions
import { followChat } from '../../actions/privatechat';
import { Avatar } from '@material-ui/core';

import { useStyles } from './styles'

export default ({ chat }) => {
  const classes = useStyles();
  const { state, hist, dispatch } = useContext(store);
  const { profileData, user } = state;

  const [otherUser, setOtherUser] = useState(false);

  const selectChat = () => {
    if (user !== null) {
      followChat(chat.room_id, hist, dispatch)
    };
  }

  const src = otherUser ? otherUser.image : "";
  const alt = otherUser && otherUser.name !== undefined ? otherUser.name : otherUser["School name"];
  const text = otherUser && otherUser.name !== undefined ? otherUser.name : otherUser["School name"];

  useEffect(() => {
    if (chat.participants !== undefined) {
      profileData.type === "Employer"
        ? setOtherUser(chat["Substitute"])
        : setOtherUser(chat["Employer"]);
    }
  }, [chat, profileData])

  return (chat.participants !== undefined &&
    <div onClick={selectChat} className={classes.contactBtn}>
      <Avatar src={src} alt={alt} className={classes.avatar} />
      <div className={classes.nameTag}>
        {text}
      </div>
    </div>);
}
