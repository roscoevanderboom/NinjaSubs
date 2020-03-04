import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// State
import GlobalState from 'state';
// @material-ui/core components
import {
    ListItem, ListItemText, Container, Typography
} from "@material-ui/core";
// custom components
import Candidates from './Candidates';
// Styles
import useStyles from '../styles';

export default () => {
    const { state, methods, setState, filters } = useContext(GlobalState);
    const { filterEmpActivities } = filters;
    const classes = useStyles();
    const [list, setList] = useState([])

    const editPost = (post) => {
        setState.set_post_to_edit(post);
        methods.handleModals('JobPostModal', true)
    }

    const List = () => (
        <React.Fragment>
            {list.map((post, i) =>
                <div key={i}
                    className='d-flex justify-content-between align-items-center'>
                    <ListItem button
                        className={classes.listItem}
                        onClick={() => editPost(post)} >
                        <ListItemText className={classes.listItemText}
                            primary='Start'
                            secondary={post.start} />
                        <ListItemText className={classes.listItemText}
                            primary='End'
                            secondary={post.end} />
                    </ListItem>
                    <Candidates post={post} />
                </div>
            )}
        </React.Fragment>
    )

    const NoPosts = () => (
        <Link to='/activities'>
            <Typography variant='body1' align='center'>
                You don't have any job posts. Click this text to
                go to your "Activities" section and create new job posts.
            </Typography>
        </Link>
    )

    useEffect(() => {
        if (state.noticeboardQuery) {
            setList(filterEmpActivities(state.noticeboardQuery, state.profileData));
        }
        // eslint-disable-next-line
    }, [state.noticeboardQuery, state.profileData])

    return (
        <Container className={classes.activePostsContainer}>
            <Typography
                className={classes.districtTitle}
                align='center'
                variant='h6'>
                Active Posts
            </Typography>
            <Container className='mt-2 mb-3 p-0 w-100'>
                {list.length === 0 ? <NoPosts /> : <List />}
            </Container>
        </Container>

    );
}
