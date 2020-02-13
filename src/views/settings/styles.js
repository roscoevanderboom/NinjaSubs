import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  header: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 12,
    textAlign: 'center'
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  list: {
    backgroundColor: '#f1f1f1',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  listItem: {
    padding: '5px 5px 5px 12px'
  },
  root: {
    width: '100%',
    maxWidth: 650,
    marginTop: 5
  }
}))