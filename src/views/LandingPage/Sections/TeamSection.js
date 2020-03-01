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
import Anchor from 'components/Anchors';
// Team images
import asriel from "assets/img/faces/asriel.jpg";
import roscoe from "assets/img/faces/roscoevanderboom.jpg";
import bethany from "assets/img/faces/bethanyLin.jpg";
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

  const React_A = () => (
    <Anchor text='React' href='https://reactjs.org/' />
  )
  const MaterialUI_A = () => (
    <Anchor text='MaterialUI' href='https://material-ui.com/' />
  )
  const Multichain_A = () => (
    <Anchor text='Multichain' href='https://www.multichain.com/' />
  )
  const Firebase_A = () => (
    <Anchor text='Firebase' href='https://firebase.google.com/' />
  )
  const Electron_A = () => (
    <Anchor text='Electron' href='https://www.electronjs.org/' />
  )
  const IPFS_A = () => (
    <Anchor text='IPFS' href='https://ipfs.io/' />
  )
  const DAT_A = () => (
    <Anchor text='DAT' href='https://dat.foundation/' />
  )
  return (
    <div className='col-12 text-center bg-light pt-2'>
      <Typography
        className={classes.title}
        component='header'
        variant='h4'>
        Meet our team
    </Typography>

      <GridContainer justify='space-evenly'>
        <GridItem xs={12} sm={6} md={4}>
          <Card plain>
            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              <img src={roscoe} alt="..." className={imageClasses} />
            </GridItem>
            <h4 className={classes.cardTitle}>
              Roscoe van der Boom
              <br />
              <small className={classes.smallTitle}>Shogun</small>
            </h4>
            <CardBody>
              <p className={classes.description}>
                Based in South Africa, I develop web apps with <React_A />, <Firebase_A /> and <MaterialUI_A />. I also
                develop desktop apps using <Electron_A />, <React_A /> and <Multichain_A />. I am very passionate about decentralized
                technologies such as blockchain, <IPFS_A /> and <DAT_A />. My dream is to be a digital nomad and educate people
                in remote coommunities about the internet and the joys of coding.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyCenter}>
              <Anchor
                href="https://github.com/roscoevanderboom"
                text={<i className={classes.socials + " m-3 fab fa-github"}></i>} />
              <Anchor
                href="https://roscoe-vanderboom.firebaseapp.com/"
                text={<i className={classes.socials + " m-3 fas fa-home"}></i>} />

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card plain>
            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              <img src={asriel} alt="..." className={imageClasses} />
            </GridItem>
            <h4 className={classes.cardTitle}>
              Asriel
              <br />
              <small className={classes.smallTitle}>Lead Executioner</small>
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
                className={classes.margin5} >
                <i className={classes.socials + " fab fa-twitter"} />
              </Button>
              <Button
                justIcon
                color="transparent"
                className={classes.margin5} >
                <i className={classes.socials + " fab fa-linkedin"} />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
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
                className={classes.margin5}  >
                <i className={classes.socials + " fab fa-twitter"} />
              </Button>
              <Button
                justIcon
                color="transparent"
                className={classes.margin5} >
                <i className={classes.socials + " fab fa-facebook"} />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
