const reducer = (state, action) => {
  const { modals } = state;
  const { type, modal, data } = action;
  switch (type) {
    case "SET_LOCATION":
      return { ...state, location: data };
    case "SET_CONFIG":
      return { ...state, config: data };
    case "SET_LOADING":
      return { ...state, loading: data };
    case "SET_LOGGEDIN":
      return { ...state, loggedIn: data };
    case "SET_USER":
      return { ...state, user: data };
    case "SET_PROFILEDATA":
      return { ...state, profileData: data };
    case "SET_NOTICEBOARD":
      return { ...state, noticeboardQuery: data };
    case "SET_AVAILABLESUBS":
      return { ...state, availableSubs: data };
    case "SET_INBOX":
      return { ...state, inbox: data };
    case "SET_SEARCHLIST":
      return { ...state, searchList: data };
    case "SET_CURRENTLIST":
      return { ...state, currentList: data };
    case "SET_CURRENTSUB":
      return { ...state, currentSub: data };
    case "SET_POST_TO_EDIT":
      return { ...state, post_to_edit: data };
    case "SET_SELECTED_CHAT":
      return { ...state, selectedChat: data };
    case "SET_MODAL":
      return {
        ...state,
        modals: {
          ...modals,
          [modal]: modals[modal] ? false : true
        }
      };
    case "RESET":
      return data;
    default:
      break;
  }
};

export default reducer;

export const resetStore = (dispatch, init) => {
  dispatch({ type: 'RESET', data: init })
}
