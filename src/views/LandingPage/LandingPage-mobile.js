import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";

// Sections for this page
import Features from "./Sections/Features";
import TeamSection from "./Sections/TeamSection";
import WorkSection from "./Sections/WorkSection.js";

import bgImage from "../../assets/img/landing-bg.jpg"

const useStyles = makeStyles({
  section1: {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    color: "white",
    padding: 12,
  },
});

const Mobile = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.section1}>
        <h3 className={classes.title}>
          Where schools from around the world come to find quality substitute
          teachers.
        </h3>
        <p>
          Every teacher needs a break from time to time. But finding a suitable
          substitute can be hard. NinjaSubs is here to facilitate that process.
        </p>
        <br />
        <Button
          color="danger"
          href="https://www.youtube.com/channel/UCFNy9LI10k1_Q-fSR14lEfw/videos?view_as=subscriber"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Channel
        </Button>
        <Link to="/login-page" className={classes.links}>
          <Button color="info">Login</Button>
        </Link>
        <div className="mt-3">
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

      <Features />
      <TeamSection />
      <WorkSection />
    </React.Fragment>
  );
};
export default Mobile;
