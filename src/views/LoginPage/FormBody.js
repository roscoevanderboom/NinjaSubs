import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { InputAdornment, Checkbox } from "@material-ui/core";
// @material-ui/icons
import { Email, Replay } from "@material-ui/icons";
// core components
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Anchor from "components/Anchors";

import PasswordInput from "./Password";

export default function FormBody({ props }) {
  const { classes, title, data, errors, handleData } = props;

  return (
    <CardBody>
      <CustomInput
        labelText="Email..."
        id="email"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "email",
          value: data.email,
          onChange: (e) => handleData("email", e.target.value),
          endAdornment: (
            <InputAdornment position="end">
              <Email className={classes.inputIconsColor} />
            </InputAdornment>
          ),
        }}
      />

      <PasswordInput
        errors={errors}
        handleData={handleData}
        password={data.password}
      />

      {title === "Login" ? null : (
        <CustomInput
          labelText="Repeat Password"
          id="repeat-pass"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "password",
            value: data.repeatPass,
            onChange: (e) => handleData("repeatPass", e.target.value),
            endAdornment: (
              <InputAdornment position="end">
                <Replay className={classes.inputIconsColor} />
              </InputAdornment>
            ),
            autoComplete: "off",
          }}
        />
      )}

      {title === "Login" ? null : (
        <div className="d-flex flex-column align-items-center">
          <Anchor
            text="Privacy Policy"
            href="https://www.privacypolicytemplate.net/live.php?token=G1ODSTh6D6xdPVL2vUrNtMLouRykOV2O"
          />
          <div className="row justify-content-center align-items-center">
            <Anchor
              text="Terms and Conditions"
              href="https://www.termsandconditionsgenerator.com/live.php?token=cUjuC2S5w2vTipxpiAQVx56WBJZReus7"
            />
            <Checkbox
              color="primary"
              onChange={() => handleData("terms", data.terms ? false : true)}
              value="terms"
              checked={data.terms}
            />
          </div>
        </div>
      )}
    </CardBody>
  );
}

FormBody.propTypes = {
  props: PropTypes.object,
  classes: PropTypes.object,
  title: PropTypes.string,
  data: PropTypes.object,
  errors: PropTypes.array,
  handleData: PropTypes.func,
};
