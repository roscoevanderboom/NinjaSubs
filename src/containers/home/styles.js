// Styles
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

export const useStyles = makeStyles(theme => ({
  appBar: {
    background: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
    color: 'black',
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100vw'
  },
  content: {
    width: '100%',
    marginTop: 57,
    [theme.breakpoints.up('sm')]: {
      marginTop: 66
    },
    display: 'flex',
    justifyContent: 'center'
  }
}));