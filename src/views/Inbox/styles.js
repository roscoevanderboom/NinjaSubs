import { body, primaryGradient } from "assets/jss/material-kit-react";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    body: {
        ...body
      },
    chatBody: {
        display: 'grid',
        gridTemplateRows: '35px fit-content 45px',
        width: '100%',
        maxWidth: 700,
        backgroundColor: 'whitesmoke',
    },
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
    textBody: {
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: '0px 12px',
        height: '73vh',
        backgroundColor: 'whitesmoke'
    },
    toolbar: {
        ...primaryGradient,
        width: '100%',
        minHeight: 0,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white'
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
        borderRadius: 5,
        fontSize: '1rem'
    },
    footer: {
        display: 'flex',
        borderTop: '1px solid #3f51b5',
        margin: 0,
        padding: 5,
        backgroundColor: 'gainsboro',
        width: '100%'
    },
    textInputDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        fontSize: 'large',
        width:'100%',
        paddingLeft: 6
    },
    postBtn: {
        width: '20%',
        border: '2px solid #3f51b5',
        padding: 0
    },
    listItemLeft: {
        backgroundColor: 'gray',
        borderRadius: 8,
        padding: 6,
        color: 'white'
    },
    listItemRight: {
        backgroundColor: 'slategray',
        borderRadius: 8,
        padding: 6,
        color: 'white'
    },
    list: {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: 0
    }
}));