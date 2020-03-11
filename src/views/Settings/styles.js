import { makeStyles } from '@material-ui/core/styles';
// Styles
import {
  body, primaryGradient,
  defaultFont, boxShadow
} from "assets/jss/material-kit-react";
export default makeStyles(theme => ({
  header: {
    ...boxShadow,
    ...defaultFont,
    ...primaryGradient,
    marginTop: '-20px',
    padding: '8px 0px',
    textAlign: 'center',
    width: '60%',
    color: 'white'
  },
  container: {
    ...boxShadow,
    backgroundColor: '#f1f1f1',
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  list: {
    width: '75%',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  root: {
    width: '100%',
    maxWidth: 650,
    marginTop: 5
  },
  body: {
    ...body
  }
}))