import React, { useContext } from 'react';
import { GlobalState } from '../../../state';

// Components
import {
    Chip, Avatar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    secondaryText: {
        color: 'black'
    },
    chip: {
        marginTop: 10,
        marginRight: 10,
        backgroundColor: 'darkslategray',
        padding: 3,
        color: 'white',
        height: 40
    }
}));

export default ({ label, data, uid }) => {
    const classes = useStyles();
    const { methods, constants } = useContext(GlobalState);
    const { handleModals, setCandidate } = methods;

    const showCandidateDetails = () => {
        if (data) {
            setCandidate(data);
            handleModals('CandidateDetails')
        }
    }

    return (        
        <Chip
            clickable
            className={classes.chip}
            label={label}
            onClick={showCandidateDetails}
            avatar={
                <Avatar
                alt={`${label}`}
                src={data.image === '' ? constants.noUserImage : data.image} />}
        />
    )
}
