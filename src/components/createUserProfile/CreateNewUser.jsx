import React from 'react';
import GlobalState from '../../state/store';

// Components
import { Card, CardTitle, CardBody, Button } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#000000d6',
        // backgroundImage: `url('https://source.unsplash.com/featured/?landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: '1000'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        marginTop: 30,
        marginBottom: 30
    },
    header: {
        fontSize: 'x-large',
        textAlign: 'center',
    }
}))

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb, setState, hist } = React.useContext(GlobalState);
    const { user, createUserProfile } = state;
    const { setCreateUserProfile } = setState;
    const { feedback } = methods;
    const { newSubData, newEmployerData, newUser } = constants;

    const createNewUserProfile = sub => () => {
        let data = newUser(user);
        sub
            ? data = { ...data, ...newSubData }
            : data = { ...data, ...newEmployerData };

        if (user.uid !== undefined) {
            fb.users.doc(user.uid).set({ ...data })
                .then(() => {                   
                    setCreateUserProfile(false);
                    hist.push('/home/userProfile')
                })
                .catch(err => {
                    feedback('error', err.message)
                });
            return;
        }
    }

    return (createUserProfile && 
        <div className={classes.body}>
            <Card className={classes.card}>
                <CardBody className={classes.content}>
                    <CardTitle className='text-dark' tag="h5">Choose your path</CardTitle>
                    <br></br>
                    <Button
                        variant='outlined'
                        onClick={createNewUserProfile(true)}
                        children={`Substitute`} />
                    <div className='text-dark'>or</div>
                    <Button
                        variant='outlined'
                        onClick={createNewUserProfile(false)}
                        children={`Employer`} />
                </CardBody>
            </Card>
        </div>
    );
}
