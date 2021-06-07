import React, { useContext, useEffect, useState } from "react";
import store from "state";
// Constants
import { verifyData, checkDate } from "./verifyData";
import Dates from "./Dates";
import Rates from "./Rates";
import StarRating from "./Stars";
import {
  create_new_post,
  examplePost,
  isNewPostAllowed,
} from "constants/jobPosts";
import FEEDBACK from "../../constants/feedback";
// Actions
import { setModals } from "../../actions/modals";
import { newJobPost } from "../../actions/noticeboard";
// Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  FormControl,
  InputLabel,
  ListItemText,
  Typography,
  Select,
  Input,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Actions from "./Footer";

import useStyles from "./styles";

const JobPostDialog = () => {
  const classes = useStyles();
  const { state, feedback, dispatch } = useContext(store);
  const { profileData, modals, post_to_edit, noticeboardQuery, user } = state;
  const [post, setPost] = useState(create_new_post(profileData));
  const [stars, setStars] = useState(5);
  const [formErrors, setFormErrors] = useState([]);

  const handleData = (key) => (e) => {
    let check = true;
    if (key === "start" || key === "end") {
      check = checkDate(post, key, e.target.value, feedback);
    }
    if (!check) {
      return;
    }
    setPost({ ...post, [key]: e.target.value });
  };
  const handleNegRates = () => {
    setPost({ ...post, neg: !post.neg });
  };
  const handleSubmit = () => {
    if (!user.emailVerified) {
      feedback(
        FEEDBACK.TYPE.ERROR,
        FEEDBACK.MESSAGE.ONLY_VERIFIED_USERS_CAN_USE_THIS_FEATURE
      );
      return;
    }
    if (!isNewPostAllowed(noticeboardQuery, profileData)) {
      feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_4_POSTS_ALLOWED);
      return;
    }
    if (stars < 2) {
      feedback(
        FEEDBACK.TYPE.WARNING,
        FEEDBACK.MESSAGE.YOU_HAVENT_PROVIDED_ENOUGH_INFORMATION
      );
      return;
    }
    let data = { ...post, stars };
    newJobPost(data, dispatch, feedback);
  };

  useEffect(() => {
    let { errors } = verifyData(post);
    setFormErrors(errors);
    setStars(5 - errors.length);
  }, [post]);

  useEffect(() => {
    if (profileData) {
      setPost(create_new_post(profileData));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !post_to_edit
      ? setPost(create_new_post(profileData))
      : setPost(post_to_edit);
    // eslint-disable-next-line
  }, [post_to_edit]);

  return (
    profileData && (
      <Dialog
        classes={{
          paperScrollPaper: classes.paperScrollPaper,
        }}
        open={modals.JobPostModal}
        onClose={() => setModals(dispatch, "JobPostModal")}
      >
        <DialogTitle>
          <ListItem>
            <ListItemText>
              <Typography
                align="left"
                component="header"
                variant="h5"
              >{`Job post for ${
                profileData && profileData["School name"]
              }`}</Typography>
            </ListItemText>

            <StarRating stars={stars} errors={formErrors} />
          </ListItem>
        </DialogTitle>
        <DialogContent classes={{ root: classes.body }}>
          <div className="row">
            <div className="col-6">
              <ListItemText
                primary={`Contact person`}
                secondary={
                  post["Contact person"] === ""
                    ? "No contact person"
                    : `${post["Contact person"]}`
                }
              />
            </div>

            <div className="col-6">
              <FormControl fullWidth>
                <InputLabel htmlFor="job-type-select">Position Type</InputLabel>
                <Select
                  native
                  name="jobType"
                  id="jobType"
                  value={post.type}
                  input={<Input id="job-type-select" />}
                  onChange={handleData("type")}
                >
                  <option>Part-Time</option>
                  <option>Full-Time</option>
                  <option>Tutoring</option>
                </Select>
              </FormControl>
            </div>
          </div>

          <Dates post={post} handleData={handleData} />
          <Rates
            post={post}
            handleData={handleData}
            handleNegRates={handleNegRates}
            classes={classes}
          />
          <br></br>

          <TextareaAutosize
            classes={{ root: classes.input }}
            value={post.comments}
            rows="5"
            placeholder={examplePost}
            onChange={handleData(`comments`)}
          />
        </DialogContent>

        {formErrors.length === 0 && (
          <Actions handleSubmit={handleSubmit} dispatch={dispatch} />
        )}
      </Dialog>
    )
  );
};

export default JobPostDialog;
