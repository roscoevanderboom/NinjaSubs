import React, { useState, useContext, useEffect } from "react";
// Store
import store from "state";
// Constants
import { filterChips } from "constants/filters";
// Actions
import { handleLocations } from "actions/user";
// @material-ui/core components
import {
  Chip,
  Collapse,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
// @material-ui/icons
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const CustomCollapse = (props) => {
  const { state } = useContext(store);
  const { profileData, user } = state;
  const { title, districts } = props;
  const [collapse, setCollapse] = useState(false);
  const [locationChips, setLocationChips] = useState([]);

  const handleCollapse = () => {
    setCollapse(collapse ? false : true);
  };

  useEffect(() => {
    if (profileData && profileData.locations !== undefined) {
      setLocationChips(filterChips(districts, profileData));
    }
    // eslint-disable-next-line
  }, [profileData.locations]);

  return (
    <React.Fragment>
      <ListItem
        className="rounded border border-primary mb-2"
        button
        onClick={handleCollapse}
      >
        <ListItemText>{title}</ListItemText>
        <ListItemIcon className="justify-content-end">
          {collapse ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </ListItem>
      <Collapse in={collapse}>
        {locationChips.map((chip, i) => (
          <Chip
            key={i}
            onClick={handleLocations(user, profileData,chip.name)}
            className="m-1"
            label={chip.name}
            clickable={true}
            color={chip.color}
            variant={chip.variant}
          />
        ))}
      </Collapse>
    </React.Fragment>
  );
};

export default CustomCollapse;
