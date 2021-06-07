import React, { useState, useContext } from "react";
import store from "state";
// Actions
import { handleProfileData } from "actions/user";
// @material-ui/core components
import { InputAdornment, Tooltip, Typography } from "@material-ui/core";
// @material-ui/icons
import {
  Email,
  AccountBox,
  People,
  Phone,
  Map,
  PinDrop,
} from "@material-ui/icons";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput";
// Custom components
import DistrictSelect from "./Districts-Select";
import ProfileFooter from "../ProfileFooter";
// Styles
import useStyles from "../styles";

const init = {
  email: "",
  "Contact person": "",
  phone: "",
  location: "",
  address: "",
  "School name": "",
};

export default function ProfileDetails() {
  const { state, feedback } = useContext(store);
  const { profileData, user } = state;
  const classes = useStyles();
  const [data, setData] = useState(init);

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = () => {
    if (user !== null) {
      handleProfileData({ action: "update", user, data: data })
        .then(() => feedback("success", "Profile has been updated"))
        .catch((err) => feedback("error", err));
    }
  };
  const handleCancel = () => {
    setData(profileData);
  };

  React.useEffect(() => {
    if (profileData) {
      setData(profileData);
    }
  }, [profileData]);

  return (
    <React.Fragment>
      <Typography className={classes.detailsTitle} align="center" variant="h6">
        Profile details
      </Typography>
      <GridContainer className="mt-4 mb-3">
        {/* Name */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            formControlProps={{
              fullWidth: true,
              error: data["School name"] === "" ? true : false,
            }}
            labelText="School name"
            id="username"
            inputProps={{
              type: "text",
              value: data["School name"],
              onChange: (e) => handleData("School name", e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBox className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        {/* Email */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            formControlProps={{
              fullWidth: true,
              error: data.email === "" ? true : false,
            }}
            labelText="Email"
            id="email"
            inputProps={{
              type: "email",
              value: profileData ? profileData.email : "",
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        {/* Contact person */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            formControlProps={{
              fullWidth: true,
              error: data["Contact person"] === "" ? true : false,
            }}
            labelText="Contact Person"
            id="contact"
            inputProps={{
              type: "text",
              value: data["Contact person"],
              onChange: (e) => handleData("Contact person", e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        {/* Phone */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            formControlProps={{
              fullWidth: true,
              error: data.phone === "" ? true : false,
            }}
            labelText="Phone"
            id="phone"
            inputProps={{
              type: "tel",
              value: data.phone,
              onChange: (e) => handleData("phone", e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Phone className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        {/* District */}
        <GridItem xs={12} sm={6}>
          <DistrictSelect
            endAdornment={
              <InputAdornment position="end">
                <Map className={classes.inputIconsColor} />
              </InputAdornment>
            }
            value={data.location}
            handleData={handleData}
          />
        </GridItem>
        {/* Address */}
        <GridItem xs={12} sm={6}>
          <CustomInput
            formControlProps={{
              fullWidth: true,
              error: data.address === "" ? true : false,
            }}
            labelText="Street Address"
            id="address"
            inputProps={{
              type: "text",
              placeholder: "Click icon to open Google Maps",
              value: data.address,
              onChange: (e) => handleData("address", e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Google Maps">
                    <a
                      target="_blank"
                      href="https://www.google.com/maps"
                      rel="noopener noreferrer"
                    >
                      <PinDrop className={classes.inputIconsColor} />
                    </a>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
      </GridContainer>
      {profileData !== data && (
        <ProfileFooter
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
    </React.Fragment>
  );
}
