export const newChatRoom = (profileData, sub) => ({
  participants: [profileData.uid, sub.uid],
  Employer: {
    uid: profileData.uid,
    // eslint-disable-next-line
    ["School name"]: profileData["School name"],
    image: profileData.image,
  },
  Substitute: {
    uid: sub.uid,
    name: sub.name,
    image: sub.image,
  },
  messages: [],
  room_id: Math.floor(Math.random() * 10000),
});
export const chatPost = (profileData, newPost) => ({
  sender_uid: profileData.uid,
  sender_name:
    profileData.type === "Employer"
      ? profileData["School name"]
      : profileData.name,
  post: newPost,
  time: new Date(),
  read: false,
});
