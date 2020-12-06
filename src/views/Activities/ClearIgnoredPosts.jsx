import React, { useContext } from 'react';
import store from 'state';
// Actions
import { handleProfileData } from '../../actions/user';
// custom components
import SettingsItem from '../Settings/SettingsItem';
// Icon
import { DeleteSweep } from '@material-ui/icons';
export default () => {

    const { state, feedback } = useContext(store);
    const { profileData, user } = state;

    const clearIgnoreList = () => {
        if (user === null) {
            return;
        }
        handleProfileData({
            action: 'update',
            user: user,
            data: { ignoreList: [] }
        })
            .then(() => {
                feedback('success', 'List cleared')
            })
            .catch((err) => {
                feedback('error', err)
            })
    }

    return (
        <SettingsItem
            text={`Clear your list of ignored posts. ${profileData.ignoreList.length} post(s) ignored.`}
            icon={<DeleteSweep />}
            onClick={clearIgnoreList} />
    )
}
