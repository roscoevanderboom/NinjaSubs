import React, { useContext, useEffect, useState } from 'react';
// State
import store from 'state';
// module for managing dates
import moment from 'moment';
// @material-ui/core components
import {
    makeStyles, Dialog, DialogTitle, Slide,
    IconButton, DialogContent, DialogActions,
    ListItemText, FormControl,
} from "@material-ui/core";
// @material-ui/icons
import { Close } from "@material-ui/icons";
// core components
import Button from 'components/CustomButtons/Button';
// Styles
import modalStyle from "../modalStyle";
// verify data
import { verifyData } from './verifyData';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const useStyles = makeStyles(modalStyle);

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = useContext(store);
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

    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.paperScrollPaper,
                paperScrollPaper: classes.paperScrollPaper
            }}
            open={state.modals.JobPostModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleModals('JobPostModal', false)}
            aria-labelledby="JobPostModal-title">
            <DialogTitle
                id="JobPostModal-title"
                disableTypography
                className={classes.modalHeader} >
                <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => handleModals('JobPostModal', false)}  >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>Job Post</h4>
            </DialogTitle>
            <DialogContent
                id="JobPostModal-description"
                className={classes.modalBody}  >
                <div className='row'>
                    <div className='col-xs-12 col-sm-8'>
                        <ListItemText
                            primary='Contact person'
                            secondary={'No contact person'} />
                    </div>
                    <div className='col-xs-12 col-sm-4'>
                       <select>
                           <option>Part-time</option>
                           <option>Full-time</option>
                       </select>
                    </div>
                </div>

            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button color="transparent" simple>
                    Confirm
                </Button>
                <Button
                    onClick={() => handleModals('JobPostModal', false)}
                    color="danger"
                    simple >
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    );
}


