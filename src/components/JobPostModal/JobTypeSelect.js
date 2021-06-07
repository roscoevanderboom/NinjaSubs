import React from "react";
import PropTypes from "prop-types";
// State
import store from "state";
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

export default function JobTypeSelect(props) {
  const {
    handleData,
    formControlProps,
    value,
    error,
    white,
    success,
    endAdornment,
  } = props;
  const { constants } = React.useContext(store);
  const classes = useStyles();

  const selectOptions = [
    {
      header: "Tapei",
      values: constants.Taipei,
    },
    {
      header: "New Taipei",
      values: constants.newTaipei,
    },
    {
      header: "Taoyuan",
      values: constants.Taoyuan,
    },
  ];
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

  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl fullWidth className={formControlClasses}>
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
        input={<Input id="location-select" />}
      >
        {selectOptions.map((group, i) => (
          <optgroup key={i} label={group.header}>
            {group.values.map((dist) => (
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

JobTypeSelect.propTypes = {
  handleData: PropTypes.func,
  formControlProps: PropTypes.object,
  value: PropTypes.string,
  error: PropTypes.string,
  white: PropTypes.string,
  success: PropTypes.string,
  endAdornment: PropTypes.element,
};
