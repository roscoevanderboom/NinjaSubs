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

import React, { useContext, useEffect } from "react";
import GlobalState from '../../state/store';

// reactstrap components
import { Card, Button } from "reactstrap";

import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";
import {
    Edit, Close
} from "@material-ui/icons";

import CreatePost from '@material-ui/core/Button';
import PostBody from '../../components/NoticeboardCard/PostBody';

const ActivitiesCard = () => {
    const { state, methods, constants, setState, fb, filters } = useContext(GlobalState);
    const { profileData, noticeboardQuery, searchList } = state;
    const { handleModals, feedback } = methods;

    const createPost = () => {
        if (!constants.isNewPostAllowed(noticeboardQuery, profileData)) {
            feedback('error', 'Only 4 posts allowed');
            return;
        }
        setState.set_post_to_edit(constants.newPost(profileData));
        handleModals('CreatePost', true);
    }
    const editPost = (post) => {
        setState.set_post_to_edit(post)
        handleModals('CreatePost', true)
    }
    const deletePost = (post) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        fb.deleteJobPost(post, feedback);
    }

    useEffect(() => {
        if (noticeboardQuery) {
            setState.setCurrentList(filters.filterEmpActivities(noticeboardQuery, profileData));
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
            {searchList.length > 0 ? null :
                <span className="text-muted mt-3">
                    <small>No activities</small>
                </span>}

            <ul className="list-unstyled col-xs-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 m-0 p-0 text-dark">
                {searchList.map((post, i) =>
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
            </ul>
        </React.Fragment >
    );
}

export default ActivitiesCard;

