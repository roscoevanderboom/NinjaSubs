import React from "react";
import PropTypes from "prop-types";
// core components
import Button from "components/CustomButtons/Button.js";
import Container from "@material-ui/core/Container";

import styles from "./styles";

export default function ProfileFooter(props) {
  const classes = styles();
  const { handleSubmit, handleCancel } = props;
  return (
    <Container className={classes.footer}>
      <Button size="sm" color="info" onClick={handleSubmit}>
        Update
      </Button>
      <Button size="sm" color="danger" onClick={handleCancel}>
        Cancel
      </Button>
    </Container>
  );
}

ProfileFooter.propTypes = {
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
};
