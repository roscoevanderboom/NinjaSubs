import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// Styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// Images
import taiwanFlag from "assets/img/taiwan-flag.png"
import japanFlag from "assets/img/japan-flag.png"
const useStyles = makeStyles(styles);

function ProductSection() {
  const classes = useStyles();

  return (
    <GridContainer
      id="international"
      className={classes.section}
      justify="center"
    >
      <GridItem xs={12} sm={12} md={8}>
        <h2 className={classes.title}>Available Internationally</h2>
        <br />
        <GridContainer justify="center">
          <GridItem xs={6} md={4}>
            <img src={taiwanFlag} alt="taiwan-flag" className={classes.flags} />
          </GridItem>
          <GridItem xs={6} md={4}>
            <img src={japanFlag} alt="japan-flag" className={classes.flags} />
          </GridItem>
        </GridContainer>
        <br />
      </GridItem>
    </GridContainer>
  );
}
export default ProductSection;
