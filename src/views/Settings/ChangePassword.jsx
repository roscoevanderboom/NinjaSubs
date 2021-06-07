import React, { useContext } from "react";
import store from "state";
// @material-ui/icons
import Lock from "@material-ui/icons/Lock";
// custom components
import SettingsItem from "./SettingsItem";
import SmallDialog from "components/SmallDialogs";

const ChangePassword = () => {
  const [value, setValue] = React.useState("");
  const { state, feedback } = useContext(store);
  const { user } = state;

  const handleValue = (e) => setValue(e.target.value);

  const handleSubmit = () => {
    user
      .updatePassword(value)
      .then(function () {
        feedback("success", "Password changed");
      })
      .catch(function (error) {
        feedback("logout", error.message);
      });
  };

  return (
    <React.Fragment>
      <SettingsItem
        text="Change your password."
        icon={
          <SmallDialog
            id="change-password"
            lable="Change your password"
            type="text"
            value={value}
            icon={<Lock />}
            handleValue={handleValue}
            handleSubmit={handleSubmit}
            Trigger={Lock}
          />
        }
      />
    </React.Fragment>
  );
};

export default ChangePassword;
