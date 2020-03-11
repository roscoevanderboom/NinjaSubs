import React, { useContext } from 'react';
import GlobalState from 'state';

// custom components
import SettingsItem from './SettingsItem';
// Icon
import { DeleteSweep } from '@material-ui/icons';
export default () => {

    const { methods } = useContext(GlobalState);
    const { feedback, updateProfileData, isUserSignedIn } = methods;

    const clearIgnoreList = () => {
        if (!isUserSignedIn()) {
            return;
        }
        updateProfileData({ ignoreList: [] })
            .then(() => {
                feedback('success', 'List cleared')
            })
            .catch((err) => {
                feedback('error', err)
            })
    }

    return (
        <SettingsItem
            text='Clear your list of ignored posts.'
            icon={<DeleteSweep />}
            onClick={clearIgnoreList} />
    )
}
