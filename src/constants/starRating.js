import { isArrayEqual, noUserImage } from "./index";
import { handleProfileData } from "../actions/user";

export const setRating = (user, profileData, setStars) => {
  let count = [];
  if (profileData.name !== null) {
    count.push("name");
  }
  if (profileData.image !== noUserImage) {
    count.push("image");
  }
  if (profileData.bio !== "") {
    count.push("bio");
  }
  if (user.emailVerified) {
    count.push("verified");
  }
  if (profileData.locations.length > 0) {
    count.push("locations");
  }

  setStars(count);
  if (isArrayEqual(count, profileData.rating)) {
    return;
  }
  if (count !== profileData.rating) {
    handleProfileData({ action: "update", user, data: { rating: count } });
  }
};
