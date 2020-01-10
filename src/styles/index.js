import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: `100%`,
        maxWidth: 400,
        [theme.breakpoints.up('md')]: {
            maxWidth: 700,
        },
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',        
    }
}));