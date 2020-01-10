// 
import React from 'react';
// 
// Main sections
import Noticeboard from '../containers/noticeboard';
import Profile from '../containers/profile';
import Activities from '../containers/activities';
import AvailableSubs from '../containers/availableSubs';
import Contacts from '../containers/chats/Contacts';
import ChatArea from '../containers/chats/ChatArea';
import AccountSettings from '../containers/accountSettings';
import NewUser from '../containers/newUser';
// Icons
import {
    History, ListAlt, AccountBox, ChatBubble,
    EmojiPeople, Settings
} from '@material-ui/icons';

const routes = [    
    {
        name: 'Chatroom',
        path: '/home/chatroom',
        icon: <Settings />,
        component: ChatArea
    },
    {
        name: 'New User',
        path: '/home/newUser',
        icon: <Settings />,
        component: NewUser
    },
    {
        name: 'Noticeboard',
        path: '/home/noticeboard',
        icon: <ListAlt />,
        component: Noticeboard
    },
    {
        name: 'Profile',
        path: '/home/profile',
        icon: <AccountBox />,
        component: Profile
    },
    {
        name: 'AvailableSubs',
        path: '/home/availableSubs',
        icon: <EmojiPeople />,
        component: AvailableSubs
    },
    {
        name: 'Activities',
        path: '/home/activities',
        icon: <History />,
        component: Activities
    },
    {
        name: 'Contacts',
        path: '/home/contacts',
        icon: <ChatBubble />,
        component: Contacts
    },
    {
        name: 'Settings',
        path: '/home/settings',
        icon: <Settings />,
        component: AccountSettings
    }
];

export default routes;
