import { makeStyles } from '@material-ui/core/styles';
import { boxShadow } from 'assets/jss/material-kit-react';

const iconBtn = {
    margin: 5,
    width: 25,
    height: 25
}
export const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        maxWidth: 600,
        marginTop: 12,
        ...boxShadow
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
        width: 60,
        cursor: 'pointer'
    },
    header: {
        padding: 8
    },
    iconBtn: {
        ...iconBtn
    },
    liked: {
        ...iconBtn,
        color: 'red'
    },
    badge: {
        transform: 'scale(1) translate(0%, 8%)'
    },
    collapse: {
        backgroundColor: '#708f905c',
        padding: '5px 12px'
    },
    action: {
        display: 'flex',
        padding: 15
    },
    textArea: {
        border: 'none',
        // fontSize: 'small',
        width: '100%'
    }
}));