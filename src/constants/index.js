/* eslint-disable */
// Image defaults
import noImage from '../assets/img/ninja.png';
export const noUserImage = noImage;
import ninjastar from '../assets/img/ninjastar.png';
export const ninjaStar = ninjastar;
export const terms = 'https://www.termsandconditionsgenerator.com/live.php?token=cUjuC2S5w2vTipxpiAQVx56WBJZReus7';
// 
// Locations
export const Taipei = [
    'Beitou', `Da'an`, 'Datong', 'Nangang',
    'Neihu', 'Shilin', 'Songshan', 'Wanhua',
    'Wenshen', 'Xinyi', 'Zhongshan', 'Zhongzheng'
];
export const newTaipei = [
    'Banqiao', `Xinzhuang`, 'Zhonghe', 'Yonghe',
    'Tucheng', 'Shulin', 'Sanxia', 'Yingge',
    'Sanchong', 'Luzhou', 'Wugu', 'Taishan',
    'Linkou', 'Bali', 'Tamsui', 'Sanzhi',
    'Shimen', 'Jinshan', 'Wanli', 'Xizhi',
    'Ruifang', 'Gongliao', 'Pingxi', 'Shuangxi',
    'Xindian', 'Shenkeng', 'Shiding', 'Pinglin',
    'Wulai'
];
export const Taoyuan = [
    'Taoyuan', `Zhongli`, 'Daxi', 'Yangmei',
    'Luzhu', 'Dayuan', 'Guishan', 'Bade',
    'Longtan', 'Pingzhen', 'Xinwu', 'Guanyin',
    'Fuxing'
];

export const creativeCommons = {
    href: "http://creativecommons.org/licenses/by/4.0/",
    alt: "Creative Commons License",
    png: "https://i.creativecommons.org/l/by/4.0/88x31.png"
}

// Sample text for new post
const mon = 'Mon. 12/6 \nClass1 14:00 - 15:00\nClass2: 17:50 - 18:50\n\n';
const tue = 'Tues. 12/7 \nClass1 17:50 - 18:50';
export const examplePost = `${mon}${tue}`;

// Array functions for firebase
export const add_if_not_included = (array, val) => {
    if (!array.includes(val)) {
        array.push(val)
    }
    return array;
}
export const remove_from_array = (array, value_to_remove) => {
    return array.filter(element => element !== value_to_remove)
}
export const mapFromNumber = (num) => {
    let arr = [];
    for (let i = 0; i < num; ++i) {
        arr.push(i);
    }
    return arr
}
// Create data objects for account settings
export const newPost = ({ contact, name, uid, image, location, address, phone }) => ({
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
})
export const newJobApplicationData = ({ name, bio, image, history, rating, uid }) => ({
    name,
    bio,
    image,
    history,
    rating,
    uid
})
export const newChat = (profileData, chatee) => ({
    participants: [profileData.uid, chatee.uid],
    user1_Name: profileData.name,
    user1_Image: profileData.image,
    user2_Name: chatee.name,
    user2_Image: chatee.image,
    messages: [],
    id: Math.floor(Math.random() * 10000)
})
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
})
export const chatPost = (profileData, newPost) => ({
    sender_uid: profileData.uid,
    sender_name: profileData.name,
    post: newPost,
    time: new Date(),
    read: false
})
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

// General
export const isEven = value => value % 2 === 0
export const isNewPostAllowed = (array, profileData) =>
    !(array.filter(post => post.uid === profileData.uid).length > 3)
export const isArrayEqual = (array1, array2) =>
    array1.length === array2.length &&
    array1.every(x => array2.includes(x))

// TODO checks for mobile devices
export const mobileSpecs = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
export const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
