import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    header: {
        marginTop: 30,
        color: 'black'
    },
    chatArea: {
        width: '100%',
        height: '100%',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    chatBody: {
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: '0px 12px',
        height: '73vh'
    },
    toolbar: {
        backgroundColor: '#3f3a3a',
        minHeight: 47,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        maxWidth: 700,
        backgroundColor: 'whitesmoke'
    },
    navlink: {
        color: 'white'
    },
    contactBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
        cursor: 'pointer'
    },
    avatar: {
        height: 50,
        width: 50,
        margin: '15px 20px',
        [theme.breakpoints.up('sm')]: {
            height: 100,
            width: 100,
            margin: '15px 38px'
        }
    },
    nameTag: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        width: 'fit-content',
        padding: '3px 5px',
        borderRadius: 5
    },
    textInputDiv: {
        display: 'flex',
        borderTop: '1px solid #3f51b5',
        margin: 0,
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    textInput: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5
    },
    postBtn: {
        width: '20%',
        border: '2px solid #3f51b5',
    },
    listItemLeft: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    listItemRight: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    textLeft: {
        width: 'fit-content',
        maxWidth: '75%',
        backgroundColor: '#80808085',
        borderRadius: 8,
        padding: 10,
        color: 'black',
        marginTop: 12
    },
    textBubble: {
        width: 'fit-content',
        maxWidth: '75%',
        backgroundColor: '#80808085',
        borderRadius: 8,
        padding: 10,
        color: 'black',
        marginTop: 12
    },
    list: {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: 0
    }
}));