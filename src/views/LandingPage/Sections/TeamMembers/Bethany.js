import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
import Anchor from "components/Anchors";
// Team images
import bethany from "assets/img/faces/bethanyLin.jpg";
// Styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
const useStyles = makeStyles(styles);

const Bethany = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const ColorizeAnchor = () => (
    <Anchor
      text="Colorize"
      href="https://www.teacherspayteachers.com/Store/Colorize"
    />
  );

  return (
    <GridItem xs={12} sm={6} md={4}>
      <Card plain>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          <img src={bethany} alt="..." className={imageClasses} />
        </GridItem>
        <h4 className={classes.cardTitle}>
          Bethany Lin
          <br />
          <small className={classes.smallTitle}>Kunoichi</small>
        </h4>
        <CardBody>
          <p className={classes.description}>
            Originally from North America, I've lived in Taiwan for several
            years, teaching English and working in marketing. I'm the author of
            an English coloring book available from my store called{" "}
            <ColorizeAnchor />. One day, I'm hoping to transition completely to
            marketing while I continue making coloring books to help creative
            students study.
          </p>
        </CardBody>
        {/* <CardFooter className={classes.justifyCenter}>
                    <Button
                        justIcon
                        color="transparent"
                        className={classes.margin5}  >
                        <i className={classes.socials + " fab fa-twitter"} />
                    </Button>
                    <Button
                        justIcon
                        color="transparent"
                        className={classes.margin5} >
                        <i className={classes.socials + " fab fa-facebook"} />
                    </Button>
                </CardFooter> */}
      </Card>
    </GridItem>
  );
};
export default Bethany;
