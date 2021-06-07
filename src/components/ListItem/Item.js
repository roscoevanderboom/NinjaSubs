import React from "react";
import PropTypes from "prop-types";
// Components
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  secondaryText: {
    color: "black",
  },
  root: {
    cursor: "pointer",
  },
}));

const CustomItem = ({ primary, secondary, icon, click }) => {
  const classes = useStyles();

  return (
    <ListItem>
      {icon === undefined ? null : <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
        classes={{
          secondary: classes.secondaryText,
        }}
        primary={primary}
        secondary={secondary}
      />

      {click === undefined ? null : <Button onClick={click} />}
    </ListItem>
  );
};
export default CustomItem;

CustomItem.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  icon: PropTypes.element,
  click: PropTypes.func,
};
