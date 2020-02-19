import React from "react";
// @material-ui/core components
import { Hidden } from "@material-ui/core";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import LandingPageMobile from './LandingPage-mobile';
import LandingPageDesktop from './LandingPage-desktop';

import styles from "assets/jss/material-kit-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

const dashboardRoutes = [];

export default function LandingPage() {
    const classes = useStyles();

    const rightLinks =
        <CustomDropdown
            noLiPadding
            buttonText="Menu"
            buttonProps={{
                className: classes.navLink,
                color: "transparent"
            }}
            dropdownList={[
                <Link to="/login-page" className={classes.dropdownLink}>
                    Login
                </Link>,
                <a
                    href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.dropdownLink} >
                    Documentation
                </a>
            ]}
        />

    return (
        <React.Fragment>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="NinjaSubs"
                fixed
                rightLinks={rightLinks}
                changeColorOnScroll={{
                    height: 100,
                    color: "white"
                }} />

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
