export default (profileData, formData,user, feedback) => {
    if (profileData === formData) {
        console.log('no changes')
        return;
    }
    let res = true;
    switch (profileData.type) {
        case 'Substitute':
            if (formData.locations.length === 0) {
                feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.PLEASE_ADD_A_FEW_DISTRICTS);
                res = false;
                return;
            }
            break;
        default:
            if (formData.location === '') {
                feedback(FEEDBACK.TYPE.ERROR, FEEDBACK.MESSAGE.PLEASE_SELECT_A_DISTRICT);
                res = false
                return;
            }
            break;
    }
    if (formData.name !== profileData.name) {
        user.updateProfile({ displayName: formData.name });
    }
    if (formData.email !== profileData.email) {
        user.updateEmail(formData.email)
            .catch((err) => {
                feedback(FEEDBACK.TYPE.LOGOUT, err.message);
                res = false;
            })
    }
    return res;
}
