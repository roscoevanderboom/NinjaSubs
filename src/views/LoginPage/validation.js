import passwordValidator from 'password-validator';

const badPasswords = [
    'Passw0rd', 'Password123', 'aaAA11!!'
];
export const validatePassword = (password) => {
    var schema = new passwordValidator();
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().symbols()                                 // Must have digits
        .has().letters()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(badPasswords); // Blacklist these values
    return schema.validate(password, { list: true })
}
export const handleErrors = (validate, setErrors) => {
    let errorArray = [];
    validate.forEach(error => {
        switch (error) {
            case "max":
                errorArray.push('Password is too long.')
                break;
            case "min":
                errorArray.push('Password is too short.')
                break;
            case "uppercase":
                errorArray.push('No uppercase letter.')
                break;
            case "lowercase":
                errorArray.push('No lowercase letter.')
                break;
            case "digits":
                errorArray.push('No digits.')
                break;
            case "numbers":
                errorArray.push('No numbers.')
                break;
            case "symbols":
                errorArray.push('No symbols.')
                break;
            default:
                console.log(error);
                break;
        }
    })
    setErrors(errorArray)
}
export const validateRegister = (data, feedback, setErrors) => {
    const { email, password, repeatPass, terms } = data;
    if (email === '') {
        feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PLEASE_ENTER_YOUR_EMAIL);
        return false;
    }
    let validate = validatePassword(password);
    if (validate.length > 0) {
        handleErrors(validate, setErrors);
        return false;
    }
    if (password !== repeatPass) {
        feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PASSWORDS_DONT_MATCH);
        return false;
    }
    if (!terms) {
        feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PLEASE_ACCEPT_TERMS_AND_CONDITIONS);
        return false;
    }
   return true
}

