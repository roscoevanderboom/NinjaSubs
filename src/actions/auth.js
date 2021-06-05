// Constants
import auth from "../constants/firebase/auth";
import { basicProfileData } from "../constants/userProfiles";
import FEEDBACK from "../constants/feedback";
// Actions
import setLoading from "./loading";
import { handleProfileData, delete_Profile_Photo_From_Storage } from "./user";
import { deleteAllChatrooms } from "./privatechat";
import { deleteSubListing } from "./availableSubs";
import { deleteAllItems as deleteLessonPlans } from "./lessonPlans";

export const setUser = (dispatch, user) => {
  dispatch({
    type: "SET_USER",
    data: user,
  });
};
export const onAuthStateChanged = (dispatch, hist) => {
  setLoading(dispatch, true);
  auth.onAuthStateChanged(
    async (user) => {
      if (user === null) {
        setUser(dispatch, user);
        setLoading(dispatch, false);
        hist.push("/");
      } else if (user) {
        setUser(dispatch, user);
      }
    },
    function (error) {
      console.log(error.message);
      setLoading(dispatch, false);
    }
  );
};
export const createUserWithEmailAndPassword = (data, feedback, hist) => {
  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((res) => {
      res.user.sendEmailVerification().then(() => {
        handleProfileData({
          action: "set",
          user: res.user,
          data: basicProfileData(res.user),
        });
        hist.push("/createProfile-page/select-country");
      });
    })
    .catch((error) => {
      feedback("error", error.message);
    });
};
export const signInWithPopup = (provider, hist, feedback) => {
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      // The signed-in user info.
      var user = result.user;
      if (result.additionalUserInfo.isNewUser) {
        handleProfileData({
          action: "set",
          user,
          data: basicProfileData(user),
        }).then(() => {
          hist.push("/createProfile-page/select-country");
        });
      } else {
        hist.push("/profile-page");
      }
    })
    .catch(function (error) {
      var errorMessage = error.message;
      feedback(FEEDBACK.TYPE.ERROR, errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log(email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential);
      // ...
    });
};
export const signIn = (data, hist, feedback) => {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => hist.push("/profile-page"))
    .catch((err) => feedback("error", err.message));
};
export const signOut = (hist) => {
  if (window.confirm("Are you sure you want to leave?")) {
    auth.signOut();
    hist.push("/");
  }
};
export const handleVerification = (user, feedback) => {
  user
    .sendEmailVerification()
    .then(function () {
      feedback(FEEDBACK.TYPE.SUCCESS, FEEDBACK.MESSAGE.EMAIL_SENT);
    })
    .catch(function (error) {
      feedback("error", error.message);
    });
};
export const deleteProfile = (user, profileData, feedback, dispatch) => {
  if (window.confirm("Are you sure?")) {
    setLoading(dispatch, true);
    if (profileData.type === "Substitute") {
      deleteSubListing(user.uid);
      deleteLessonPlans(user);
    }
    delete_Profile_Photo_From_Storage(user);
    deleteAllChatrooms(user);
    handleProfileData({ action: "delete", user }).then(() =>
      console.log("Profile deleted")
    );
    user
      .delete()
      .then(() => setLoading(dispatch, false))
      .catch((err) => {
        feedback("logout", err.message);
        setLoading(dispatch, false);
      });
  }
};
