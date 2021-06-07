import React from "react";
import PropTypes from "prop-types";
// Components
import { ListItem, ListItemText, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  listItem: {
    padding: "5px 5px 5px 12px",
  },
});

const SettingsItem = (props) => {
  const classes = styles();
  const { text, icon, onClick } = props;
  return (
    <ListItem className={classes.listItem}>
      <ListItemText>{text}</ListItemText>
      <Button onClick={onClick}>{icon}</Button>
      <Divider />
    </ListItem>
  );
};

export default SettingsItem;

SettingsItem.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};
