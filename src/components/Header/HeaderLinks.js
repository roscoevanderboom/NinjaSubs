
import React, { useContext } from "react";
// State
import store from '../../state';
// react components for routing our app without refresh
import { Link } from "react-router-dom";
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
  const { hist, fb } = useContext(store);

  const handleSignOut = () => {
    fb.handleSignOut(hist)
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Menu"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/noticeboard" className={classes.dropdownLink}>
              Noticeboard
            </Link>,
            <Link to="/availableSubs" className={classes.dropdownLink}>
              Available subs
            </Link>,
            <Link to="/activities" className={classes.dropdownLink}>
              Activities
            </Link>,
            <Link to="/contacts" className={classes.dropdownLink}>
              Inbox
            </Link>,
            <Link to="/profile-page" className={classes.dropdownLink}>
              Profile
            </Link>,
            <Link to="/settings" className={classes.dropdownLink}>
              Settings
            </Link>,
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
