import noUserImage from '../assets/img/ninja.png'

export const newProfile = user => ({
    uid: user.uid,
    emailSent: true,
    email: user.email
})

export const newUser = user => ({
    image: noUserImage,
    blackList: [],
    ignoreList: [],
    email: user.email
})
export const newSubData = {
    name: '',
    type: 'Substitute',
    history: [],
    rating: [],
    available: false,
    bio: '',
    cv: '',
    lessonPlans: [],
    locations: [],

}
export const newEmployerData = {
    type: 'Employer',
    contact: '',
    location: '',
    address: '',
    phone: '',
    posts: [],
    name: '',
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