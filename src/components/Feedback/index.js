import React from 'react';

// Components
import { DismissBtn, LogoutBtn } from '../Buttons';

export const createFeedback = (variant, message, enqueueSnackbar, closeSnackbar, hist) => {
    const dismiss = key => (
        <DismissBtn props={{ key, closeSnackbar }} />
    )

    const logout = key => (
        <React.Fragment>
            <LogoutBtn props={{ key, closeSnackbar, hist }} />
            <DismissBtn props={{ key, closeSnackbar }} />
        </React.Fragment>

    )

    switch (variant) {
        case 'success':
            enqueueSnackbar(message, {
                variant, autoHideDuration: 2000
            });
            break;
        case 'warning':
            enqueueSnackbar(message, {
                variant,
                action: dismiss
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
                autoHideDuration: null,
                action: dismiss
            });
            break;
        default:
            enqueueSnackbar(message, {
                variant
            });
            break;
    }



};
