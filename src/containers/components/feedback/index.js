import React from 'react';

import * as fb from '../../../constants/firebase/constants';

// Components
import { DismissBtn, CustomBtn } from '../buttons';

export const createFeedback = (variant, message, action, duration, enqueueSnackbar, closeSnackbar) => {
    const closeSnack = key => (
        <DismissBtn
            onClick={() => {
                closeSnackbar(key)
            }} />
    );

    const logout = key => (
        <CustomBtn text='Logout'
            onClick={() => {
                fb.handleSignOut()
                closeSnackbar(key)
            }} />
    )
    if (action === undefined) {
        action = closeSnack
    }
   
    switch (variant) {
        case 'success':
            enqueueSnackbar(message, {
                variant,
                autoHideDuration: 2000
            });
            break;
        case 'warning':
            enqueueSnackbar(message, {
                variant,
                action,
                autoHideDuration: duration
            });
            break;
        case 'logout':
            enqueueSnackbar(message, {
                variant: 'error',
                action: logout,
                autoHideDuration: null
            });
            break;
        case 'verifyNewPost':
            enqueueSnackbar(message, {                
                action,
                autoHideDuration: null
            });
            break;
        default:
            enqueueSnackbar(message, {
                variant, action
            });
            break;
    }



};
