// 
// 
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
    paper: {        
        maxHeight: 600,
        [theme.breakpoints.down('xs')]: {
           margin: '0px 12px'
        }
    },
    card: {
        [theme.breakpoints.down('xs')]: {
            padding: '10px 0px',
            width: '100%',
            minHeight: 400
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
        textAlign: 'center',
        width: '100%',
        marginTop: 20
    },
    header: {
        margin: 12,
        color: 'black'
    },
    btn: {
        margin: '0px 12px',
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