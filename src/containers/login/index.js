import React, { useContext, useState } from 'react';
import { GlobalState } from '../../state';
import passwordValidator from 'password-validator';
// Components
import {
    TextField, Button, CardContent, Checkbox, Typography
} from '@material-ui/core';

import SendPassword from './SendPassword';
import Password from './Password';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, methods, fb, constants } = useContext(GlobalState);
    const { user, history } = state;
    const { feedback } = methods;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_Password] = useState('');
    const [tab, setTab] = useState('Login');
    const [errors, setErrors] = useState([]);
    const [terms, setTerms] = useState(false);

    const badPasswords = [
        'Passw0rd', 'Password123', 'aaAA11!!'
    ];
    const resetFields = () => {
        setEmail('');
        setPassword('');
        setRepeat_Password('');
    }
    const switchTab = () => {
        tab === 'Login'
            ? setTab('Register')
            : setTab('Login')
    }
    const signIn = () => {
        fb.auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                resetFields();
            })
            .catch(error => {
                feedback('error', error.message)
            })
    }
    const validateRegister = (password) => {
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
    const handleErrors = (validate) => {
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
    const register = () => {
        if (email === '') {
            feedback('info', `Please enter your email.`);
            return;
        }
        let validate = validateRegister(password);
        if (validate.length > 0) {
            handleErrors(validate);
            return;
        }
        if (password !== repeat_password) {
            feedback('info', `Passwords don't match.`);
            return;
        }
        if (!terms) {
            feedback('info', `Please accept terms and conditions.`);
            return;
        }

        fb.auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                resetFields(); 
                history.push('/home/newUser');
            })
            .catch(error => {
                feedback('error', error.message)
            })
    }
    const handleSubmit = (e) => {
        if (e.key === "Enter" || e.target.textContent === 'Submit') {
            tab === 'Login'
                ? signIn()
                : register();
        }
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        if (tab === 'Register') {
            let validate = validateRegister(e.target.value);
            if (validate.length > 0) {
                handleErrors(validate)
                return;
            }
            setErrors([])
        }
    }
    const handleRepeatPassword = (e) => {
        setRepeat_Password(e.target.value);
    }
    const handleTerms = () => {
        setTerms(terms ? false : true)
    }

    return (user === null &&
        <form
            onKeyPress={handleSubmit}
            className={classes.form} >
            <div
                id={tab}
                className={classes.card}>
                <Typography
                    align='center'
                    variant='h4'
                    component='header'
                    className={classes.header}>
                    Welcome to NinjaSubs!
                </Typography>
                <Typography
                    align='center'
                    variant='h5'
                    component='header'
                    className={classes.header}>
                    {tab}
                </Typography>
                <CardContent
                    className={classes.cardContent1}>

                    <TextField
                        fullWidth
                        classes={{ root: classes.input }}
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleEmail} />

                    <Password props={{ password, errors, handlePassword, classes }} />

                    {tab !== 'Register' ? null :
                        <TextField
                            fullWidth
                            classes={{
                                root: classes.input,
                            }}
                            type='password'
                            value={repeat_password}
                            placeholder='Repeat password'
                            onChange={handleRepeatPassword} />
                    }

                    {tab !== 'Register' ? null :
                        <div className={classes.terms}>
                            <a href={constants.terms}
                                target='_blank' rel="noopener noreferrer">Terms and Conditions</a>
                            <Checkbox
                                color='primary'
                                onChange={handleTerms}
                                value={terms}
                                checked={terms} />
                        </div>
                    }

                    <div className={classes.footer}>
                        <Button
                            className={classes.btn}
                            variant='outlined'
                            children='Submit' onClick={handleSubmit} />
                        <Button
                            className={classes.btn}
                            variant='outlined'
                            children={tab === 'Register' ? 'Login' : 'Register'} onClick={switchTab} />
                    </div>

                    {tab !== 'Login' ? null :
                        <SendPassword props={{ classes }} />}
                </CardContent>
            </div>
        </form>
    )
}

