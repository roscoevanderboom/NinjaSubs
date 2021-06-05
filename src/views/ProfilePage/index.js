import React, { useContext } from "react";
// Store
import store from "state";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// Custom components
import SubProfile from "./SubProfile/SubProfilePage";
import EmpProfile from "./EmployerProfile/EmpProfilePage";
// Styles
import useStyles from "./styles";

export default function ProfilePage() {
  const classes = useStyles();
  const { state } = useContext(store);
  const { profileData } = state;

  return (
    <div>
      <Header
        brand="NinjaSubs"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
      />
      <div className={classes.body}>
        <div className={classes.profileContainer}>
          {profileData.type === "Substitute" && <SubProfile />}
          {profileData.type === "Employer" && <EmpProfile />}
        </div>
      </div>
    </div>
  );
}
