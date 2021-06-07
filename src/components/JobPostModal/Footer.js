import React from "react";
import PropTypes from "prop-types";
// Actions
import { setModals } from "../../actions/modals";
// Components
import CustomButton from "components/CustomButtons/Button";
import { DialogActions } from "@material-ui/core";
// Styles
import useStyles from "./styles";

const Footer = ({ handleSubmit, dispatch }) => {
  const classes = useStyles();
  return (
    <DialogActions
      classes={{
        root: classes.footer,
      }}
    >
      <CustomButton size="sm" color="github" onClick={handleSubmit}>
        Submit
      </CustomButton>
      <CustomButton
        size="sm"
        color="danger"
        onClick={() => setModals(dispatch, "JobPostModal")}
      >
        Cancel
      </CustomButton>
    </DialogActions>
  );
};

export default Footer;

Footer.propTypes = {
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};
