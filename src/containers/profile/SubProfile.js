// 
import React from 'react';
import { GlobalState } from '../../state';

// Components
import {
    Container, Switch, FormControlLabel, Typography, Card,
    Collapse, ListItem, ListItemText, Chip, IconButton,
    TextareaAutosize, Avatar, Tooltip
} from '@material-ui/core';

import { ExpandLess, ExpandMore, Edit } from '@material-ui/icons';

// Custom component
import ProfileImage from './ProfileImage';

import { useStyles } from './styles_sub';

export default () => {
    const classes = useStyles();
    const { state, methods, fb, constants } = React.useContext(GlobalState);
    const { feedback, handleModals, isUserVerfied, updateProfileData } = methods;
    const { Taipei, ninjaStar, newSubBoardListing } = constants;
    const { user, profileData, stars } = state;
    const [collapse, setCollapse] = React.useState(false);
    const [chipsArray, setChipsArray] = React.useState([]);

    const handleCollapse = () => {
        setCollapse(collapse ? false : true)
    }
    const filterChips = () => {
        let newArray = []
        Taipei.forEach((dist, i) => {
            if (profileData.locations.includes(dist)) {
                newArray.push({
                    name: dist,
                    variant: 'outlined',
                    color: 'primary'
                })
                return;
            }
            newArray.push({
                name: dist,
                variant: 'default'
            })
        })
        setChipsArray(newArray);
    }
    const createNewSub = () => {
        fb.substitutes.doc(user.uid)
            .set(newSubBoardListing(profileData, stars))
            .catch((err) => {
                feedback('error', err.message)
                console.log(err)
            })
    }
    const handleAvailable = async () => {       
        // if (!isUserVerfied()) {
        //     return;
        // }
        updateProfileData({ available: profileData.available ? false : true })
        fb.substitutes.doc(user.uid)
            .update(newSubBoardListing(profileData, stars))
            .catch((err) => {
                createNewSub();
                console.log(err);
            })
    }
    const handleLocations = location => () => {
        if (profileData.locations.includes(location)) {
            profileData.locations.splice(profileData.locations.indexOf(location), 1);
            updateProfileData({ locations: profileData.locations })
            return;
        }
        profileData.locations.push(location);
        updateProfileData({ locations: profileData.locations })
    }
    const editBio = () => {
        handleModals('UpdateUserInfo')
    }

    React.useEffect(() => {
        console.log('TODO -- Refactor start data for available sub list')
        console.log('re- apply restrictions')
    }, [])

    React.useEffect(() => {
        if (profileData.locations !== undefined) {
            filterChips()
        }
        // eslint-disable-next-line
    }, [profileData.locations])

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
                        children={profileData.name === null ? 'Unknown ninja' : profileData.name} />

                    <FormControlLabel
                        control={
                            <Switch
                                color='primary'
                                checked={profileData.available}
                                onChange={handleAvailable}
                                value={profileData.available} />
                        }
                        label="Availability" />
                    <Container className={classes.stars}>
                        {stars.map(star =>
                            <Tooltip key={star} title={`${star}`} placement="bottom">
                                <Avatar
                                    src={ninjaStar}
                                    alt='No Avatar' />
                            </Tooltip>
                        )}
                    </Container>
                </Container>
            </Container>
            {/* Body */}
            <Container className={classes.cardBody}>
                <div className={classes.bioheader}>
                    <Typography
                        component='header'
                        variant='h5'
                        children={'About me'} />
                    <IconButton onClick={editBio}>
                        <Edit />
                    </IconButton>
                </div>

                <TextareaAutosize
                    className={classes.textarea}
                    value={profileData.bio} />

                <ListItem
                    className={classes.expand}
                    button
                    onClick={handleCollapse}>
                    <ListItemText
                        primary="Districts" />
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={collapse} >
                    <Container>
                        {chipsArray.map((chip, i) =>
                            <Chip
                                key={i}
                                className={classes.chip}
                                label={chip.name}
                                clickable={true}
                                color={chip.color}
                                onClick={handleLocations(chip.name)}
                                variant={chip.variant} />
                        )}
                    </Container>
                </Collapse>

            </Container>
            {/* Footer */}
        </Card>
    )
}


