import React from 'react';

import { GlobalState } from '../../../../state';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { methods, fb } = React.useContext(GlobalState);
    const { feedback, handleModals, set_post_to_edit, queryActivities } = methods;

    const handleMenu = event => {
        anchorEl === null
            ? setAnchorEl(event.currentTarget)
            : setAnchorEl(null);
    };
    const edit = () => {       
        handleModals('CreatePost');
        set_post_to_edit(data);
    }
    const deletePost = () => {        
        fb.noticeboard.doc(`${data.ref}`).delete()
            .then(() => {
                queryActivities()
                feedback('success', 'Post deleted');
            })
            .catch((err) => {
                feedback('error', err.message);
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
                <MenuItem onClick={edit}>Edit Post</MenuItem>
                <MenuItem onClick={deletePost}>Delete Post</MenuItem>
            </Menu>
        </div>
    )
}
