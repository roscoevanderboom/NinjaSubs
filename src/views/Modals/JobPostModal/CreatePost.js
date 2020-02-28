/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import GlobalState from 'state';
import moment from 'moment';

import { verifyData } from './verifyData';

// import { Col, Row, Label,Input } from 'reactstrap';

// Components
import {
    Dialog, DialogTitle, DialogContent,
    Button, ListItem, FormControl, InputLabel,
    ListItemText, DialogActions, Typography,
    Select, Input
} from '@material-ui/core';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Dates from './Dates';
import Rates from './Rates';
import StarRating from './Stars';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    input: {
        width: '50%',
    },
    body: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        overflow: 'scroll',

    },
    paperScrollPaper: {
        [theme.breakpoints.down('md')]: {
            margin: 0,
            maxHeight: '95%'
        },
        display: 'block',
        width: '100%',
        maxWidth: 600
    },
    footer: {
        justifyContent: 'space-evenly'
    },
    editBtn: {
        minWidth: 20,
        padding: '4px 8px',
        marginLeft: 5
    }
}));

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = useContext(GlobalState);
    const { profileData, modals, post_to_edit, noticeboardQuery } = state;
    const { handleModals, feedback, isUserVerfied, queryNoticeboard } = methods;
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
                    feedback('error', 'Date is earlier than current date');
                }
                break;
            default:
                res = moment(userDate).isSameOrAfter(post.start);
                if (!res) {
                    feedback('error', 'Select a date later than the start date');
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
        setPost({ ...post, neg: post.Neg ? false : true })
    }
    const handleSubmit = () => {
        if (!constants.isNewPostAllowed(noticeboardQuery, profileData)) {
            feedback('error', 'Only 4 posts allowed');
            return;
        }
        if (stars < 2) {
            feedback('warning', `You haven't provided enough information.`);
            return;
        }
        fb.newJobPost(post, stars, handleModals, feedback)
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
    }, [])

    useEffect(() => {
        !post_to_edit ? setPost(newPost(profileData)) : setPost(post_to_edit);
    }, [post_to_edit]);

    return (profileData &&
        <Dialog
            classes={{
                paperScrollPaper: classes.paperScrollPaper
            }}
            open={modals.JobPostModal}
            onClose={() => handleModals('JobPostModal', false)}>
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
                            <InputLabel  htmlFor="job-type-select">
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
                        <Button
                            classes={{ root: classes.btn }}
                            children={`Submit`}
                            onClick={handleSubmit} />
                        <Button
                            classes={{ root: classes.btn }}
                            children={`Cancel`}
                            onClick={() => handleModals('JobPostModal', false)} />
                    </React.Fragment>
                } />
        </Dialog>
    )
}
