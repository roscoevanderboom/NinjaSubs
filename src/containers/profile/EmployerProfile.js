// 
import React from 'react';

import { GlobalState } from '../../state';

// Components
import {
    Container, Typography, Card, ListItem,
    ListItemText, IconButton
} from '@material-ui/core';

import { Edit } from '@material-ui/icons'
// Custom component
import ProfileImage from './ProfileImage'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
    },
    userinfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            background: 'lavender'
        }
    },
    profileHeader: {
        padding: '0px 20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardBody: {
        padding: 0,
        margin: 0,
    },
}));

export default () => {
    const classes = useStyles();
    const { state, methods } = React.useContext(GlobalState);
    const { profileData } = state;
    const { handleModals } = methods;

    const editProfile = () => {
        handleModals('UpdateUserInfo')
    }

    React.useEffect(()=>{
        console.log('TODO -- Refactor Employer profile')
    },[])

    return (profileData.type !== undefined &&
        <Card
            square={true}
            className={classes.card}>
            {/* Header */}
            <Container className={classes.header}>
                <ProfileImage />
                <Container
                    className={classes.userinfo}>
                    <Typography
                        component='header'
                        variant='h5'
                        children={`${profileData.name}`} />
                    <Typography
                        component='header'
                        variant='body1'
                        children={profileData.contact === '' ? 'No contact person' : profileData.contact} />

                </Container>
            </Container>
            {/* Body */}
            <Container className={classes.cardBody}>
                <ListItem className={classes.profileHeader}>
                    <Typography
                        component='header'
                        variant='h5'
                        children={`Profile Details`} />
                    <IconButton onClick={editProfile}>
                        <Edit />
                    </IconButton>
                </ListItem>

                <ListItem >
                    <ListItemText
                        primary={'District'}
                        secondary={profileData.location === '' ? 'No location' : profileData.location} />
                </ListItem>

                <ListItem >
                    <ListItemText
                        primary={'Email'}
                        secondary={profileData.email === '' ? 'No email' : profileData.email} />
                </ListItem>
                
                {profileData.address === '' ? null :
                    <ListItem>
                        <ListItemText
                            primary={'Address'}
                            secondary={profileData.address === '' ? 'No address' : profileData.address} />
                    </ListItem>
                }
                {profileData.phone === '' ? null :
                    <ListItem>
                        <ListItemText
                            primary={'Phone'}
                            secondary={profileData.phone === '' ? 'No address' : profileData.phone} />
                    </ListItem>
                }
            </Container>
            {/* Footer */}
        </Card>
    )
}




