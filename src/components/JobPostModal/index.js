
import React, { useContext, useEffect, useState } from 'react';
import GlobalState from 'state';
import moment from 'moment';
// Constants
import { verifyData } from './verifyData';
import Dates from './Dates';
import Rates from './Rates';
import StarRating from './Stars';
import * as constants from '../../constants';
import FEEDBACK from '../../constants/feedback';
// Actions
import { setModals } from '../../actions/modals';
import { newJobPost } from '../../actions/noticeboard';
// Components
import CustomButton from 'components/CustomButtons/Button';
import {
    Dialog, DialogTitle, DialogContent, ListItem,
    FormControl, InputLabel, ListItemText, DialogActions,
    Typography, Select, Input
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import useStyles from './styles';

export default () => {
    const classes = useStyles();
    const { state, feedback, dispatch } = useContext(GlobalState);
    const { profileData, modals, post_to_edit, noticeboardQuery, user } = state;
    const { examplePost, newPost } = constants;
    const [post, setPost] = useState(newPost(profileData));
    const [stars, setStars] = useState(5);
    const [formErrors, setFormErrors] = useState([]);

    const checkDate = (key, userDate) => {
        let res;
        switch (key) {
            case 'start':
                res = moment(userDate).isSameOrAfter(moment(), 'day');
                if (!res) {
                    feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.DATE_IS_EARLIER_THAN_CURRENT_DATE);
                }
                break;
            default:
                res = moment(userDate).isSameOrAfter(post.start);
                if (!res) {
                    feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.SELECT_A_DATE_LATER_THAN_THE_START_DATE);
                }
                break;
        }
        return res;
    }
    const handleData = key => (e) => {
        let check = true;
        if (key === 'start' || key === 'end') {
            check = checkDate(key, e.target.value)
        }
        if (!check) {
            return;
        }
        setPost({ ...post, [key]: e.target.value })
    }
    const handleNegRates = () => {
        setPost({ ...post, neg: post.neg ? false : true })
    }
    const handleSubmit = () => {
        if (!user.verified) {
            feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_VERIFIED_USERS_CAN_USE_THIS_FEATURE);
            return;
        }
        if (!constants.isNewPostAllowed(noticeboardQuery, profileData)) {
            feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.ONLY_4_POSTS_ALLOWED);
            return;
        }
        if (stars < 2) {
            feedback(FEEDBACK.TYPE.WARNING, FEEDBACK.MESSAGE.YOU_HAVENT_PROVIDED_ENOUGH_INFORMATION);
            return;
        }
        newJobPost(post, stars, dispatch, feedback)
    }

    useEffect(() => {
        let { errors } = verifyData(post);
        setFormErrors(errors);
        setStars(5 - errors.length);
    }, [post])

    useEffect(() => {
        if (profileData) {
            setPost(newPost(profileData))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        !post_to_edit ? setPost(newPost(profileData)) : setPost(post_to_edit);
        // eslint-disable-next-line
    }, [post_to_edit]);

    return (profileData &&
        <Dialog
            classes={{
                paperScrollPaper: classes.paperScrollPaper
            }}
            open={modals.JobPostModal}
            onClose={() => setModals(dispatch, 'JobPostModal')}>
            <DialogTitle
                children={
                    <ListItem>
                        <ListItemText>
                            <Typography
                                align='left'
                                component='header'
                                variant='h5'
                                children="Job post" />
                        </ListItemText>

                        <StarRating stars={stars} errors={formErrors} />
                    </ListItem>
                } />
            <DialogContent
                classes={{ root: classes.body }}>
                <div className='row'>
                    <div className='col-6'>
                        <ListItemText
                            primary={`Contact person`}
                            secondary={post.contact === ''
                                ? 'No contact person'
                                : `${post.contact}`} />
                    </div>

                    <div className='col-6'>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="job-type-select">
                                Position Type
                            </InputLabel>
                            <Select
                                native
                                name="jobType"
                                id="jobType"
                                value={post.type}
                                input={<Input id="job-type-select" />}
                                onChange={handleData('type')}>
                                <option>Part-Time</option>
                                <option>Full-Time</option>
                                <option>Tutoring</option>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <Dates
                    post={post}
                    handleData={handleData} />
                <Rates
                    post={post}
                    handleData={handleData}
                    handleNegRates={handleNegRates}
                    classes={classes} />
                <br></br>

                <TextareaAutosize
                    classes={{ root: classes.input }}
                    value={post.comments}
                    rows='5'
                    placeholder={examplePost}
                    onChange={handleData(`comments`)} />
            </DialogContent>

            <DialogActions
                classes={{
                    root: classes.footer
                }}
                children={
                    <React.Fragment>
                        <CustomButton
                            size='sm'
                            color='github'
                            children={`Submit`}
                            onClick={handleSubmit} />
                        <CustomButton
                            size='sm'
                            color='danger'
                            children={`Cancel`}
                            onClick={() => setModals(dispatch, 'JobPostModal')} />
                    </React.Fragment>
                } />
        </Dialog>
    )
}
