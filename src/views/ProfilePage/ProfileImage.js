import React from "react";
// Custom components
import ChangeAvatar from "./ChangeAvatar";
// Styles
import useStyles from "./styles";

export default function ProfileImage({ profileData }) {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <div>
        <img
          alt="..."
          style={{ marginRight: "-32px" }}
          className={classes.image}
          src={profileData ? profileData.image : ""}
        />
        <ChangeAvatar />
      </div>
      <div className={classes.name}>
        <h3 className={classes.title}>
          {profileData && profileData.type === "Employer"
            ? profileData["School name"]
            : profileData.name}
        </h3>
      </div>
    </div>
  );
}
