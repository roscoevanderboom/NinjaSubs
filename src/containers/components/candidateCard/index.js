import React, { useContext } from 'react'
import { GlobalState } from '../../../state';

import {
    TextareaAutosize, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Slide
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    img: {
        width: 320,
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            width: 200,
        }
    },
    bio: {
        border: 'none',
        fontSize: '1.25rem',
        padding: '0px 12px',
        width: '100%'
    },
    scrollPapar: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            maxHeight: '96vh',
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    paper: {
        width: '100%',
        margin: 10
    },
    content: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            textAlign: 'center'
        },
    },
    navLink: {
        textDecoration: 'none',
        color: '#3f51b5'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default () => {
    const classes = useStyles();
    const { state, methods } = useContext(GlobalState);
    const { candidate, modals } = state;
    const { handleModals, searchInbox, isUserVerfied } = methods;

    const handleStartChat = () => {
        if (!isUserVerfied()) {
            return;
        }
        searchInbox(candidate)
    }

    return (candidate &&
        <Dialog
            classes={{
                paperScrollPaper: classes.scrollPapar,
                paper: classes.paper
            }}
            open={modals.CandidateDetails}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleModals('CandidateDetails')}
            aria-labelledby="CandidateDetails-title"
            aria-describedby="CandidateDetails-description">
            <DialogTitle id="CandidateDetails-title">{candidate.name}</DialogTitle>

            <DialogContent
                classes={{ root: classes.content }}
                children={
                    <React.Fragment>
                        <img
                            alt={candidate.name}
                            className={classes.img}
                            src={`${candidate.image}`} />
                        <br />
                        <TextareaAutosize
                            rows={5}
                            rowsMax={10}
                            aria-label="candidate bio"
                            value={candidate.bio}
                            className={classes.bio} />
                    </React.Fragment>
                }
            />

            <DialogActions>
                <Button
                    onClick={handleStartChat}
                    variant='outlined'
                    color="primary">
                    Chat
                    </Button>
                <Button
                    variant='outlined'
                    color="primary"
                    onClick={() => handleModals('CandidateDetails')}  >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
