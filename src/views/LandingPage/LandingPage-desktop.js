import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import bgImage from "../../assets/img/landing-bg.jpg";

const useStyles = makeStyles(styles);

const Desktop = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Parallax filter image={bgImage}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Where schools from around the world come to find quality
                substitute teachers.
              </h1>
              <h4>
                {`Every teacher needs a break from time to time. But finding a suitable substitute
                can be hard. NinjaSubs is here to facilitate that process. `}
              </h4>
              <br />
              <div className="d-flex justify-content-between">
                <Button
                  className="mr-2"
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/channel/UCFNy9LI10k1_Q-fSR14lEfw/videos?view_as=subscriber"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  YouTube Channel
                </Button>
                <Link to="/login-page" className={classes.links}>
                  <Button className="ml-2" color="info" size="lg">
                    <i className="fas fa-user mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            </GridItem>
          </GridContainer>
          <div className="mt-4 pt-4">
            Photo by
            <a
              href="https://unsplash.com/@aiiveny"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Aisha Askhadova{" "}
            </a>
            on
            <a
              href="https://unsplash.com/"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Unsplash
            </a>
          </div>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Desktop;
