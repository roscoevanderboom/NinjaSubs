import React, { useContext, useEffect, useState } from 'react';
import store from 'state';
// Constants
import * as constants from "../../constants";
import * as filters from "constants/filters";
// Actions
import { handleProfileData } from "../../actions/user";
// Components
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import { Undo, VoiceOverOff } from "@material-ui/icons";
// custom components
import SettingsItem from "./SettingsItem";
import CustomDialog from "../../components/CustomDialog";
// Styles
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  list: {
    minWidth: 200,
    width: 350,
  },
  item: {
    backgroundColor: "lightgrey",
  }
});

export default () => {
    const classes = styles();
    const { state } = useContext(store);
    const { profileData, availableSubs, user } = state;
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (user === null) {
      return;
    }
    setOpen(!open);
  };

  const unblock = (uid) => ({
    blackList: constants.remove_from_array(profileData.blackList, uid),
  });
  const clear = () => ({ blackList: [] });

  const handleList = async (key, uid) => {
    await handleProfileData({
      action: "update",
      user,
      data: key === "unblock" ? unblock(uid) : clear(),
    });
  };

  useEffect(() => {
    if (profileData.blackList !== undefined && availableSubs) {
      setList(filters.filterBlockedUsers(availableSubs, profileData));
    }
    // eslint-disable-next-line
  }, [profileData, availableSubs]);

  return (
    profileData && (
      <CustomDialog
        open={open}
        handleOpen={handleOpen}
        title="Blocked users"
        handleSubmit={handleList}
        component={
          <SettingsItem
            text="View your list of blocked users."
            icon={<VoiceOverOff />}
            onClick={handleOpen}
          />
        }
      >
        <List className={classes.list}>
          {list.map((user, i) => (
            <ListItem
              key={i}
              className={constants.isEven(i) ? classes.item : null}
            >
              <ListItemAvatar>
                <Avatar src={user.image} alt={user.name} />
              </ListItemAvatar>
              <ListItemText>{user.name}</ListItemText>
              <Button onClick={() => handleList("unblock", user.uid)}>
                <Undo />
              </Button>
            </ListItem>
          ))}
        </List>
      </CustomDialog>
    )
  );
};
