import React, { useContext, useEffect, useState } from 'react';
import store from 'state';
// Constants
import * as constants from '../../constants';
import * as filters from 'constants/filters';
// Actions
import { handleProfileData } from '../../actions/user';
// Components
import { SubmitBtn } from '../../components/Buttons';
import {
    Dialog, DialogTitle, DialogActions, Button,
    List, ListItem, ListItemText, Avatar, ListItemAvatar
} from '@material-ui/core';
import { Undo, VoiceOverOff } from '@material-ui/icons';
// custom components
import SettingsItem from './SettingsItem';
// Styles
import { makeStyles } from '@material-ui/core';
const styles = makeStyles({
    list: {
        minWidth: 200,
        width: 350
    },
    item: {
        backgroundColor: 'lightgrey'
    },
    dialog: {
        width: '94%',
        margin: 0,
        maxWidth: 350
    }
})

export default () => {
    const classes = styles();
    const { state } = useContext(store);
    const { profileData, availableSubs, user } = state;
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        if (user === null) {
            return;
        }
        setOpen(value);
    }

    const unblock = uid => ({ blackList: constants.remove_from_array(profileData.blackList, uid) });
    const clear = () => ({ blackList: [] })

    const handleList = (key, uid) => {
        handleProfileData({
            action: 'update',
            user,
            data: key === 'unblock' ? unblock(uid) : clear()
        })
    }

    useEffect(() => {
        if (profileData.blackList !== undefined && availableSubs) {
            setList(filters.filterBlockedUsers(availableSubs, profileData));
        }
        // eslint-disable-next-line
    }, [profileData, availableSubs])

    return (profileData &&
        <React.Fragment>
            <SettingsItem
                text='View your list of blocked users.'
                icon={<VoiceOverOff />}
                onClick={() => handleOpen(true)} />
            <Dialog
                classes={{ paperScrollPaper: classes.dialog }}
                open={open} onClose={() => handleOpen(false)}>
                <DialogTitle children={'Blocked users'} />
                <List className={classes.list}>
                    {list.map((user, i) =>
                        <ListItem key={i}
                            className={constants.isEven(i) ? classes.item : null}>
                            <ListItemAvatar>
                                <Avatar src={user.image} alt={user.name} />
                            </ListItemAvatar>
                            <ListItemText>
                                {user.name}
                            </ListItemText>
                            <Button onClick={() => handleList("unblock", user.uid)}>
                                <Undo />
                            </Button>
                        </ListItem>
                    )}
                </List>
                <DialogActions children={
                    <SubmitBtn children={`Clear list`} onClick={handleList} />
                } />
            </Dialog >
        </React.Fragment>
    )
}
