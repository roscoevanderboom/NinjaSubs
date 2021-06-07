import React, { useContext } from "react";
import PropTypes from "prop-types";
// Store
import store from "state";
// Actions
import { removeJobApplication } from "../../actions/noticeboard";
// reactstrap components
import CustomBtn from "components/CustomButtons/Button";
// @material-ui/core components
import { Tooltip } from "@material-ui/core";
// @material-ui/icons
import { Close } from "@material-ui/icons";

export const SubstituteActions = (props) => {
  const { post } = props;
  const { state, feedback } = useContext(store);
  const { profileData } = state;
  return (
    <>
      <span className="me-2">{post.type}</span>
      <Tooltip title="Remove Job Application" placement="top">
        <CustomBtn
          onClick={() => removeJobApplication(post, profileData, feedback)}
          className="p-2"
          color="danger"
          size="sm"
        >
          <Close />
        </CustomBtn>
      </Tooltip>
    </>
  );
};

SubstituteActions.propTypes = {
  post: PropTypes.object,
};
