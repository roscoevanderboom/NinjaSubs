// Search filters
export const filterEmpActivities = (arr, profileData) => {
    return arr.filter(post => post.uid === profileData.uid);
}
export const filterSubActivities = (arr, profileData) => {
    return arr.filter(post => post.candidates_uid.includes(profileData.uid));
}
export const filterBlockedUsers = (arr, profileData) => {
    return arr.filter(user => profileData.blackList.includes(user.uid)
        && user.uid !== profileData.uid);
}
export const filterAvailableSubs = (arr, profileData) => {
    return arr.filter((sub) =>
        !profileData.blackList.includes(sub.uid)
        && sub.uid !== profileData.uid
    );
}
export const filterInbox = (arr, profileData) => {
    let filtered = [];
    arr.forEach(chat => {
        chat.participants.forEach(uid => {
            if (!profileData.blackList.includes(uid)
                && uid !== profileData.uid) {
                filtered.push(chat);
                return;
            }
        })
    })
    return filtered
}
export const filterNoticeboard = (key, arr, profileData) => {
    let filtered = [];
    // eslint-disable-next-line
    switch (key) {
        case 'sub':
            filtered = arr.filter(job =>
                !job.candidates_uid.includes(profileData.uid)
                && !profileData.ignoreList.includes(job.ref)
                && profileData.locations.includes(job.location))
            break;
        case 'emp':
            filtered = arr.filter(job =>
                job.location === profileData.location
            )
            break;
    }
    return filtered
}