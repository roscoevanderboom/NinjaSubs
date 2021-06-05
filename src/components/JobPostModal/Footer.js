import React from "react";
// Actions
import { setModals } from "../../actions/modals";
// Components
import CustomButton from "components/CustomButtons/Button";
import { DialogActions } from "@material-ui/core";
// Styles
import useStyles from "./styles";

export default ({ handleSubmit, dispatch }) => {
  const classes = useStyles();
  return (
    <DialogActions
      classes={{
        root: classes.footer,
      }}
      children={
        <React.Fragment>
          <CustomButton
            size="sm"
            color="github"
            children={`Submit`}
            onClick={handleSubmit}
          />
          <CustomButton
            size="sm"
            color="danger"
            children={`Cancel`}
            onClick={() => setModals(dispatch, "JobPostModal")}
          />
        </React.Fragment>
      }
    />
  );
};
