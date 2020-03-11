import React, { useContext } from 'react';
import GlobalState from 'state';

// custom components
import SettingsItem from './SettingsItem';
// Icon
import { SettingsBackupRestore } from '@material-ui/icons';
export default () => {

    const { state, methods, fb  } = useContext(GlobalState);
    const { user } = state;
    const { feedback, updateProfileData, isUserSignedIn } = methods;

    const handleVerification = () => {
        if (!isUserSignedIn()) {
            return;
          }
          if (user.emailVerified) {
            feedback('error', 'You are already verified');
            return;
          }
          if (!window.confirm('Resend verification email?')) {
            return;
          }
          fb.handleVerification(user, feedback);
          updateProfileData({ emailSent: true })
    }

    return (
        <SettingsItem
            text='Resend verification email.'
            icon={<SettingsBackupRestore />}
            onClick={handleVerification} />
    )
}
