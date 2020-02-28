// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// Styles
import {
  boxShadow, primaryGradient,
  defaultFont, roseColor
} from "assets/jss/material-kit-react";
import profileStyles from "assets/jss/material-kit-react/views/profilePage.js";
import inputStyles from "assets/jss/material-kit-react/components/customInputStyle";
import gridStyles from "assets/jss/material-kit-react/components/customInputStyle";
import basicStyles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";

const title = {
  ...boxShadow,
  ...primaryGradient,
  ...defaultFont,
  padding: '8px 0px',
  borderRadius: 6,
  color: 'white',
  width: '60%',
  "@media (max-width: 570px)": {
    width: '90%'
  },
}

export default makeStyles({
  ...profileStyles,
  ...inputStyles,
  ...basicStyles,
  mainRaised: {
    ...profileStyles.mainRaised,
    width: '75%',
    "@media (max-width: 570px)": {
      margin: "-30vh 5px 0px",
      width: '100%',
    },
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: '#d3d3d300'
  },
  heartIcon: {
    fontSize: '1.8rem',
    color: roseColor
  },
  textarea: {
    ...defaultFont,
    borderRadius: 6,
    width: '100%',
    marginTop: 12,
    minHeight: 200,
    padding: 12
  },
  gridItem: {
    ...gridStyles.grid,
    ...boxShadow,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: '15px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'fit-content'
  },
  detailsTitle: {
    ...title,
    margin: '-20px 0px 0px 0px',
  },
  districtTitle: {
    ...title
  },
  activePostsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0
  },
  listItem: {
    marginBottom: 12,
    borderBottom: '2px solid black',
  },
  listItemText: {
    ...defaultFont
  }
});