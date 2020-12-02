import React, { useContext } from 'react';
import GlobalState from 'state';
// Actions
import { handleVerification as verify } from '../../actions/auth';
// custom components
import SettingsItem from './SettingsItem';
// Icon
import { SettingsBackupRestore } from '@material-ui/icons';

export default () => {

  const { state, feedback } = useContext(GlobalState);
  const { user } = state;

  const handleVerification = () => {
    if (user === null) {
      return;
    }
    if (user.emailVerified) {
      feedback('error', 'Your email is already verified');
      return;
    }
    if (!window.confirm('Resend verification email?')) {
      return;
    }
    verify(user, feedback);
  }

  return (
    <SettingsItem
      text='Resend verification email.'
      icon={<SettingsBackupRestore />}
      onClick={handleVerification} />
  )
}
