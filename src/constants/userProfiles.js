import noUserImage from "../assets/img/ninja.png";

export const basicProfileData = (user) => ({
  uid: user.uid,
  emailSent: true,
  email: user.email,
  image: noUserImage,
  blackList: [],
  ignoreList: [],
});

export const newSubData = (user) => ({
  type: "Substitute",
  history: [],
  rating: [],
  available: false,
  bio: "",
  cv: "",
  lessonPlans: [],
  locations: [],
  videos: [],
  name: user.displayName,
});
export const newEmployerData = {
  type: "Employer",
  "Contact person": "",
  location: "",
  address: "",
  phone: "",
  posts: [],
  "School name": "",
};
export const newSubBoardListing = ({
  uid,
  rating,
  name,
  image,
  bio,
  locations,
  available,
  videos,
}) => ({
  uid,
  rating,
  name,
  image,
  bio,
  likes: [],
  locations,
  videos,
  available: !available,
});
