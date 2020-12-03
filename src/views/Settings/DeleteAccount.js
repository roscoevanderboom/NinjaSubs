import React, { useContext } from 'react';
import store from 'state';
// 
// Actions
import { deleteUser } from '../../actions/auth';
import { handleProfileData } from '../../actions/user';
import { deleteAllChatrooms } from '../../actions/privatechat';
import { deleteSubListing } from '../../actions/availableSubs';
// custom components
import SettingsItem from './SettingsItem';
// Icon
import { Cancel } from '@material-ui/icons';
export default () => {
  const { state, feedback, hist } = useContext(store);
  const { profileData, noticeboardQuery, user } = state;

  const checkActivePosts = () => {
    const posts = noticeboardQuery.filter(post => post.uid === profileData.uid);
    if (posts.length > 0) {
      feedback('error', 'Please delete active posts first.');
      return false;
    }
    return true
  }

  const handleDelete = async () => {
    if (user === null) {
      return;
    }
    if (profileData.type === 'Employer') {
      if (!checkActivePosts()) {
        return;
      }
    }
    if (window.confirm('Are you sure?')) {
      if (profileData.type === 'Substitute') {
        deleteSubListing(user.uid);
      }
      deleteAllChatrooms(user);
      handleProfileData({ action: 'delete', user })
        .then(() => {
          deleteUser(user)
            .then(() => hist.push("/login-page"))
            .catch((err) => feedback('error', err))
        })
        .catch((err) => feedback('error', err))
    }
  }

  return (
    <SettingsItem
      text='Delete account.'
      icon={<Cancel />}
      onClick={handleDelete} />
  )
}
