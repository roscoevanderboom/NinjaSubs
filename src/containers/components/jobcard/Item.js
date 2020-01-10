import React, { useContext } from 'react';
import { GlobalState } from '../../../state';

// Components
import {
    ListItemText
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    secondaryText: {
        color: 'black'
    },
    root: {
        cursor: 'pointer'
    }
}));

export default ({ primary, secondary, data, uid }) => {
    const classes = useStyles();
    const { methods } = useContext(GlobalState);
    const { handleModals, setCandidate } = methods;

    const showCandidateDetails = () => {
        if (data) {
            setCandidate({ data, uid });
            handleModals('CandidateDetails')
        }
    }

    return (
        <ListItemText
            classes={{
                root: data ? classes.root : null,
                secondary: classes.secondaryText
            }}
            primary={primary}
            secondary={secondary}
            onClick={showCandidateDetails}
        />
    )
}
