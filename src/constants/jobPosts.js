// Sample text for new post
const mon = "Mon. 12/6 \nClass1 14:00 - 15:00\nClass2: 17:50 - 18:50\n\n";
const tue = "Tues. 12/7 \nClass1 17:50 - 18:50";
export const examplePost = `${mon}${tue}`;

// Create data objects for new post
export const create_new_post = (profileData) => {
  const { uid, image, location, address, phone, email } = profileData;
  return {
    comments: "",
    start: "",
    end: "",
    rates: "",
    "School name": profileData["School name"],
    "Contact person": profileData["Contact person"],
    type: "Part-time",
    neg: false,
    ref: Math.floor(Math.random() * 100000),
    candidates: [],
    candidates_uid: [],
    uid,
    image,
    location,
    address,
    phone,
    email
  };
};

export const newJobApplicationData = ({
  name,
  bio,
  image,
  history,
  rating,
  uid,
  lessonPlans,
  videos
}) => ({
  name,
  bio,
  image,
  history,
  rating,
  uid,
  lessonPlans,
  videos
});

export const isNewPostAllowed = (array, profileData) =>
  !(array.filter((post) => post.uid === profileData.uid).length > 3);
