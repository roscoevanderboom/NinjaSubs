import React, { useContext } from "react";
import PropTypes from "prop-types";
// Store
import store from "state";
// Constants
import { firebase } from "../../constants/firebase";
// Actions
import { signInWithPopup } from "../../actions/auth";
// Feedback
import FEEDBACK from "../../constants/feedback";
// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default function FormHeader({ props }) {
  const { classes, title, data } = props;
  const { hist, feedback } = useContext(store);

  const googleSignIn = () => {
    if (title === "Register" && !data.terms) {
      feedback(
        FEEDBACK.TYPE.INFO,
        FEEDBACK.MESSAGE.PLEASE_ACCEPT_TERMS_AND_CONDITIONS
      );
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      signInWithPopup(provider, hist, feedback);
    }
  };

  return (
    <CardHeader color="primary" className={classes.cardHeader}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.socialLine}>
        <Button justIcon color="transparent" onClick={googleSignIn}>
          <i className={"fab fa-google"} />
        </Button>
      </div>
    </CardHeader>
  );
}

FormHeader.propTypes = {
  props: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.object,
  title: PropTypes.string,
};
