
import React from 'react';
import store from 'state';

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
    const { state, methods, fb, constants } = React.useContext(store);
    const { profileData } = state;
    const { add_if_not_included, remove_from_array, ninjaStar } = constants;
    const { searchInbox, isUserVerfied } = methods;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const like = () => {      
        fb.availableSubs.doc(sub.uid).update({
            likes: add_if_not_included(sub.likes, profileData.uid),
        }).then(() => { setLiked(true) })
    }
    const unlike = () => {
        fb.availableSubs.doc(sub.uid).update({
            likes: remove_from_array(sub.likes, profileData.uid),
        }).then(() => { setLiked(false) })
    }
    const handleLike = () => {
        if (!isUserVerfied()) {
            return;
        }
        if (sub.uid === profileData.uid) {
            return;
        }
        sub.likes.includes(profileData.uid) ? unlike() : like();
    };
    const handleStartChat = () => {
        if (!isUserVerfied()) {
            return;
        }
        searchInbox(sub)
    }

    const showProfilePicture = () => {
        console.log(sub.image)
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