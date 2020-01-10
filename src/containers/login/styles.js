// 
// 
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
    form: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(grey,black)',
        // backgroundImage: `url('https://source.unsplash.com/featured/?taiwan')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('sm')]: {
            backgroundRepeat: 'repeat',
        }
    },
    card: {
        maxWidth: 350,
        width: '90%',
        backgroundColor: 'ghostwhite',
        // backgroundImage: `url('https://image.freepik.com/free-photo/beach-sand-texture-background_63047-855.jpg')`,
        borderRadius: 10,
        [theme.breakpoints.down('xs')]: {
            padding: '10px 0px',
            width: '100%',
        }
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 5,
        padding: '0px 3px',
        fontSize: 'calc(10px + 2vmin)',
        width: '90%',
        border: '1px solid lightblue',
        borderRadius: 8
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 20
    },
    header: {
        marginTop: 12,
        color: 'black'
    },
    btn: {
        backgroundColor: 'black',
        color: 'whitesmoke'
    },
    forgotPassword: {
        paddingTop: 20,
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    cardContent1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    tooltipUL: {
        margin: 5,
        padding: 0
    },
    tooltipLI: {
        listStyle: 'none',
        margin: 3
    },
    terms: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));