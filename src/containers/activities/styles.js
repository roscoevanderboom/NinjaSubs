import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(() => ({
    root: {
        width: `100%`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        minWidth: 20,
        padding: '4px 8px',
        marginLeft: 5
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        minWidth: 300,
        marginTop: 12,
        marginBottom: 12
    },
    addBtn: {
        color: 'white',
        padding: 7,
        border: 'white solid 1px',
        minWidth: 30,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 'small'
    }
}));