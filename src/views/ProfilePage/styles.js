// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// Styles
import {
  boxShadow,
  primaryGradient,
  defaultFont,
  roseColor,
} from "assets/jss/material-kit-react";
import profileStyles from "assets/jss/material-kit-react/views/profilePage.js";
import inputStyles from "assets/jss/material-kit-react/components/customInputStyle";
import basicStyles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";
import bg from "assets/img/bg2.jpg";

const title = {
  ...boxShadow,
  ...primaryGradient,
  ...defaultFont,
  padding: "8px 0px",
  borderRadius: 6,
  color: "white",
  width: "60%",
  "@media (max-width: 570px)": {
    width: "90%",
  },
};

export default makeStyles({
  ...profileStyles,
  ...inputStyles,
  ...basicStyles,
  heartIcon: {
    fontSize: "1.8rem",
    color: roseColor,
  },
  textarea: {
    ...defaultFont,
    borderRadius: 6,
    width: "100%",
    marginTop: 12,
    minHeight: 200,
    padding: 12,
  },
  gridItem: {
    ...boxShadow,
    borderRadius: 6,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    margin: "40px 0px",
  },
  detailsTitle: {
    ...title,
    margin: "-20px 0px 0px 0px",
  },
  districtTitle: {
    ...title,
  },
  activePostsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
  },
  listItem: {
    marginBottom: 12,
    borderBottom: "2px solid black",
  },
  listItemText: {
    ...defaultFont,
  },
  body: {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh",
    overflowY: "scroll",
  },
  profileContainer: {
    paddingTop: "15vh",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    ...boxShadow,
    borderRadius: 6,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
  },
  infoContainer: {
    padding: "20px 12px",
    width: "90%",
  },
  lessonPlanLink: {
    textDecoration: "none",
    color: "inherit",
  },
  lessonPlanListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
