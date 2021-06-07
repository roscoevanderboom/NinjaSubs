export default (dispatch, value) => {
  dispatch({
    type: "SET_LOADING",
    data: value,
  });
};
