import React, { useContext, useState, useEffect } from 'react';
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui Components
import {
    Dialog, DialogTitle, DialogContent, Tooltip
} from '@material-ui/core';
// Core components
import Button from "components/CustomButtons/Button.js";
// Styles
import { primaryColor } from "assets/jss/material-kit-react";
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
        maxWidth: 160,
        marginBottom: 20,
        borderRadius: 6
    },
    cameraIcon: {
        cursor: 'pointer',
        fontSize: '1.2em',
        color: primaryColor
    },
    paperWidthSm: {
        margin: 5
    }
}));


export default () => {
    const classes = useStyles()
    const { state, methods, fb, constants, setState } = useContext(store);
    const { setLoading } = setState;
    const { profileData, user } = state;
    const { feedback, updateProfileData } = methods;
    const [url, setUrl] = useState('');
    const [open, setOpen] = useState(false);

    const cameraIcon = classNames(
        classes.cameraIcon,
        'fas fa-camera-retro',
    )
    const handleModal = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const handleSubmit = () => {
        user.updateProfile({
            photoURL: url
        })
            .then((res) => {
                updateProfileData({ image: url });
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleFileSelect = (e) => {
        setLoading(true);
        var imagesRef = fb.storageRef.child(`${profileData.uid}/temp`);

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
                setLoading(false);
            })
    }

    useEffect(() => {
        if (profileData.image !== undefined) {
            setUrl(profileData.image)
        }
    }, [profileData, user])

    return (
        <React.Fragment>
            <Tooltip
                placement='right'
                title='Change Profile Image'>
                <Button justIcon link
                    onClick={handleModal}>
                    <i className={cameraIcon} />
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleModal}
                classes={{
                    paperWidthSm: classes.paperWidthSm
                }}>
                <DialogTitle children={'Change avatar image'} />
                <DialogContent
                    className={classes.dialogContent}>
                    <img
                        className={classes.avatar}
                        src={url === '' ? constants.noUserImage : url}
                        alt='avatar' />
                    <div className='d-flex justify-content-center'>
                        <input
                            type='file'
                            accept="image/*"
                            className='d-flex justify-content-center'
                            onChange={handleFileSelect} />
                    </div>

                </DialogContent>
                <div className='d-flex justify-content-around mt-3'>
                    <Button
                        color='info'
                        children={`Submit`}
                        onClick={handleSubmit} />
                    <Button
                        color='danger'
                        children={`Cancel`}
                        onClick={handleModal} />
                </div>
            </Dialog>
        </React.Fragment>
    )
}