import React, { useContext, useEffect, useState } from 'react';
import GlobalState from 'state';

// Components
import {
    Dialog, DialogTitle, DialogActions, Button,
    List, ListItem, ListItemText, Avatar, ListItemAvatar
} from '@material-ui/core';
import { Undo } from '@material-ui/icons';
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
}
)

export default () => {
    const classes = styles();
    const { state, methods, constants, filters } = useContext(GlobalState);
    const { modals, profileData, availableSubs } = state;
    const { handleModals, updateProfileData } = methods;
    const [list, setList] = useState([]);

    const unblockUser = uid => () => {
        updateProfileData({
            blackList: constants.remove_from_array(profileData.blackList, uid)
        })
    }
    const handleSubmit = () => {
        updateProfileData({ blackList: [] });
        handleModals('BlockedUsers', false)
    }

    useEffect(() => {
        if (profileData && availableSubs) {
            setList(filters.filterBlockedUsers(availableSubs, profileData));
        }
        // eslint-disable-next-line
    }, [profileData, availableSubs])

    return (profileData &&
        <Dialog
            classes={{ paperScrollPaper: classes.dialog }}
            open={modals.BlockedUsers} onClose={() => handleModals('BlockedUsers', false)}>
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
                        <Button onClick={unblockUser(user.uid)}>
                            <Undo />
                        </Button>
                    </ListItem>
                )}
            </List>
            <DialogActions children={
                <Button children={`Clear list`} variant='outlined' onClick={handleSubmit} />
            } />
        </Dialog >
    )
}
