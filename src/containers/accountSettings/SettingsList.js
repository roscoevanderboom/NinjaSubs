// 
import React from 'react';
// 
// Icons
import {
    DeleteSweep, Drafts, Security,
    SettingsBackupRestore, Face, Cancel,
    VoiceOverOff
} from '@material-ui/icons';

export default [
    {
      text: 'Clear your list of ignored posts',
      icon: <DeleteSweep />
    },
    {
      text: 'Clear your list of blocked users',
      icon: <VoiceOverOff />
    },
    {
      text: 'Change account email',
      icon: <Drafts />
    },
    {
      text: 'Change password',
      icon: <Security />
    },
    {
      text: 'Resend verification email',
      icon: <SettingsBackupRestore />
    },
    {
      text: 'Change account type',
      icon: <Face />
    },
    {
      text: 'Delete account',
      icon: <Cancel />
    },
  ];