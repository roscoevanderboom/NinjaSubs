import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
// State
import store from "state";
// actions
import { searchInbox } from "actions/privatechat";
// Components
import CustomButton from "components/CustomButtons/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  CardHeader,
  DialogContentText,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Typography,
  Divider,
} from "@material-ui/core";
import { OpenInBrowser } from "@material-ui/icons";

import { useStyles } from "./styles";

export default function SubProfileDialog({ sub, trigger }) {
  const classes = useStyles();
  const { state, dispatch, hist } = useContext(store);
  const { inbox, profileData } = state;

  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  const handleStartChat = () => {
    if (state.user === null) {
      return;
    }
    searchInbox(inbox, profileData, sub, hist, dispatch);
  };

  const ChipTrigger = () => (
    <Chip
      className="ml-1 mr-1"
      classes={{ root: classes.chip }}
      label={sub.name}
      onClick={handleModal}
      avatar={
        <Avatar
          src={sub.image}
          alt={sub.name}
          classes={{ root: classes.avatar }}
        />
      }
    />
  );

  const ListItemTrigger = () => (
    <ListItem button onClick={handleModal}>
      <ListItemAvatar>
        <Avatar
          src={sub.image}
          alt={sub.name}
          classes={{ root: classes.avatar }}
        />
      </ListItemAvatar>
      <ListItemText primary={sub.name} />
    </ListItem>
  );

  return (
    <div>
      {trigger === "listItem" ? <ListItemTrigger /> : <ChipTrigger />}
      <Dialog
        open={open}
        onClose={handleModal}
        classes={{ paper: classes.paper }}
        aria-labelledby="subcard-title"
        aria-describedby="subcard-bio"
      >
        <CardHeader
          className="p-0"
          avatar={<Avatar className="m-3" src={sub.image} alt={sub.name} />}
          title={
            <Typography
              variant="h5"
              component="header"
              className={classes.title}
            >
              {sub.name}
            </Typography>
          }
        />
        <Divider />
        <DialogContent>
          <Typography component="header" variant="h6" className={classes.title}>
            Bio:
          </Typography>
          <DialogContentText id="subcard-bio">{sub.bio}</DialogContentText>
          <Typography component="header" variant="h6" className={classes.title}>
            Lesson plans:
          </Typography>
          <List>
            {sub.lessonPlans.map((plan, i) => (
              <ListItem key={i}>
                <ListItemText primary={plan.name} />
                <a href={plan.url} rel="noopener noreferrer" target="_blank">
                  <ListItemIcon>
                    <OpenInBrowser />
                  </ListItemIcon>
                </a>
              </ListItem>
            ))}
          </List>
          <Typography component="header" variant="h6" className={classes.title}>
            Videos:
          </Typography>
          <List>
            {sub.videos.map((video, i) => (
              <ListItem key={i}>
                <ListItemText primary={video.name} />
                <a href={video.url} rel="noopener noreferrer" target="_blank">
                  <ListItemIcon>
                    <OpenInBrowser />
                  </ListItemIcon>
                </a>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <CustomButton size="sm" color="github" onClick={handleStartChat}>
            Contact
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SubProfileDialog.propTypes = {
  sub: PropTypes.object,
  trigger: PropTypes.string,
};
