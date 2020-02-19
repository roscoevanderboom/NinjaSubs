/*eslint-disable*/
import React, { useContext } from "react";
// State
import store from '../../state';
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Tooltip } from "@material-ui/core";
// @material-ui/icons
import { Apps } from "@material-ui/icons";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// styles
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { fb } = useContext(store);

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      fb.auth.signOut()
    }
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/components-page" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          onClick={handleSignOut}
          color="transparent"
          className={classes.navLink}>
          <i className={classes.socialIcons + " fas fa-sign-out-alt"} />
        </Button>
      </ListItem>
    </List>
  );
}
