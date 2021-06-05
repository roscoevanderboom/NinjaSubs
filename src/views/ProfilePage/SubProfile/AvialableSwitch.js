import React from "react";
// Actions
import { handleProfileData } from "../../../actions/user";
// Material components
import { FormControlLabel, Switch } from "@material-ui/core";

export default (props) => {
  const { state, feedback, classes } = props;
  const { user, profileData } = state;

  const handleAvailable = () => {
    if (!user.emailVerified) {
      feedback(
        "error",
        "Your email has not been verified. Please check your email."
      );
    } else if (user !== null && user.emailVerified) {
      handleProfileData({
        action: "update",
        user,
        data: { available: !profileData.available },
      })
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={profileData.available}
          onClick={handleAvailable}
          value="availability"
          classes={{
            switchBase: classes.switchBase,
            checked: classes.switchChecked,
            thumb: classes.switchIcon,
            track: classes.switchBar,
          }}
        />
      }
      classes={{
        label: classes.label,
      }}
      label="Availability"
    />
  );
};
