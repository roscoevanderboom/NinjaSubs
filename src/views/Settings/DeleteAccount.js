import React, { useContext } from "react";
import store from "state";
//
// Actions
import { deleteProfile } from "../../actions/auth";
// custom components
import SettingsItem from "./SettingsItem";
// Icon
import { Cancel } from "@material-ui/icons";
const DeleteAccount = () => {
  const { state, feedback, dispatch } = useContext(store);
  const { profileData, noticeboardQuery, user } = state;

  const checkActivePosts = () => {
    const posts = noticeboardQuery.filter(
      (post) => post.uid === profileData.uid
    );
    if (posts.length > 0) {
      feedback("error", "Please delete active posts first.");
      return false;
    }
    return true;
  };

  const handleDelete = () => {
    if (user === null) {
      return;
    }
    if (profileData.type === "Employer") {
      if (!checkActivePosts()) {
        return;
      }
    }
    deleteProfile(user, profileData, feedback, dispatch);
  };

  return (
    <SettingsItem
      text="Delete account."
      icon={<Cancel />}
      onClick={handleDelete}
    />
  );
};

export default DeleteAccount;
