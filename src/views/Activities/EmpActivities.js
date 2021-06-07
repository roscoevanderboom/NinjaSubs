import React, { useContext } from "react";
import PropTypes from "prop-types";
// Store
import store from "state";
// Constants
import { create_new_post, isNewPostAllowed } from "../../constants/jobPosts";
import FEEDBACK from "../../constants/feedback";

// Actions
import { setModals } from "../../actions/modals";
import { setPostToEdit, deleteJobPost } from "../../actions/noticeboard";

// reactstrap components
import CustomButton from "components/CustomButtons/Button";
import { Tooltip } from "@material-ui/core";
import { Edit, Close } from "@material-ui/icons";
// Custom components
import Button from "components/CustomButtons/Button";

export const CreatePost = () => {
  const { state, feedback, dispatch } = useContext(store);
  const { profileData, noticeboardQuery, user } = state;
  const createPost = () => {
    if (user === null) {
      return;
    }
    if (!isNewPostAllowed(noticeboardQuery, profileData)) {
      feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_4_POSTS_ALLOWED);
      return;
    }
    setPostToEdit(dispatch, create_new_post(profileData));
    setModals(dispatch, "JobPostModal");
  };
  return (
    <Button color="github" onClick={createPost}>
      Create New Post
    </Button>
  );
};

export const EmployerActions = (props) => {
  const { post } = props;
  const { feedback, dispatch } = useContext(store);

  const editPost = () => {
    setPostToEdit(dispatch, post);
    setModals(dispatch, "JobPostModal");
  };

  const deletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    deleteJobPost(post, feedback);
  };

  return (
    <React.Fragment>
      <span className="me-2">{post.type}</span>
      <Tooltip title="Edit Post" placement="top">
        <CustomButton
          onClick={() => editPost(post)}
          className="p-2"
          color="info"
          size="sm"
        >
          <Edit />
        </CustomButton>
      </Tooltip>
      <Tooltip title="Delete Post" placement="top">
        <CustomButton
          onClick={() => deletePost(post)}
          className="p-2"
          color="danger"
          size="sm"
        >
          <Close />
        </CustomButton>
      </Tooltip>
    </React.Fragment>
  );
};

EmployerActions.propTypes = {
  post: PropTypes.object,
};
