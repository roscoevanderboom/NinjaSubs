import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// Constants
import * as constants from '../../constants';
import * as filters from '../../constants/filters';
import FEEDBACK from '../../constants/feedback';

// Actions
import { setModals } from '../../actions/modals';
import { setPostToEdit, deleteJobPost } from '../../actions/noticeboard';

// reactstrap components
import { Card } from "reactstrap";
import CustomButton from 'components/CustomButtons/Button';
import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";
import {
    Edit, Close
} from "@material-ui/icons";
// Custom components
import PostBody from 'components/NoticeboardCard/PostBody';
import ListHeader from 'components/EmptyListHeader';
import CreatePost from 'components/CustomButtons/Button';

const ActivitiesCard = () => {
    const { state, feedback, dispatch } = useContext(store);
    const { profileData, noticeboardQuery, user } = state;
    const { isNewPostAllowed, newPost } = constants;
    const [list, setList] = useState([])

    const createPost = () => {
        if (user === null) {
            return;
        }
        if (!isNewPostAllowed(noticeboardQuery, profileData)) {
            feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_4_POSTS_ALLOWED);
            return;
        }
        setPostToEdit(dispatch, newPost(profileData));
        setModals(dispatch, 'JobPostModal');
    }
    const editPost = (post) => {
        setPostToEdit(dispatch, post)
        setModals(dispatch, 'JobPostModal');
    }
    const deletePost = (post) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        deleteJobPost(post, feedback);
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
                        color="github"
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
                                        <CustomButton
                                            onClick={() => editPost(post)}
                                            className="p-2"
                                            color="info"
                                            size="sm"   >
                                            <Edit />
                                        </CustomButton>
                                    </Tooltip>
                                    <Tooltip title='Delete Post'
                                        placement='top'>
                                        <CustomButton
                                            onClick={() => deletePost(post)}
                                            className="p-2"
                                            color="danger"
                                            size="sm"   >
                                            <Close />
                                        </CustomButton>
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

