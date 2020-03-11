
export const newChatRoom = (profileData, chatee) => ({
    participants: [profileData.uid, chatee.uid],
    user1: {
        uid: profileData.uid,
        name: profileData.name,
        image: profileData.image,
    },
    user2: {
        uid: chatee.uid,
        name: chatee.name,
        image: chatee.image,
    },
    messages: [],
    room_id: Math.floor(Math.random() * 10000)
});
export const chatPost = (profileData, newPost) => ({
    sender_uid: profileData.uid,
    sender_name: profileData.name,
    post: newPost,
    time: new Date(),
    read: false
});