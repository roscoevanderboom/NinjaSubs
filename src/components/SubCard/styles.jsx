// 
// 
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
    paper: {        
        maxWidth: 600,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
           margin: '0px 12px'           
        }
    }
}));