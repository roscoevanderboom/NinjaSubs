import React from 'react';
import store from 'state';
// Constants
import * as constants from '../../constants';
// Actions
import { like, unlike } from '../../actions/availableSubs';
import { searchInbox } from '../../actions/privatechat';
import { setModals } from 'actions/modals';
// Components
import {
    Card, CardHeader, CardContent, CardActions,
    Collapse, Avatar, IconButton, Typography, Badge
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SubCardMenu from './Menu'

import { Favorite, ExpandMore, ChatBubble } from '@material-ui/icons';

// Styles
import clsx from 'clsx';
import { useStyles } from './styles';

export default ({ sub }) => {
    const { state, hist, dispatch } = React.useContext(store);
    const { profileData, user, inbox } = state;
    const { ninjaStar } = constants;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () => {
        if (user === null) {
            return;
        }
        if (sub.uid === profileData.uid) {
            return;
        }
        sub.likes.includes(profileData.uid)
            ? unlike(sub, profileData, setLiked)
            : like(sub, profileData, setLiked);
    };
    const handleStartChat = () => {
        if (user === null) {
            return;
        }
        searchInbox(inbox, profileData, sub, hist, dispatch)
    }

    const showProfilePicture = () => {
        dispatch({
            type: 'SET_CURRENTSUB',
            data: sub
        })
        setModals(dispatch, 'ImageModal');
    }

    React.useEffect(() => {
        if (sub.likes !== undefined) {
            sub.likes.includes(profileData.uid)
                ? setLiked(true)
                : setLiked(false);
        }
    }, [sub, profileData.uid])

    return (sub.rating !== undefined &&
        <Card className={classes.card}>
            <CardHeader
                classes={{ action: classes.action }}
                className={classes.header}
                avatar={
                    <Avatar
                        onClick={showProfilePicture}
                        className={classes.avatar}
                        src={`${sub.image}`} alt='avatar image' />}
                title={
                    <Typography component='header' variant='h6'>
                        {sub.name}
                    </Typography>}
                action={
                    <SubCardMenu sub={sub} />
                }
            />

            <CardActions
                disableSpacing
                className={classes.collapse} >
                <IconButton
                    onClick={handleLike}
                    aria-label="like">
                    <Badge
                        badgeContent={sub.likes !== undefined ? sub.likes.length : 0}>
                        <Favorite className={liked ? classes.liked : classes.iconBtn} />
                    </Badge>
                </IconButton>

                <IconButton>
                    <Badge badgeContent={sub.rating.length}>
                        <img src={ninjaStar} className={classes.iconBtn} alt='ninjaStar' />
                    </Badge>
                </IconButton>

                <IconButton
                    onClick={handleStartChat}
                    aria-label="chat">
                    <ChatBubble />
                </IconButton>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more" >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography
                        component='header'
                        variant='h6'>
                        About me:
                        </Typography>
                    <TextareaAutosize className={classes.textArea}
                        value={sub.bio} />
                </CardContent>
            </Collapse>
        </Card>
    );
}