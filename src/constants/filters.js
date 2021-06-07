// Search filters
export const filterEmpActivities = (arr, profileData) => {
  return arr.filter((post) => post.uid === profileData.uid);
};
export const filterSubActivities = (arr, profileData) => {
  return arr.filter((post) => post.candidates_uid.includes(profileData.uid));
};
export const filterBlockedUsers = (arr, profileData) => {
  return arr.filter(
    (user) =>
      profileData.blackList.includes(user.uid) && user.uid !== profileData.uid
  );
};
export const filterAvailableSubs = (arr, profileData) => {
  if (profileData.type === "Substitute") {
    return arr.filter(
      (sub) =>
        !profileData.blackList.includes(sub.uid) && sub.uid !== profileData.uid
    );
  } else if (profileData.type === "Employer") {
    return arr.filter(
      (sub) =>
        !profileData.blackList.includes(sub.uid) &&
        sub.uid !== profileData.uid &&
        sub.locations.includes(profileData.location)
    );
  }
};
export const filterInbox = (arr, profileData) => {
  let filtered = [];
  arr.forEach((chat) => {
    chat.participants.forEach((uid) => {
      if (!profileData.blackList.includes(uid) && uid !== profileData.uid) {
        filtered.push(chat);
        return;
      }
    });
  });
  return filtered;
};
export const filterNoticeboard = (
  noticeboardQuery,
  searchParams,
  profileData
) => {
  const searchFilter = (post) => searchParams.includes(post.type);
  if (profileData.type === "Substitute") {
    const hasNotApplied = (post) =>
      !post.candidates_uid.includes(profileData.uid);
    const notIgnored = (post) => !profileData.ignoreList.includes(post.ref);
    const locationsFilter = (post) =>
      profileData.locations.includes(post.location);
    return noticeboardQuery.filter(
      (post) =>
        hasNotApplied(post) &&
        notIgnored(post) &&
        searchFilter(post) &&
        locationsFilter(post)
    );
  } else if (profileData.type === "Employer") {
    const locationFilter = (post) => post.location === profileData.location;
    return noticeboardQuery.filter(
      (post) => locationFilter(post) && searchFilter(post)
    );
  }
};
export const filterChips = (array, profileData) => {
  let newArray = [];
  array.forEach((dist) => {
    if (profileData.locations.includes(dist)) {
      newArray.push({
        name: dist,
        variant: "outlined",
        color: "primary",
      });
      return;
    }
    newArray.push({
      name: dist,
      variant: "default",
    });
  });
  return newArray;
};
