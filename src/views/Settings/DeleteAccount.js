import React, { useContext } from 'react';
import store from 'state';

// custom components
import SettingsItem from './SettingsItem';
// Icon
import { Cancel } from '@material-ui/icons';
export default () => {
    const { state, methods } = useContext(store);
    const { profileData, noticeboardQuery } = state;
    const { feedback, deleteUser, isUserSignedIn } = methods;

    const checkActivePosts = () => {
        const posts = noticeboardQuery.filter(post => post.uid === profileData.uid);
        if (posts.length > 0) {
          feedback('error', 'Please delete active posts first.');
          return false;
        }
        return true
      }
      const handleDelete = async () => {
        if (!isUserSignedIn()) {
          return;
        }
        if (profileData.type === 'Employer') {
          if (!checkActivePosts()) {
            return;
          }
        }
        if (window.confirm('Are you sure?')) {
          deleteUser();
        }
      }

    return (
        <SettingsItem
            text='Delete account.'
            icon={<Cancel />}
            onClick={handleDelete} />
    )
}
