import React, { useContext, useState, useEffect } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {
  Typography, Container
} from "@material-ui/core";
// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
// Custom components
import ChangeAvatar from '../ChangeAvatar';
import ProfileDetails from './ProfileDetails';
import ActivePosts from './ActivePosts';
// Styles
import useStyles from '../styles';

export default function ProfilePage({ props }) {
  const { formData, handleData,
    handleSubmit, handleCancel } = props;

  const { state, constants, methods } = useContext(store);
  const { user, profileData } = state;
  const { isArrayEqual } = constants;
  const { updateProfileData } = methods;
  const [stars, setStars] = useState([]);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const setRating = () => {
    let count = []
    if (profileData.name !== null) {
      count.push('name');
    }
    if (profileData.image !== constants.noUserImage) {
      count.push('image');
    }
    if (profileData.bio !== '') {
      count.push('bio');
    }
    if (user.emailVerified) {
      count.push('verified');
    }
    setStars(count);
    if (isArrayEqual(count, profileData.rating)) {
      return;
    }
    if (count !== profileData.rating) {
      updateProfileData({ rating: count })
    }
  }

  useEffect(() => {
    console.log('TODO -- finish rating function');
    
    if (profileData.rating !== undefined) {
      setRating();
    }
    // eslint-disable-next-line
  }, [profileData.rating])

  return (
    <React.Fragment>
      <GridItem
        className={classes.gridItem}
        xs={12} sm={12} md={5}>
        <div className={classes.profile}>
          <div>
            <img alt="..."
              style={{ marginRight: '-32px' }}
              src={formData ? formData.image : constants.noImage}
              className={imageClasses} />
            <ChangeAvatar />
          </div>
          <div className={classes.name}>
            <h3 className={classes.title}>{formData ? formData.name : ''}</h3>
          </div>
        </div>
        <Container className={classes.activePostsContainer}>
          <Typography
            className={classes.districtTitle}
            align='center'
            variant='h6'>
            Active Posts
          </Typography>
          <ActivePosts />
        </Container>
      </GridItem>

      <GridItem
        className={classes.gridItem}
        xs={12} sm={12} md={6}>
        <Typography
          className={classes.detailsTitle}
          align='center'
          variant='h6'>
          Profile details
        </Typography>
        <ProfileDetails props={{ formData, handleData }} />


        {formData === profileData ? null :
          <Container className='row justify-content-around'>
            <Button
              size='lg'
              color='info'
              onClick={handleSubmit}>
              Update
            </Button>
            <Button
              size='lg'
              color='danger'
              onClick={handleCancel}>
              Cancel
            </Button>
          </Container>
        }
      </GridItem>
    </React.Fragment>
  );
}
