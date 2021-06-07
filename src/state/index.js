/* eslint-disable react/prop-types */
// Services
import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
// import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import init from "./initialState";
import reducer from "../reducers";

// Feedback
import { useSnackbar } from "notistack";
import { createFeedback } from "../components/Feedback/index";

const GlobalState = createContext();
export const GlobalStatePovider = (props) => {
  // *******************************************************
  // ********************* State ***************************
  // *******************************************************
  const [state, dispatch] = useReducer(reducer, init);
  // Router history
  const hist = useHistory();
  // Methods for user feedback
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const feedback = (variant, message) => {
    createFeedback(variant, message, enqueueSnackbar, closeSnackbar, hist);
  };

  // Create provider
  return (
    <GlobalState.Provider
      value={{
        state,
        dispatch,
        hist,
        feedback,
      }}
    >
      {props.children}
    </GlobalState.Provider>
  );
};
export default GlobalState;

GlobalState.propTypes = {
  children: PropTypes.element,
};
