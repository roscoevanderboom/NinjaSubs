import firebase from "./index";
// Auth
const auth = firebase.auth();
// Get current user
export const currentUser = auth.currentUser;

export default auth;
