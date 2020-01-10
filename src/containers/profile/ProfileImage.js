import React, { useContext } from 'react'

import { GlobalState } from '../../state';
import { noUserImage } from '../../constants';

// Components
import { Tooltip, Avatar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    imgDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)`,
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            background: 'lavender'
        },
        marginBottom: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    avatarImg: {
        width: 100,
        height: 100,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {           
            width: 130,
            height: 130
        },
    }
}));

export default () => {
    const classes = useStyles();
    const { methods, state } = useContext(GlobalState);
    const { handleModals } = methods;
    const { profileData } = state;

    const setImage = () => {
        handleModals('ChangeAvatar')
    }

    return (
        <div className={classes.imgDiv}>
            <Tooltip title="Click to change image" placement="top-start">
                <Avatar
                    className={classes.avatarImg}
                    src={profileData.image === '' ? noUserImage : profileData.image}
                    alt='No Avatar'
                    onClick={setImage} />
            </Tooltip>
        </div>
    )
}