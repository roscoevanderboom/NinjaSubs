import React, { useContext, useState } from "react";
import GlobalState from "state";

// Components
import { TextField } from "@material-ui/core";
// Icons
import { Email } from "@material-ui/icons";
// custom components
import SettingsItem from "./SettingsItem";
import CustomDialog from "../../components/CustomDialog";

export default () => {
  const { state, feedback } = useContext(GlobalState);
  const { user } = state;

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    user
      .updateEmail(email)
      .then(() => feedback("success", "Password changed"))
      .catch((error) => feedback("logout", error.message));
  };

  return (
    <CustomDialog
      open={open}
      handleOpen={handleOpen}
      title="Change Email"
      handleSubmit={handleSubmit}
      component={
        <SettingsItem
          text="Change your email."
          icon={<Email />}
          onClick={handleOpen}
        />
      }
    >
      <TextField
        type="email"
        margin="dense"
        label="Email"
        value={email}
        fullWidth
        onChange={handleInput}
        placeholder="Enter new email"
      />
    </CustomDialog>
  );
};
