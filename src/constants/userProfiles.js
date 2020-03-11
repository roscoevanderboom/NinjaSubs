export const newUser = user => ({
    image: user.photoURL === null ? noUserImage : user.photoURL,
    rating: [],
    blackList: [],
    emailSent: user.emailVerified ? true : false,
    verified: user.emailVerified
})
export const newSubData = {
    type: 'Substitute',
    history: [],
    available: false,
    bio: '',
    cv: '',
    lessonPlans: [],
    locations: [],
    ignoreList: [],
}
export const newEmployerData = {
    type: 'Employer',
    contact: '',
    location: '',
    address: '',
    phone: '',
    posts: []
}
export const newSubBoardListing = ({ uid, rating, name, image, bio, locations, available }) => ({
    uid,
    rating,
    name,
    image,
    bio,
    likes: [],
    locations,
    available: !available
})