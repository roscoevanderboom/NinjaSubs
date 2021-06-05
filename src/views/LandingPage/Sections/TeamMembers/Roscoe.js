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
import Anchor from "components/Anchors";
// Member image
import roscoe from "assets/img/faces/roscoevanderboom.jpg";
// Styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
const useStyles = makeStyles(styles);

const Roscoe = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const ReactAnchor = () => <Anchor text="React" href="https://reactjs.org/" />;
  const MaterialUIAnchor = () => (
    <Anchor text="MaterialUI" href="https://material-ui.com/" />
  );
  const MultichainAnchor = () => (
    <Anchor text="Multichain" href="https://www.multichain.com/" />
  );
  const FirebaseAnchor = () => (
    <Anchor text="Firebase" href="https://firebase.google.com/" />
  );
  const ElectronAnchor = () => (
    <Anchor text="Electron" href="https://www.electronjs.org/" />
  );
  const IPFSAnchor = () => <Anchor text="IPFS" href="https://ipfs.io/" />;
  const DATAnchor = () => <Anchor text="DAT" href="https://dat.foundation/" />;
  return (
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
            Based in South Africa, I develop web apps with <ReactAnchor />,{" "}
            <FirebaseAnchor />
            and <MaterialUIAnchor />. I also develop desktop apps using{" "}
            <ElectronAnchor />,
            <ReactAnchor /> and <MultichainAnchor />. I am very passionate about
            decentralized technologies such as blockchain, <IPFSAnchor /> and{" "}
            <DATAnchor />. My dream is to be a digital nomad and educate people
            in remote coommunities about the internet and the joys of coding.
          </p>
        </CardBody>
        <CardFooter className={classes.justifyCenter}>
          <Anchor
            href="https://github.com/roscoevanderboom"
            text={<i className={classes.socials + " m-3 fab fa-github"}></i>}
          />
          <Anchor
            href="https://roscoe-vanderboom.firebaseapp.com/"
            text={<i className={classes.socials + " m-3 fas fa-home"}></i>}
          />
        </CardFooter>
      </Card>
    </GridItem>
  );
};
export default Roscoe;
