import React from "react";
// @material-ui/core components
import { Hidden } from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import LandingPageMobile from "./LandingPage-mobile";
import LandingPageDesktop from "./LandingPage-desktop";

export default function LandingPage() {
  return (
    <React.Fragment>
      <Header
        color="transparent"
        brand="NinjaSubs"
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />

      <Hidden smUp>
        <LandingPageMobile />
      </Hidden>
      <Hidden only={["xs"]}>
        <LandingPageDesktop />
      </Hidden>

      <Footer />
    </React.Fragment>
  );
}
