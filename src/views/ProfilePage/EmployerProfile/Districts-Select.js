import React from "react";
import PropTypes from "prop-types";
// Locations array
import location from "constants/locations";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function DistrictSelect(props) {
  const [mainDistricts, setMainDistricts] = React.useState([]);
  const [subDistricts, setSubDistricts] = React.useState([]);
  const {
    handleData,
    formControlProps,
    value,
    error,
    white,
    inputRootCustomClasses,
    success,
    endAdornment,
    profileData,
  } = props;
  const { country, city } = profileData;
  const classes = useStyles();

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }

  React.useEffect(() => {
    if (profileData) {
      setMainDistricts(Object.keys(location[country][city]));
      setSubDistricts(Object.values(location[country][city]));
    }
  }, [profileData]);

  return (
    <FormControl
      fullWidth
      className={formControlClasses}
      error={value === "" ? true : false}
    >
      <InputLabel
        htmlFor="location-select"
        className={classes.labelRoot + " " + labelClasses}
      >
        District
      </InputLabel>
      <Select
        native
        classes={{
          root: underlineClasses,
          disabled: classes.disabled,
          select: underlineClasses,
          selectMenu: underlineClasses,
        }}
        value={value}
        onChange={(e) => handleData("location", e.target.value)}
        endAdornment={endAdornment}
        input={
          <Input
            classes={{
              input: inputClasses,
              root: marginTop,
              disabled: classes.disabled,
              underline: underlineClasses,
            }}
            id="location-select"
          />
        }
      >
        <option>{value}</option>
        {mainDistricts.map((district, i) => (
          <optgroup key={i} label={district}>
            {subDistricts[i].map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </FormControl>
  );
}

DistrictSelect.propTypes = {
  handleData: PropTypes.func,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.object,
  profileData: PropTypes.object,
  value: PropTypes.string,
  white: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool,
  endAdornment: PropTypes.element,
};
