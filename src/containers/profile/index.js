import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../state';

// Components
import Substitute from './SubProfile';
import Employer from './EmployerProfile';

export default () => {
    const { state, methods, fb } = useContext(GlobalState);
    const { profileData, modals, classes, user } = state;
    const { setModals, feedback } = methods;
    const [count, setCount] = useState(0);

    const checkVerification = () => {
        if (user.emailVerified) {
            return;
        }
        if (profileData.emailSent && !user.emailVerified) {            
            feedback('warning', 'User is not verified.\nEmail has been sent\nPlease check your email')
            return;
        }
        if (!profileData.emailSent && !user.emailVerified) {
            fb.handleVerification(user);
            return;
        }
    }
 
    useEffect(() => {
        console.log('TODO -- Re-activate checkVerification')
    }, []) 
    useEffect(() => {
        if (profileData.name === null) {
            setModals({ ...modals, UpdateUserInfo: true });
            return;
        }
        // eslint-disable-next-line
    }, [profileData])

    useEffect(() => {       
        if (user && profileData && count === 0) {
            // checkVerification();
            setCount(count => count + 1)
            return;
        }
        // eslint-disable-next-line
    }, [profileData]);

    return (profileData &&
        <div
            className={classes.root}>
            {profileData.type === 'Employer'
                ? <Employer />
                : <Substitute />}
        </div>
    )
}