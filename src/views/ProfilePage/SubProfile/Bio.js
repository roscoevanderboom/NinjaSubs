import React, { useContext, useState, useEffect } from "react";
// Store
import store from "state"; // Actions
import { handleProfileData } from "actions/user";

// @material-ui/core components
import { Container, Typography } from "@material-ui/core";
// Custom components
import Footer from "../ProfileFooter";

export default ({ classes }) => {
  const { state } = useContext(store);
  const { user, profileData } = state;
  const [bio, setBio] = useState("");

  const handleBio = (value) => setBio(value);

  const handleCancel = () => setBio("");

  const handleSubmit = () => {
    if (bio !== "") {
      handleProfileData({
        action: "update",
        user,
        data: { bio: bio },
      });
    }
  };

  useEffect(() => {
    if (profileData && profileData.bio !== undefined) {
        setBio(profileData.bio);
    }
  },[profileData])

  return (
    <>
      <Typography className={classes.districtTitle} align="center" variant="h6">
        About me
      </Typography>
      <Container className="mb-3">
        <textarea
          onChange={(e) => handleBio(e.target.value)}
          value={bio}
          className={classes.textarea}
          placeholder="Introduce yourself..."
        ></textarea>
        {bio === profileData.bio ? null : (
          <Footer handleSubmit={handleSubmit} handleCancel={handleCancel} />
        )}
      </Container>
    </>
  );
};
