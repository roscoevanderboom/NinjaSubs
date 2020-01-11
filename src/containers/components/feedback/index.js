import React from 'react';

// Components
import { DismissBtn, LogoutBtn } from '../buttons';

export const createFeedback = (variant, message, action, duration, enqueueSnackbar, closeSnackbar) => {
    const dismiss = key => (
        <DismissBtn key={key} close={closeSnackbar} />
    )

    const logout = key => (
        <React.Fragment>
            <LogoutBtn key={key} close={closeSnackbar} />
            <DismissBtn key={key} close={closeSnackbar} />
        </React.Fragment>

    )
    if (action === undefined) {
        action = dismiss
    }

    switch (variant) {
        case 'success':
            enqueueSnackbar(message, {
                variant             
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
                variant: 'warning',
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
