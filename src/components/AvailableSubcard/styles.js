import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        maxWidth: 600,
        marginTop: 12
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
    liked: {
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
        fontSize: 'small',
        width: '100%'
    }
}));