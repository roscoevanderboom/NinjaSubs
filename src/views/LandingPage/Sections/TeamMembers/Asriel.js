import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Anchor from 'components/Anchors';
// Team images
import asriel from "assets/img/faces/asriel.jpg";
// Styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
const useStyles = makeStyles(styles);

export default function TeamSection() {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    return (
        <GridItem xs={12} sm={6} md={4}>
            <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={asriel} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                    Asriel Yu
                    <br />
                    <small className={classes.smallTitle}>Lead Executioner</small>
                </h4>
                <CardBody>
                    <p className={classes.description}>
                    "Knowing the mouse might one day leave its hole and get the cheese... 
                     fills you with great determination." - I am from Taiwan and I have been a 
                     web developer for several years. Also, I am crazy for gaming! Someday 
                     I'm hoping to leave the comfort of my mousehole and get the cheese!
                    </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                    <Anchor
                        href="https://github.com/luffy84217"
                        text={<i className={classes.socials + " m-3 fab fa-github"}></i>} />
                    <Anchor
                        href="https://www.linkedin.com/in/fuchuan-yu-a2026a14a/"
                        text={<i className={classes.socials + " m-3 fab fa-linkedin"}></i>} />
                </CardFooter>
            </Card>
        </GridItem>
    );
}
