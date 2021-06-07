import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Divider,
} from "@material-ui/core";
// @material-ui/icons
import People from "@material-ui/icons/People";
// Core components
import Button from "components/CustomButtons/Button.js";
// Custom Components
import SubCard from "components/SubProfileDialog";
import { makeStyles } from "@material-ui/core/styles";
import { title } from "assets/jss/material-kit-react";

const useStyles = makeStyles(() => ({
  paperWidthSm: {
    width: "90%",
    maxWidth: 500,
  },
  dialogContent: {
    display: "flex",
    justifyContent: "space-around",
  },
  title: {
    ...title,
    marginTop: 0,
  },
  divider: {
    backgroundColor: "black",
  },
}));

export default function Candidates({ post }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  return (
    <React.Fragment>
      <Badge badgeContent={post.candidates.length}>
        <Button
          justIcon
          color="primary"
          variant="outlined"
          onClick={handleModal}
        >
          <People />
        </Button>
      </Badge>
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <DialogTitle className="m-0">Candidates</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent>
          {post.candidates.map((sub, i) => (
            <SubCard key={i} sub={sub} trigger="listItem" />
          ))}
        </DialogContent>
        <DialogActions>
          <Button size="sm" color="danger" onClick={handleModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Candidates.propTypes = {
  post: PropTypes.object,
};
