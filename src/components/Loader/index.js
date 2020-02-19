import React from 'react';
import GlobalState from '../../state';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    show: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        zIndex: 10000,
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'radial-gradient(#000000, #35859d)',
        position: 'fixed',
        top: 0,
        left: 0
    },
    hide: {
        display: 'none'
    }
}));

export default function CircularIndeterminate() {
    const classes = useStyles();
    const { state } = React.useContext(GlobalState);
    const { loading } = state;

    return (
        <div className={!loading ? classes.hide : classes.show}>
            <CircularProgress
                style={{
                    width: 80,
                    height: 80
                }} />
        </div>
    );
}
