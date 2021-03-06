import React, { useContext } from "react";
// State
import store from "../../state";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// Actions
import { signOut } from "../../actions/auth";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
// @material-ui/icons
import { Apps } from "@material-ui/icons";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// styles
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();
  const { hist } = useContext(store);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Menu"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link key="1" to="/profile-page" className={classes.dropdownLink}>
              Profile
            </Link>,
            <Link key="2" to="/noticeboard" className={classes.dropdownLink}>
              Noticeboard
            </Link>,
            <Link key="3" to="/availableSubs" className={classes.dropdownLink}>
              Available subs
            </Link>,
            <Link key="4" to="/activities" className={classes.dropdownLink}>
              Activities
            </Link>,
            <Link key="5" to="/inbox" className={classes.dropdownLink}>
              Inbox
            </Link>,
            <Link key="6" to="/settings" className={classes.dropdownLink}>
              Settings
            </Link>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          onClick={() => signOut(hist)}
          color="transparent"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fas fa-sign-out-alt"} />
        </Button>
      </ListItem>
    </List>
  );
}
