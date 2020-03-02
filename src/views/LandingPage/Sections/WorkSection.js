import React, { useContext, useState } from "react";
// Store
import store from 'state';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  const { fb, methods } = useContext(store);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  }

  const handleSubmit = () => {
    fb.mailbox.doc().set(formData)
      .then(() => {
        methods.feedback('success', 'Your message has been sent!');
      })
      .catch((err) => {
        methods.feedback('error', err.message);
      })
  }

  return (
    <div className='col-12 text-center bg-white pt-2'>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>{`Want to know more?`}</h2>
          <h5 className={classes.description}>
            Send us a message and a friendly ninja will contact you as soon as possible!
          </h5>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: formData.name,
                    onChange: (e) => handleData('name', e.target.value)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: formData.email,
                    onChange: (e) => handleData('email', e.target.value)
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  value: formData.message,
                  onChange: (e) => handleData('message', e.target.value)
                }}
              />
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button color="primary"
                    onClick={handleSubmit}>Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
