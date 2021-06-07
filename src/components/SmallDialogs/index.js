import React from "react";
import PropTypes from "prop-types";
// Actions
import { addFileToStorage, fileValidation } from "actions/lessonPlans";
import { handleProfileDataArrays } from "actions/user";
// Material UI components
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  InputAdornment,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FileNameInput from "@material-ui/core/Input";
import { Input } from "reactstrap";
import Button from "components/CustomButtons/Button";
import { FileCopyOutlined, VideoLabel } from "@material-ui/icons";

// Styles
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  dialog: {
    width: "94%",
    margin: 0,
    maxWidth: 400,
  },
  addFileBtn: {
    float: "right",
  },
});

const DefaultDialog = (props) => {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const { value, handleValue, handleSubmit, id, lable, icon, type, Trigger } =
    props;

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Trigger onClick={handleModal} />
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{ paperScrollPaper: classes.dialog }}
      >
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor={id}>{lable}</InputLabel>
            <FileNameInput
              value={value}
              id={id}
              type={type}
              onChange={(e) => handleValue(e)}
              endAdornment={
                <InputAdornment position="end">{icon}</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button size="sm" color="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button size="sm" color="danger" onClick={handleModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DefaultDialog;

DefaultDialog.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  lable: PropTypes.string,
  type: PropTypes.string,
  handleValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  Trigger: PropTypes.object,
  icon: PropTypes.element,
};

export const DialogWithoutTrigger = (props) => {
  const classes = styles();
  const {
    value,
    handleValue,
    handleSubmit,
    id,
    lable,
    icon,
    type,
    open,
    handleModal,
  } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{ paperScrollPaper: classes.dialog }}
      >
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor={id}>{lable}</InputLabel>
            <FileNameInput
              value={value}
              id={id}
              type={type}
              onChange={(e) => handleValue(e)}
              endAdornment={
                <InputAdornment position="end">{icon}</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button size="sm" color="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button size="sm" color="danger" onClick={handleModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DialogWithoutTrigger.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  lable: PropTypes.string,
  type: PropTypes.string,
  handleValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  icon: PropTypes.element,
  open: PropTypes.bool,
  handleModal: PropTypes.func,
};

export const FileUploadDialog = (props) => {
  const { user, dispatch, feedback } = props;
  const [file, setFile] = React.useState({
    name: "",
    data: null,
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const disabled = error || file.name === "" || file.data == null;

  const handleModal = () => {
    setOpen(!open);
  };

  const handleForm = (key, value) => {
    setFile({ ...file, [key]: value });
  };

  const handleFileSelect = (e) => {
    let newFiles = Object.values(e.target.files);
    if (newFiles[0] !== undefined) {
      handleForm("data", newFiles[0]);
      if (file !== undefined) {
        fileValidation(newFiles[0], feedback, setError);
      }
    }
  };

  const handleSubmit = () => {
    if (user.emailVerified) {
      addFileToStorage(user, file, dispatch, feedback);
    } else {
      feedback(
        "error",
        "Your email has not been verified. Please check your mailbox."
      );
    }
  };

  return (
    <>
      <Tooltip title="Upload a lesson plan" placement="top">
        <Button justIcon color="primary" size="sm">
          <FileCopyOutlined onClick={handleModal} />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleModal} className="pb-3">
        <DialogTitle>Upload a lesson plan</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            We currently only accept pdf documents or image files of less than
            2MB.
          </Typography>
          {/*  */}
          <FormControl fullWidth>
            <InputLabel htmlFor="file-name">Lesson plan name</InputLabel>
            <FileNameInput
              id="file-name"
              type="text"
              value={file.name}
              onChange={(e) => handleForm("name", e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Input
              id="file-upload"
              type="file"
              accept="application/pdf, image/*"
              onChange={(e) => handleFileSelect(e)}
            />
          </FormControl>
          {/*  */}
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button
            disabled={disabled}
            size="sm"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button size="sm" color="danger" onClick={handleModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FileUploadDialog.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  feedback: PropTypes.func,
};

export const VideoLinksDialog = ({ user }) => {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const [videoData, setVideoData] = React.useState({ name: "", url: "" });

  const handleModal = () => {
    setOpen(!open);
  };

  const handleVideoData = (key, e) => {
    setVideoData({ ...videoData, [key]: e.target.value });
  };

  const handleSubmit = () => {
    handleProfileDataArrays(user, "arrayUnion", "videos", videoData);
  };

  return (
    <>
      <Tooltip title="Share a teaching video" placement="top">
        <Button justIcon color="primary" size="sm">
          <VideoLabel onClick={handleModal} />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{ paperScrollPaper: classes.dialog }}
      >
        <DialogTitle>Teaching videos</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            We currently only accept links to YouTube videos.
          </Typography>
          <FormControl fullWidth>
            <InputLabel htmlFor="video-link-name">Video name</InputLabel>
            <FileNameInput
              value={videoData.name}
              id="video-link-name"
              type="text"
              onChange={(e) => handleVideoData("name", e)}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="video-link-url">
              Paste a link to a YouTube video
            </InputLabel>
            <FileNameInput
              value={videoData.url}
              id="video-link-url"
              type="text"
              onChange={(e) => handleVideoData("url", e)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions className="d-flex justify-content-around">
          <Button size="sm" color="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button size="sm" color="danger" onClick={handleModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

VideoLinksDialog.propTypes = {
  user: PropTypes.object,
};
