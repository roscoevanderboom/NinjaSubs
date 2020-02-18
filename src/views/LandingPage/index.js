import React from "react";
// @material-ui/core components
import { Hidden } from "@material-ui/core";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import LandingPageMobile from './LandingPage-mobile';
import LandingPageDesktop from './LandingPage-desktop';

const dashboardRoutes = [];

export default function LandingPage(props) {
    const { ...rest } = props;

    return (
        <React.Fragment>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="NinjaSubs"
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "white"
                }}
                {...rest} />

            <Hidden smUp>
                <LandingPageMobile />
            </Hidden>
            <Hidden only={['xs']}>
                <LandingPageDesktop />
            </Hidden>

            <Footer />
        </React.Fragment>
    );
}
