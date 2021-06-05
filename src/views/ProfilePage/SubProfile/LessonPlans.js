import React, { useContext } from "react";
// Store
import store from "state";
// Action
import { deleteFileFromStorage } from "actions/lessonPlans";
// @material-ui/core components
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { FileUploadDialog } from "components/SmallDialogs";
import Button from "components/CustomButtons/Button";
// Styles
import useStyles from "../styles";

export default function LessonPlans() {
  const classes = useStyles();
  const { state, dispatch, feedback } = useContext(store);
  const { user, profileData } = state;

  const handleDeleteLesson = (file) => () => {
    if (window.confirm(`Are you sure you want to delete ${file.name}?`)) {
      deleteFileFromStorage(user, file);
    }
  };

  return (
    <>
      <Typography className={classes.detailsTitle} align="center" variant="h6">
        Lesson plans
      </Typography>
      <div className="p-3 w-100">
        <FileUploadDialog user={user} dispatch={dispatch} feedback={feedback} />
        <List>
          {profileData.lessonPlans.length === 0
            ? null
            : profileData.lessonPlans.map((plan, i) => (
                <ListItem key={i} className={classes.lessonPlanListItem}>
                  <a
                    href={plan.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.lessonPlanLink}
                  >
                    <ListItemText primary={plan.name} />
                  </a>
                  <ListItemIcon onClick={handleDeleteLesson(plan)}>
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
