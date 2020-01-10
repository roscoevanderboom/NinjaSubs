import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
    },
    cardBody: {
        padding: 0,
        margin: 0,
    },
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 38,
        width: 80,
        padding: '0px 15px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    bioheader: {
        padding: '0px 20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    bio: {
        padding: '0px 20px',
    },
    userinfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            background: 'lavender'
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        backgroundColor: 'slategrey'
    },
    chip: {
        margin: 3
    },
    textarea: {
        width: '100%',
        border: 'none',
        padding: '8px 25px',
        backgroundColor: 'whitesmoke',
        fontFamily: 'cursive',
        fontSize: '1rem',
    },
    stars: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 5
    }
}))