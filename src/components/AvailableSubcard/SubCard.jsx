/*eslint-disable */
import React from 'react';
import GlobalState from '../../state/store';

import {
    Card, CardHeader, CardContent, CardActions,
    Collapse, Avatar, IconButton, Typography, Badge,
    TextareaAutosize
} from '@material-ui/core';

import { Favorite, ExpandMore, ChatBubble } from '@material-ui/icons';

// Styles
import clsx from 'clsx';
import { useStyles } from './styles';

export default ({ sub }) => {
    const { state, methods, fb, constants } = React.useContext(GlobalState);
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
        if (sub.uid === profileData.uid) {
            return;
        }
        sub.likes.includes(profileData.uid) ? unlike() : like();
    };
    const handleStartChat = () => {
        // if (!isUserVerfied()) {
        //     return;
        // }       
        searchInbox(sub)
    }

    const showProfilePicture = () =>{
        console.log(sub.image)
    }

    React.useEffect(() => {
        console.log('TODO -- re-apply restrictions')
        if (sub.likes !== undefined) {
            sub.likes.includes(profileData.uid)
                ? setLiked(true)
                : setLiked(false);
        }
    }, [sub])

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
                title={<h3>{sub.name}</h3>}
                action={
                    <React.Fragment>
                        {sub.rating.map((val, i) =>
                            <Avatar key={i}
                                src={ninjaStar} alt={val} />
                        )}
                    </React.Fragment>
                }
            />

            <CardActions
                className={classes.collapse}
                disableSpacing>
                <Badge
                    classes={{
                        anchorOriginTopRightRectangle: classes.badge
                    }}
                    badgeContent={sub.likes !== undefined ? sub.likes.length : 0}>
                    <IconButton
                        className={liked ? classes.liked : ''}
                        onClick={handleLike}
                        aria-label="like">
                        <Favorite />
                    </IconButton>
                </Badge>

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