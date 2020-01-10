import React from 'react';
import { GlobalState } from '../../../state';

// Cmponents
import {
    Card, CardHeader, Avatar
} from '@material-ui/core';

// Custom components
import Candidates from './Candidates';
import CardMenu from './menus';
import JobDetails from './JobDetails'

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        maxWidth: 600,
        marginBottom: 12
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        height: 60,
        width: 60
    },
    header: {
        padding: 8
    },
    collapse: {
        backgroundColor: '#708f905c',
        padding: '5px 12px'
    },
    comments: {
        border: 'none',
        width: '100%'
    },
    candidates: {
        backgroundColor: '#708f905c',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '0px 12px 12px 12px'
    },
}));

export default ({ data }) => {
    const classes = useStyles();
    const { constants, state } = React.useContext(GlobalState);
    const { profileData } = state;

    return (data &&
        <Card className={classes.card}>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar
                        className={classes.avatar}
                        src={`${data.image === '' ? constants.noUserImage : data.image}`} alt='avatar image' />}
                title={<h3>{`${data.school} -- ${data.location}`}</h3>}
                action={<CardMenu data={data} />} />

            <JobDetails data={data} />

            {profileData.type === 'Employer' && data.candidates.length > 0
                ? <Candidates data={data} styles={classes} />
                : null}
        </Card>
    );
}