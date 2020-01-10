import React from 'react';

import { GlobalState } from '../../../../state';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { state, methods,fb, constants } = React.useContext(GlobalState);
    const { profileData } = state;
    const { feedback, queryNoticeboard } = methods;

    const handleMenu = event => {
        anchorEl === null
            ? setAnchorEl(event.currentTarget)
            : setAnchorEl(null);
    };

    const remove = () => {
        let details = {}
        data.candidates_uid.forEach((uid, index) => {
            if (uid === profileData.uid) {
                details = data.candidates[index]
            }
        });

        fb.noticeboard.doc(`${data.ref}`).update({
            candidates: constants.remove_from_array(data.candidates, details),
            candidates_uid: constants.remove_from_array(data.candidates_uid, profileData.uid)
        })
            .then(() => {
                feedback('success', 'Removed application');
                queryNoticeboard()
            })
            .catch((err) => {
                feedback('error', err.message)
            })
    }

    return (
        <div>
            <IconButton
                onClick={handleMenu}
                aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenu}  >
                <MenuItem onClick={remove}>Undo Application</MenuItem>
            </Menu>
        </div>
    )
}
