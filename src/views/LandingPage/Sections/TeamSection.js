import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team2 from "assets/img/faces/avatar.jpg";
import team1 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className='col-12 text-center bg-light pt-2'>
      <Typography
        className={classes.title}
        component='header'
        variant='h4'>
        Meet our team
    </Typography>

      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card plain>
            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              <img src={team1} alt="..." className={imageClasses} />
            </GridItem>
            <h4 className={classes.cardTitle}>
              Roscoe van der Boom
              <br />
              <small className={classes.smallTitle}>Shogun</small>
            </h4>
            <CardBody>
              <p className={classes.description}>
                Hi. I'm the chief designer of this web service. I like to climb trees,
                play games and design useless webapps.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button
                justIcon
                color="transparent"
                className={classes.margin5} >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/roscoevanderboom">
                  <i className={classes.socials + " fab fa-github"} />
                </a>

              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card plain>
            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              <img src={team2} alt="..." className={imageClasses} />
            </GridItem>
            <h4 className={classes.cardTitle}>
              Asriel
              <br />
              <small className={classes.smallTitle}>Ronan</small>
            </h4>
            <CardBody>
              <p className={classes.description}>
                You can write here details about one of your team members. You
                can give more details about what they do. Feel free to add
                some <a href="#pablo">links</a> for people to be able to
              follow them outside the site.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Button
                justIcon
                color="transparent"
                className={classes.margin5}
              >
                <i className={classes.socials + " fab fa-twitter"} />
              </Button>
              <Button
                justIcon
                color="transparent"
                className={classes.margin5}
              >
                <i className={classes.socials + " fab fa-linkedin"} />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
