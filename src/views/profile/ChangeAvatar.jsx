import React, { useContext, useState, useEffect } from 'react';
import GlobalState from '../../state/store';

// Components
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Button, Avatar
} from '@material-ui/core';

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
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 20
    }
}));


export default () => {
    const classes = useStyles()
    const { state, methods, fb, constants, setState } = useContext(GlobalState);
    const { setLoading } = setState;
    const { modals, profileData, loading } = state;
    const { handleModals, feedback, updateProfileData } = methods;
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        if (url === '') {
            feedback('error', 'Please provide a new image address');
            return;
        }
        updateProfileData({ image: url });
        handleModals('ChangeAvatar', false)
    }

    const handleFileSelect = (e) => {
        setLoading(true);
        var imagesRef = fb.storageRef.child(profileData.uid);
        imagesRef.put(e.target.files[0])
            .then(function (snapshot) {
                snapshot.ref.getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                        setLoading(false);
                    })
            })
            .catch(error => {
                feedback('error', error.message);
            })
    }

    useEffect(() => {
        if (profileData.image !== undefined) {
            setUrl(profileData.image)
        }
    }, [profileData])

    return (
        <Dialog open={modals.ChangeAvatar} onClose={() => handleModals('ChangeAvatar', false)}>
            <DialogTitle children={'Change avatar image'} />
            <DialogContent
                className={classes.dialogContent}>

                <Avatar
                    className={classes.avatar}
                    sizes='width: 200px height 200px'
                    variant='rounded'
                    src={url === '' ? constants.noUserImage : url}
                    alt='avatar' />
                <input
                    type='file'
                    accept="image/*"
                    onChange={handleFileSelect} />

            </DialogContent>
            <DialogActions children={
                <React.Fragment>
                    <p className='mr-3'>{loading ? 'Loading image...' : ''}</p>
                    <Button children={`Submit`} variant='outlined' onClick={handleSubmit} />
                </React.Fragment>
            } />
        </Dialog>
    )
}