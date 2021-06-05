/*eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
// Store
import store from 'state';
// Actions
import { handleProfileDataArrays } from '../../actions/user';
import { deleteChatroom } from '../../actions/privatechat';
import {
    Toolbar, IconButton, Container,
    Typography, Tooltip
} from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";

import { ChevronLeft, Close, VoiceOverOff } from '@material-ui/icons';

import MessageList from './MessageList';
import Footer from './Footer';
// Styles
import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, hist, dispatch } = useContext(store);
    const { selectedChat, profileData, user } = state;
    const [list, setList] = useState([]);
    const [recipient, setRecipient] = useState({ name: '', image: '' });

    const confirmMessage = `Block ${recipient.name}?\nYou can unblock user from Settings page.`

    const NoChat = () => {
        return (
            <Typography
                className={classes.header}
                variant='h5'
                align='center'
                children={selectedChat ? '' : 'Select a conversation'} />
        )
    }
    const deleteChat = () => {
        if (!selectedChat) {
            return;
        }
        if (!window.confirm(`Delete chatroom?\nChatroom will be deleted for both users.`)) {
            return;
        }
        deleteChatroom(selectedChat.room_id, dispatch, hist);
    }
    const blockUser = () => {
        if (selectedChat && window.confirm(confirmMessage)) {
            let user_to_block = selectedChat.participants.filter(uid => uid !== profileData.uid);
            handleProfileDataArrays(user, "arrayUnion", "blackList", user_to_block[0])
                .then(() => deleteChat())
        }
    }
    const goBack = () => {
        hist.push('/inbox');
    }

    useEffect(() => {
        if (selectedChat) {
            setList(selectedChat.messages)
            profileData.type === "Employer"
                ? setRecipient(selectedChat["Substitute"])
                : setRecipient(selectedChat["Employer"]);
        }
    }, [selectedChat, profileData])

    return (
        <div>
            <Header
                brand="NinjaSubs"
                rightLinks={<HeaderLinks />}
                fixed
                color="dark"
            />
            <div className={classes.body}>
                <div className='d-flex flex-column align-items-center col-12 col-md-8 col-lg-7 col-xl-5 p-0 m-0'>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            onClick={goBack}
                            color="inherit"
                            edge="start" >
                            <ChevronLeft />
                        </IconButton>

                        <Typography variant='h6'
                            className={classes.navlink}
                            children={recipient ? recipient.name : ''} />

                        <div>
                            <Tooltip
                                title='Block user'
                                placement='left'>
                                <IconButton
                                    onClick={blockUser}
                                    color="inherit"
                                    edge="start" >
                                    <VoiceOverOff />
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                color="inherit"
                                aria-label="delete chat"
                                onClick={deleteChat}
                                edge="start" >
                                {<Close />}
                            </IconButton>
                        </div>
                    </Toolbar>
                    <div className={classes.chatArea}>
                        <Container className={classes.textBody}>
                            {selectedChat ? <MessageList list={list} /> : <NoChat />}
                        </Container>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

    );
}