import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// Components
import { TextField } from "@material-ui/core";
const Dates = ({ post, handleData }) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <TextField
          fullWidth
          error={post.start === "" ? true : false}
          type="date"
          value={post.start}
          helperText="Start date"
          onChange={handleData("start")}
        />
      </div>
      <div className="col-xs-12 col-sm-6">
        <TextField
          fullWidth
          error={post.end === "" ? true : false}
          type="date"
          value={post.end}
          helperText="End date"
          onChange={handleData("end")}
        />
      </div>
    </div>
  );
};

export default Dates;

Dates.propTypes = {
  post: PropTypes.object,
  handleData: PropTypes.func,
};
