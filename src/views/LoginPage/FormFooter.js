import React from "react";
import PropTypes from "prop-types";
// core components
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";

export default function FormFooter({ props }) {
  const { classes, title, handleSubmit, handleTitle } = props;

  return (
    <CardFooter className={classes.cardFooter}>
      <Button round onClick={handleSubmit} className={classes.btns}>
        {title === "Login" ? "Sign In" : "Submit"}
      </Button>
      <Button
        round
        className={classes.btns}
        onClick={handleTitle}
        color="primary"
      >
        {title === "Login" ? "Register" : "Login"}
      </Button>
    </CardFooter>
  );
}

FormFooter.propTypes = {
  props: PropTypes.object,
  classes: PropTypes.object,
  title: PropTypes.string,
  data: PropTypes.object,
  errors: PropTypes.array,
  handleSubmit: PropTypes.func,
  handleTitle: PropTypes.func,
};
