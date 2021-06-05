import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Anchor from "components/Anchors";
// Custom components
import International from "./International";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const FirebaseAnchor = () => (
    <Anchor text="Firebase" href="https://firebase.google.com/" />
  );
  const MaterialUIAnchor = () => (
    <Anchor text="MaterialUI" href="https://material-ui.com/" />
  );
  const CreativeTimAnchor = () => (
    <Anchor text="CreativeTim" href="https://www.creative-tim.com/" />
  );
  return (
    <div className={classes.section}>
      <International />
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Private Chat"
              description="Stealh is a ninja's greatest weapon. Here at NinjaSubs we take privacy very seriously.
              Chat messages are protected by strict security rules created for Google Firebase Cloud Firestore."
              icon={Chat}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Verified Users"
              description="Only verified users can create content. Email verification will be sent to a new user within a minute
               ( connetion depending ) after registering. Registering with your Google account will automatically verify your registration."
              icon={VerifiedUser}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Content Filters"
              description="As an employer, you only view substitutes that are currently available in your district. As a substitute, 
              you only view job posts for the districts that you have tagged yourself in. This way, NinjaSubs helps to show you only the content
              that is relevant to you."
              icon={Fingerprint}
              iconColor="warning"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Free to use</h2>
          <h6 className={classes.description}>
            Since Google offers their database service, <FirebaseAnchor /> for
            free, and all of the design elements are also free, thanks to{" "}
            <MaterialUIAnchor /> and <CreativeTimAnchor />, NinjaSubs is
             a free service without any advertising.
          </h6>
          <br />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Community built</h2>
          <h6 className={classes.description}>
            NinjaSubs is maintained by a community of up-and-coming web
            developers. I learned a lot by creating this project and I want to
            offer other developers the chance to contribute to a live project.
            If you would like to contribute to this project, you are more than
            welcome to contact us with suggestions. Anyone who adds content,
            will become a team member.
          </h6>
          <br />
        </GridItem>
      </GridContainer>
    </div>
  );
}
