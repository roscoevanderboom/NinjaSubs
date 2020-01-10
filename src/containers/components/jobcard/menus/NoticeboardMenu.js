import React from 'react';

import { GlobalState } from '../../../../state';
import { add_to_array } from '../../../../constants';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { state, methods, fb } = React.useContext(GlobalState);
    const { profileData } = state;
    const { feedback, queryNoticeboard, isUserVerfied, updateProfileData } = methods;

    const handleMenu = event => {
        anchorEl === null
            ? setAnchorEl(event.currentTarget)
            : setAnchorEl(null);
    };

    const apply = async () => {
        // if (!isUserVerfied()) {
        //     return;
        // }
        const { name, bio, image, history, rating, uid } = profileData;
        if (data.uid === uid) {
            feedback('error', 'You cannot apply to your own post');
            return;
        }
        let details = {
            name: name,
            bio: bio,
            image: image,
            history: history,
            rating: rating,
            uid: uid
        }
        fb.noticeboard.doc(`${data.ref}`).update({
            candidates: add_to_array(data.candidates, details),
            candidates_uid: add_to_array(data.candidates_uid, profileData.uid)
        })
            .then(() => {
                queryNoticeboard()
                feedback('success', 'Applied to post');
            })
            .catch((err) => {
                feedback('error', err.message)
            })
    }
    const ignore = async () => {
        updateProfileData({
            ignoreList: [...profileData.ignoreList, data.ref]
        });
    }

    React.useEffect(() => {
        console.log('re-apply restrictions')
    }, [])

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
                <MenuItem onClick={apply}>Apply to Post</MenuItem>
                <MenuItem onClick={ignore}>Ignore Post</MenuItem>
            </Menu>
        </div>
    )
}
