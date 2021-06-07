import React from "react";
import PropTypes from "prop-types";
// Locations array
import { mainDistricts, subDistricts } from "constants/locations";
// @material-ui/core components
import { Typography, Container } from "@material-ui/core";
// Custom Components
import CustomCollapse from "./Districts-Collapse";

export default function Districts(props) {
  const { styles } = props;
  return (
    <>
      <Typography className={styles} align="center" variant="h6">
        Districts
      </Typography>
      <Container className="mt-3 mb-3">
        {mainDistricts.map((zone, i) => (
          <CustomCollapse key={i} title={zone} districts={subDistricts[i]} />
        ))}
      </Container>
    </>
  );
}

Districts.propTypes = {
  styles: PropTypes.object,
};
