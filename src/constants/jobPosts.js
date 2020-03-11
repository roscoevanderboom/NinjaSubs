// Sample text for new post
const mon = 'Mon. 12/6 \nClass1 14:00 - 15:00\nClass2: 17:50 - 18:50\n\n';
const tue = 'Tues. 12/7 \nClass1 17:50 - 18:50';
export const examplePost = `${mon}${tue}`;

// Create data objects for new post
export const create_new_post = ({ contact, name, uid, image, location, address, phone }) => ({
    comments: '',
    start: '',
    end: '',
    rates: '',
    name,
    contact,
    location,
    address,
    phone,
    neg: false,
    uid,
    ref: Math.floor(Math.random() * 10000),
    candidates: [],
    candidates_uid: [],
    image,
    type: 'Part-time'
});

export const newJobApplicationData = ({ name, bio, image, history, rating, uid }) => ({
    name,
    bio,
    image,
    history,
    rating,
    uid
});