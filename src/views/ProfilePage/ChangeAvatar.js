import React, { useContext, useState, useEffect } from "react";
// Store
import store from "state";
// Constants
import { noUserImage } from "../../constants";
// Actions
import { upLoadFile, selectImage } from "../../actions/imageUpload";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui Components
import { Dialog, DialogTitle, DialogContent, Tooltip } from "@material-ui/core";
// Core components
import Button from "components/CustomButtons/Button.js";
// Styles
import { primaryColor } from "assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imgDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)`,
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      background: "lavender",
    },
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarImg: {
    width: 100,
    height: 100,
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      width: 130,
      height: 130,
    },
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    maxWidth: 160,
    marginBottom: 20,
    borderRadius: 6,
  },
  cameraIcon: {
    cursor: "pointer",
    fontSize: "1.2em",
    color: primaryColor,
  },
  paperWidthSm: {
    margin: 5,
  },
}));

export default () => {
  const classes = useStyles();
  const { state, feedback, dispatch } = useContext(store);
  const { profileData, user } = state;
  const [url, setUrl] = useState(null);
  const [newFile, setNewFile] = useState({});
  const [open, setOpen] = useState(false);

  const cameraIcon = classNames(classes.cameraIcon, "fas fa-camera-retro");
  const handleModal = () => {
    setOpen(!open);
  };
  const handleSubmit = () => {
    upLoadFile(user, newFile, dispatch, feedback);
  };
  const handleFileSelect = (e) => {
    selectImage(e, setUrl, setNewFile);
  };

  const Footer = () => (
    <div className="d-flex justify-content-around mt-2 mb-2">
      <Button size="sm" color="info" onClick={handleSubmit}>
        Submit
      </Button>
      <Button size="sm" color="danger" onClick={handleModal}>
        Cancel
      </Button>
    </div>
  );

  useEffect(() => {
    if (profileData.image !== undefined) {
      setUrl(profileData.image);
    }
  }, [profileData, user]);

  return (
    <React.Fragment>
      <Tooltip placement="right" title="Change Profile Image">
        <Button justIcon link onClick={handleModal}>
          <i className={cameraIcon} />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <DialogTitle>Change avatar image</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <img
            className={classes.avatar}
            src={url === null ? noUserImage : url}
            alt="avatar"
          />
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="d-flex justify-content-center"
              onChange={handleFileSelect}
            />
          </div>
        </DialogContent>
        {url !== profileData.image && <Footer />}
      </Dialog>
    </React.Fragment>
  );
};
