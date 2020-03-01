import React, { useContext, useState } from "react";
// Store
import store from 'state';
// Form validation
import { validatePassword, handleErrors, validateRegister } from './validation'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

// Form components
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import FormFooter from './FormFooter';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const initState = {
  username: '',
  email: '',
  password: '',
  repeatPass: '',
  terms: false
}

export default function LoginPage() {
  const { fb, methods, hist } = useContext(store);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [data, setData] = useState(initState);
  const [title, setTitle] = useState('Register');
  const [errors, setErrors] = useState([]);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const handleTitle = () => {
    title === "Login" ? setTitle('Register') : setTitle('Login');
  };
  const resetData = () => {
    setData(initState)
  };
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
    if (key === 'password' && title === 'Register') {
      let validate = validatePassword(value);
      if (validate.length > 0) {
        handleErrors(validate, setErrors)
        return;
      }
      setErrors([])
    }
  };
  const register = () => {
    if (!validateRegister(data, methods.feedback, setErrors)) {
      return;
    }    
    fb.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        let newUserData = {
          name: data.username,
          email: res.user.email,
          uid: res.user.uid
        };        
        fb.createProfileData(res.user, newUserData);
      })
      .catch(error => {
        methods.feedback('error', error.message)
      })
  };
  const login = () => {
    fb.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        resetData();
      })
      .then(() => {
        hist.push('/profile-page');
      })
      .catch(error => {
        methods.feedback('error', error.message);
      })
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter" || e.target.textContent === 'Submit' || e.target.textContent === 'Sign In') {
      title === 'Login'
        ? login()
        : register();
    }
  };

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form onKeyPress={handleSubmit} className={classes.form}>

                <FormHeader props={{ classes, title }} />

                <FormBody props={{ classes, title, data, errors, handleData }} />

                <FormFooter props={{ classes, title, handleSubmit, handleTitle }} />
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
