export default (profileData, formData,user, feedback) => {
    if (profileData === formData) {
        console.log('no changes')
        return;
    }
    let res = true;
    switch (profileData.type) {
        case 'Substitute':
            if (formData.locations.length === 0) {
                feedback('error', 'Please add a few districts');
                res = false;
                return;
            }
            break;
        default:
            if (formData.location === '') {
                feedback('error', 'Please select a district');
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
                feedback('logout', err.message);
                res = false;
            })
    }
    return res;
}
