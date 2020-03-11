/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';

// reactstrap components
import { Card, Button } from "reactstrap";

import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";
import {
    Edit, Close
} from "@material-ui/icons";
// Custom components
import PostBody from 'components/NoticeboardCard/PostBody';
import ListHeader from 'components/EmptyListHeader';
import CreatePost from '@material-ui/core/Button';

const ActivitiesCard = () => {
    const { state, methods, constants, setState, fb, filters } = useContext(store);
    const { profileData, noticeboardQuery } = state;
    const { FEEDBACK, isNewPostAllowed, newPost } = constants;
    const { handleModals, feedback, isUserVerfied } = methods;
    const [list, setList] = useState([])

    const createPost = () => {
        if (!isUserVerfied()) {
            return;
        }
        if (!isNewPostAllowed(noticeboardQuery, profileData)) {
            feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_4_POSTS_ALLOWED);
            return;
        }
        setState.set_post_to_edit(newPost(profileData));
        handleModals('JobPostModal', true);
    }
    const editPost = (post) => {
        setState.set_post_to_edit(post)
        handleModals('JobPostModal', true)
    }
    const deletePost = (post) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        fb.deleteJobPost(post, feedback);
    }

    useEffect(() => {
        if (noticeboardQuery) {
            setList(filters.filterEmpActivities(noticeboardQuery, profileData));
        }
        // eslint-disable-next-line
    }, [profileData, noticeboardQuery])

    return (profileData &&
        <React.Fragment>
            <CardHeader
                title={
                    <CreatePost
                        variant='outlined'
                        color="inherit"
                        onClick={createPost}>
                        Create New Post
                    </CreatePost>
                } />
            {list.length > 0 ? null :
                <ListHeader text='No positions created' />
            }

            <React.Fragment>
                {list.map((post, i) =>
                    <Card key={i}
                        className='mt-2'>
                        <CardHeader
                            className='text-dark'
                            avatar={<Avatar src={post.image} alt='avatar' />}
                            title={post.name}
                            subheader={post.location}
                            action={
                                <React.Fragment>
                                    <Tooltip title='Edit Post'
                                        placement='top'>
                                        <Button
                                            onClick={() => editPost(post)}
                                            className="btn-round btn-icon"
                                            color="success"
                                            outline
                                            size="sm"   >
                                            <Edit />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title='Delete Post'
                                        placement='top'>
                                        <Button
                                            onClick={() => deletePost(post)}
                                            className="btn-round btn-icon"
                                            color="danger"
                                            outline
                                            size="sm"   >
                                            <Close />
                                        </Button>
                                    </Tooltip>
                                </React.Fragment>
                            }
                        />
                        <PostBody post={post} />
                    </Card>
                )}
            </React.Fragment>
        </React.Fragment >
    );
}

export default ActivitiesCard;

