import React, { useContext } from "react";
// Store
import store from "state";
// Action
import { handleProfileDataArrays } from "actions/user";
// @material-ui/core components
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { VideoLinksDialog } from "components/SmallDialogs";
import Button from "components/CustomButtons/Button";
// Styles
import useStyles from "../styles";

export default function Video() {
  const classes = useStyles();
  const { state } = useContext(store);
  const { user, profileData } = state;

  const handleDeleteVideoLink = (video) => {
    handleProfileDataArrays(user, "arrayRemove", "videos", video);
  };

  return (
    <>
      <Typography className={classes.detailsTitle} align="center" variant="h6">
        Video Links
      </Typography>
      <div className="p-3 w-100">
        <VideoLinksDialog user={user} />

        <List>
          {profileData.videos.map((video, i) => (
            <ListItem key={i} className={classes.lessonPlanListItem}>
              <a
                href={video.url}
                rel="noopener noreferrer"
                target="_blank"
                className={classes.lessonPlanLink}
              >
                <ListItemText primary={video.name} />
              </a>
              <ListItemIcon onClick={() => handleDeleteVideoLink(video)}>
                <Button justIcon size="sm" color="danger">
                  <DeleteForever />
                </Button>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
