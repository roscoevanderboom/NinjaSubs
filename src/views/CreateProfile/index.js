import React, { useContext } from 'react';
// State
import store from 'state';
// Constants
import { newUser, newEmployerData, newSubData } from '../../constants/userProfiles';
import { noUserImage } from '../../constants';
import dojo from "../../assets/img/Dojo.png"
// Actions
import { handleProfileData } from '../../actions/user';
// @material-ui/core components
import {
    Typography, Card,
    CardContent
} from "@material-ui/core";
import CustomButton from "components/CustomButtons/Button";

import bg from 'assets/img/bg.jpg'
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, card, defaultFont } from 'assets/jss/material-kit-react';

const useStyles = makeStyles({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        backgroundColor: 'slategray',
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    card: {
        ...boxShadow,
        ...card,
        maxWidth: 350,
        width: '95%',
        overflowY: 'scroll'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        ...boxShadow,
        ...defaultFont,
        fontWeight: "400",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f8ff26',
        borderRadius: 8
    },
    title: {
        ...defaultFont,
        padding: "20px 0px"
    }
})

export default function CreateProfile() {
    const classes = useStyles();
    const { state, feedback, hist } = useContext(store);

    const createNewUserProfile = userPath => () => {
        let data = newUser(state.user);
        userPath === "substitute"
            ? data = { ...data, ...newSubData }
            : data = { ...data, ...newEmployerData };

        if (state.user.uid !== undefined) {
            handleProfileData({ action: 'update', user: state.user, data: data })
                .then(() =>  hist.push('/profile-page'))
                .catch(err => feedback('error', err.message));
        }
    }

    return (
        <div className={classes.container}>
            <div></div>
            <Card className={classes.card}>
                <Typography
                    component='h1'
                    variant='h4'
                    className={classes.title}
                    align='center'>
                    Choose your path
                </Typography>
                <CardContent className={classes.content} >
                    <img width="auto" height="100" src={noUserImage} alt="ronin" />
                    <CustomButton
                        color='github'
                        onClick={createNewUserProfile('substitute')}
                        children={`Ronin ( Substitute )`} />

                    <Typography
                        variant='subtitle1'
                        className='p-2'
                        align='center'>
                        or
                    </Typography>

                    <img width="auto" height="100" src={dojo} alt="dojo" />

                    <CustomButton
                         color='github'
                        onClick={createNewUserProfile('employer')}
                        children={`Dojo ( Employer )`} />
                </CardContent>
            </Card>
            <div className={classes.footer}>
                Photo by{" "}
                <a
                    href="https://unsplash.com/@alschim"
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer">
                    Alexander Schimmeck
                </a>
                {" "}on{" "}
                <a href='https://unsplash.com/'
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer">
                    Unsplash
                </a>
            </div>
        </div>
    )
}