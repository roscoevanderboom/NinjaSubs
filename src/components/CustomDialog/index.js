import React from "react";
import PropTypes from "prop-types";
// Components
import { SubmitBtn } from "../../components/Buttons";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  dialog: {
    width: "94%",
    margin: 0,
    maxWidth: 350,
  },
});
const CustomDialog = (props) => {
  const classes = styles();
  return (
    <React.Fragment>
      {/* <props.component /> */}
      {props.component}
      <Dialog
        open={props.open}
        onClose={props.handleOpen}
        classes={{
          paperScrollPaper: classes.dialog,
        }}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <SubmitBtn onClick={props.handleSubmit}>Submit</SubmitBtn>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomDialog;

CustomDialog.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  component: PropTypes.element,
  children: PropTypes.element,
};
