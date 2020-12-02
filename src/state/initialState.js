const modals = {
  ChangeAvatar: false,
  JobPostModal: false,
  BlockedUsers: false,
  ChangeEmail: false,
  ChangePassword: false
};

const appState = {
  loading: true,
  user: null,
  profileData: false,
  noticeboardQuery: false,
  availableSubs: false,
  inbox: false,
  searchList: [],
  currentList: [],
  post_to_edit: false,
  selectedChat: false,
  modals: modals
};

export default appState;
