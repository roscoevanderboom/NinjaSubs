/*!

*/
import React from 'react';

// Views
import Noticeboard from '../views/noticeboard/Noticeboard';
import AvailableSubs from '../views/availableSubs/AvailableSubs';
import Profile from '../views/profile/Profile';
import Activities from '../views/activities/Activities';
import UserSettings from '../views/settings/index';
import Contacts from '../views/inbox/Contacts';
import ChatRoom from '../views/inbox/ChatArea';

// Icons
import {
  Mail, Notifications, List,
  EmojiPeople, AccountCircle, Settings, ChatBubble
} from '@material-ui/icons';

var routes = [
  {
    path: "/home/chatroom",
    name: "ChatRoom",
    icon: <ChatBubble />,
    component: ChatRoom,
  },
  {
    path: "/home/noticeboard",
    name: "Noticeboard",
    icon: <List />,
    component: Noticeboard,
  },
  {
    path: "/home/availableSubs",
    name: "Available Subs",
    icon: <EmojiPeople />,
    component: AvailableSubs,
  },
  {
    path: "/home/activities",
    name: "Activities",
    icon: <Notifications />,
    component: Activities,
  },
  {
    path: "/home/inbox",
    name: "Inbox",
    icon: <Mail />,
    component: Contacts,
  },
  {
    path: "/home/userProfile",
    name: "User Profile",
    icon: <AccountCircle />,
    component: Profile,
  },
  {
    path: "/home/settings",
    name: "Settings",
    icon: <Settings />,
    component: UserSettings,
  }
];
export default routes;
