import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {
  InputAdornment,
  Tooltip,
  Icon,
  FormControl,
  InputLabel,
  Input,
  List,
} from "@material-ui/core";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/customInputStyle.js";
import tooltipStyles from "assets/jss/material-kit-react/tooltipsStyle";
const useStyles = makeStyles({
  ...styles,
  ...tooltipStyles,
  tooltipUL: {
    padding: 0,
    margin: 0,
  },
  tooltipLI: {
    listStyle: "none",
  },
});

export default function Password(props) {
  const classes = useStyles();
  const { password, errors, handleData } = props;

  const [tooltip, setTooltip] = React.useState(true);

  const showTooltip = (value) => {
    setTooltip(value);
  };

  const Errors = () => (
    <List className={classes.tooltipUL}>
      {errors.map((err, i) => (
        <li key={i} className={classes.tooltipLI}>
          {err}
        </li>
      ))}
    </List>
  );

  React.useEffect(() => {
    if (errors.length > 0) {
      setTooltip(true);
      return;
    }
    if (password === "") {
      setTooltip(false);
      return;
    }
    setTooltip(false);
  }, [errors, password]);

  return (
    <Tooltip
      placement="bottom"
      open={tooltip}
      title={<Errors />}
      classes={{ tooltip: classes.tooltip }}
    >
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor="password" className={classes.labelRoot}>
          Password
        </InputLabel>
        <Input
          value={password}
          id="password"
          type="password"
          classes={{
            input: classes.input,
            disabled: classes.disabled,
            underline: classes.underline,
          }}
          onBlur={() => showTooltip(false)}
          onChange={(e) => handleData("password", e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Icon className={classes.inputIconsColor}>lock_outline</Icon>
            </InputAdornment>
          }
        />
      </FormControl>
    </Tooltip>
  );
}

Password.propTypes = {
  password: PropTypes.string,
  errors: PropTypes.array,
  handleData: PropTypes.func,
};
