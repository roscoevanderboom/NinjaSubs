import React, { useContext, useState } from "react";
import GlobalState from "state";

// Components
import { TextField } from "@material-ui/core";
// Icons
import { Security } from "@material-ui/icons";
// custom components
import SettingsItem from "./SettingsItem";
import CustomDialog from "../../components/CustomDialog";

export default () => {
  const { state, feedback } = useContext(GlobalState);
  const { user } = state;

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    user
      .updatePassword(password)
      .then(function () {
        setOpen(false);
        feedback("success", "Password changed");
      })
      .catch(function (error) {
        setOpen(false);
        feedback("logout", error.message);
      });
  };

  return (
    <CustomDialog
      open={open}
      handleOpen={handleOpen}
      title="Change Password"
      handleSubmit={handleSubmit}
      component={
        <SettingsItem
          text="Change your password."
          icon={<Security />}
          onClick={handleOpen}
        />
      }
    >
      <TextField
        type="password"
        margin="dense"
        label="Password"
        value={password}
        fullWidth
        onChange={handlePassword}
        placeholder="Enter new password"
      />
    </CustomDialog>
  );
};
