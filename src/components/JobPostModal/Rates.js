import React from "react";
import PropTypes from "prop-types";
// Components
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";

const Rates = ({ post, handleData, handleNegRates }) => {
  return (
    <Grid container>
      <Grid item xs={11} sm={6}>
        <CustomInput
          formControlProps={{
            fullWidth: true,
            error: post.rates === "" ? true : false,
          }}
          labelText="Rates per hour"
          inputProps={{
            onChange: handleData("rates"),
            value: post.rates,
            type: "number",
          }}
        />
      </Grid>
      <Grid item xs={1} sm={6}>
        <FormControlLabel
          className="ml-2 mr-2"
          label="Neg. rates"
          control={
            <Checkbox
              checked={post.neg}
              onChange={handleNegRates}
              value={post.neg}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default Rates;

Rates.propTypes = {
  post: PropTypes.object,
  handleData: PropTypes.func,
  handleNegRates: PropTypes.func,
};
