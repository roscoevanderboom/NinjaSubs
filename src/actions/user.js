// Constants
import { FieldValue } from "../constants/firebase";
import { users } from "../constants/firebase/collections";
import { storageRef } from "constants/firebase/storage";
// Actions
import setLoading from "../actions/loading";
export const setProfileData = (dispatch, data) => {
  dispatch({
    type: "SET_PROFILEDATA",
    data: data,
  });
};
export const watchProfileData = (user, dispatch, hist) => {
  users.doc(user.uid).onSnapshot(
    function (doc) {
      if (doc.exists && doc.data().type !== undefined) {
        setProfileData(dispatch, doc.data());
      } else if (doc.exists && doc.data().type === undefined) {
        setProfileData(dispatch, doc.data());
        hist.push("/createProfile-page/select-country");
      } else if (!doc.exists) {
        console.log("Doc does not exist.");
        hist.push("/createProfile-page/delete-profile");
      }
      setLoading(dispatch, false);
    },
    function () {
      setProfileData(dispatch, false);
      setLoading(dispatch, false);
    }
  );
};
export const handleProfileData = ({ action, user, data }) => {
  return new Promise((resolve, reject) => {
    users
      .doc(user.uid)
      [action](data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
export const changeDisplayName = (user, displayName, feedback) => {
  if (displayName === "") {
    feedback("error", "Please enter a display name.");
  } else {
    user
      .updateProfile({
        displayName: displayName,
      })
      .then(() => {
        handleProfileData({
          action: "update",
          user,
          data: {
            name: displayName,
          },
        }).then(() => feedback("success", "Display name set."));
      });
  }
};
export const handleLocations = (user, profileData, location) => () => {
  users.doc(user.uid).update({
    locations: profileData.locations.includes(location)
      ? FieldValue.arrayRemove(location)
      : FieldValue.arrayUnion(location),
  });
};
export const handleProfileDataArrays = (user, action, key, data) => {
  return new Promise((resolve, reject) => {
    users
      .doc(user.uid)
      .update({
        [key]: FieldValue[action](data),
      })
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};
export const delete_Profile_Photo_From_Storage = (user) => {
  var childRef = storageRef.child(`images/${user.uid}/profile`);
  childRef
    .delete()
    .then(() => console.log("Profile photo deleted"))
    .catch((err) => console.log(err));
};
