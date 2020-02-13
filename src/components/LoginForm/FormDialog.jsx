import React, { useContext, useState } from 'react';
// State
import GlobalState from '../../state/store';

import { validatePassword, handleErrors, validateRegister } from './validation'

import {
    Button, Dialog, TextField,
    CardContent, Checkbox
} from '@material-ui/core';

import FormHeader from './FormHeader';
import SendPassword from './SendPassword';
import Password from './Password';

import { useStyles } from './styles';

const initState = {
    email: '',
    password: '',
    repeatPass: '',
    terms: false
}

export default function LoginForm() {
    const classes = useStyles();
    const { state, methods, fb, constants, hist } = useContext(GlobalState);

    const [data, setData] = useState(initState)
    const [tab, setTab] = useState('Login');
    const [errors, setErrors] = useState([]);

    const switchTab = () => {
        tab === 'Login'
            ? setTab('Register')
            : setTab('Login')
    }
    const handleData = (key, value) => {
        setData({ ...data, [key]: value })
        if (key === 'password' && tab === 'Register') {
            let validate = validatePassword(value);
            if (validate.length > 0) {
                handleErrors(validate, setErrors)
                return;
            }
            setErrors([])
        }
    }
    const resetData = () => {
        setData(initState)
    }
    const register = () => {
        if (!validateRegister(data, methods.feedback, setErrors)) {
            return;
        }
        fb.auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => { 
                resetData(); 
                hist.push('/newUser') 
            })
            .catch(error => { 
                methods.feedback('error', error.message) })
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter" || e.target.textContent === 'Submit') {
            tab === 'Login'
                ? fb.signIn(data, resetData, methods.feedback)
                : register();
        }
    }

    return (
        <div>
            <Dialog
                classes={{ paper: classes.paper }}
                open={state.modals.LoginForm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <form
                    onKeyPress={handleSubmit}>
                    <div
                        id={tab}
                        className={classes.card}>
                        <FormHeader props={{ tab, classes }} />

                        <CardContent
                            className={classes.cardContent1}>

                            <TextField
                                fullWidth
                                classes={{ root: classes.input }}
                                type='email'
                                placeholder='Email'
                                value={data.email}
                                onChange={(e) => handleData('email', e.target.value)} />

                            <Password props={{
                                password: data.password,
                                errors,
                                handleData,
                                classes
                            }} />

                            {tab !== 'Register' ? null :
                                <TextField
                                    fullWidth
                                    classes={{
                                        root: classes.input,
                                    }}
                                    type='password'
                                    value={data.repeatPass}
                                    placeholder='Repeat password'
                                    onChange={(e) => handleData('repeatPass', e.target.value)} />
                            }

                            {tab !== 'Register' ? null :
                                <div className={classes.terms}>
                                    <a href={constants.terms}
                                        target='_blank' rel="noopener noreferrer">Terms and Conditions</a>
                                    <Checkbox
                                        color='primary'
                                        onChange={() => handleData('terms', data.terms ? false : true)}
                                        value={data.terms}
                                        checked={data.terms} />
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
            </Dialog>
        </div>
    );
}