import React from 'react';
import { GlobalState } from '../../state';

// Components
import {
    CardContent, Card, Button, Typography
} from '@material-ui/core';

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
        top: `-60px`,
        left: 0
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
    }
}))

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = React.useContext(GlobalState);
    const { user, history } = state;
    const { feedback } = methods;
    const { newSubData, newEmployerData, newUser } = constants;    

    const createNewUserProfile = sub => () => {
        let data = newUser(user);
        sub
            ? data = { ...data, ...newSubData }
            : data = { ...data, ...newEmployerData };

        if (user.uid !== undefined) {
            fb.users.doc(user.uid).set({ ...data })
                .then(() => { history.push('/home/profile') })
                .catch(err => { feedback('error', err.message) });
            return;
        }
    }

    return (
        <div className={classes.body}>
            <Card className={classes.card}>

                <CardContent className={classes.content}>
                    <Typography
                        align='center'
                        variant='h4'
                        component='h4'>Welcome to SubNinjas!!</Typography>
                    <br></br>
                    <Typography
                        align='center'
                        variant='h6'
                        component='h6'>Choose your path</Typography>
                    <br></br>
                    <Button
                        variant='outlined'
                        onClick={createNewUserProfile(true)}
                        children={`Substitute`} />
                    <h3 className={classes.h3}>or</h3>
                    <Button
                        variant='outlined'
                        onClick={createNewUserProfile(false)}
                        children={`Employer`} />
                </CardContent>
            </Card>
        </div>
    );
}
