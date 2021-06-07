import React, { useContext } from "react";
import GlobalState from "state";
// Actions
import { handleProfileData } from "../../actions/user";
// custom components
import SettingsItem from "./SettingsItem";
// Icon
import { DeleteSweep } from "@material-ui/icons";
const ClearIgnoredPosts = () => {
  const { state, feedback } = useContext(GlobalState);

  const clearIgnoreList = () => {
    if (state.user !== null) {
      handleProfileData({
        action: "update",
        user: state.user,
        data: { ignoreList: [] },
      })
        .then(() => {
          feedback("success", "List cleared");
        })
        .catch((err) => {
          feedback("error", err);
        });
    }
  };

  return (
    <SettingsItem
      text="Clear your list of ignored posts."
      icon={<DeleteSweep />}
      onClick={clearIgnoreList}
    />
  );
};

export default ClearIgnoredPosts;
