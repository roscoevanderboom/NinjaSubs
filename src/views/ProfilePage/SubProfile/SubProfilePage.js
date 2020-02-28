import React, { useContext, useState, useEffect } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {
  Typography, Tooltip, InputAdornment, Badge,
  Container, FormControlLabel, Switch
} from "@material-ui/core";
// @material-ui/icons
import { Email, AccountBox } from "@material-ui/icons";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput";
// Custom components
import DistrictCollapse from './DistrictCollapse';
import ChangeAvatar from '../ChangeAvatar';
// Styles
import useStyles from '../styles';

export default function ProfilePage({ props }) {
  const { formData, handleData,
    handleSubmit, handleCancel } = props;

  const { state, constants, methods, fb } = useContext(store);
  const { user, profileData, availableSubs } = state;
  const { newSubBoardListing, isArrayEqual } = constants;
  const { updateProfileData, feedback, isUserVerfied } = methods;

  const [likes, setLikes] = useState(0);
  const [stars, setStars] = useState([]);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const heartIcon = classNames(
    classes.heartIcon,
    'fas fa-heart',
  )

  const createNewSub = () => {
    fb.availableSubs.doc(user.uid)
      .set(newSubBoardListing(profileData))
      .catch((err) => {
        feedback('error', err.message)
      })
  }
  const handleAvailable = () => {
    // if (!isUserVerfied()) {
    //   return;
    // }
    fb.availableSubs.doc(user.uid)
      .update(newSubBoardListing(profileData))
      .then(() => {
        updateProfileData({ available: profileData.available ? false : true })
      })
      .catch((err) => {
        createNewSub();
      })
  }
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
    if (profileData.rating !== undefined) {
      setRating();
    }
    // eslint-disable-next-line
  }, [profileData.rating])

  useEffect(() => {
    if (availableSubs && profileData.type === 'Substitute') {
      let me = availableSubs.filter(sub => sub.uid === profileData.uid);
      if (me.length > 0) {
        setLikes(me[0].likes.length);
        return;
      }
    }
    // eslint-disable-next-line
  }, [availableSubs])

  return (
    <React.Fragment>
      <GridItem
        className={classes.gridItem}
        xs={12} sm={12} md={5}>
        <div className={classes.profile}>
          <div>
            <img style={{ marginRight: '-32px' }} src={formData ? formData.image : constants.noImage} alt="..." className={imageClasses} />
            <ChangeAvatar />
          </div>
          <div className={classes.name}>
            <h3 className={classes.title}>{formData ? formData.name : ''}</h3>
            <FormControlLabel
              control={
                <Switch
                  checked={profileData.available}
                  onChange={handleAvailable}
                  value="availability"
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    thumb: classes.switchIcon,
                    track: classes.switchBar
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Availability" />
            <Tooltip placement='right'
              title='Likes'>
              <Badge badgeContent={likes}>
                <i className={heartIcon} />
              </Badge>
            </Tooltip>
          </div>
        </div>
        <Typography
          className={classes.districtTitle}
          align='center'
          variant='h6'>
          Districts
        </Typography>
        <DistrictCollapse style={classes.districtTitle} />
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
        <GridContainer>
          <GridItem xs={12} sm={6}>
            <CustomInput
              formControlProps={{
                fullWidth: true,
                className: 'mt-3'
              }}
              labelText='Username'
              id='username'
              inputProps={{
                type: 'text',
                value: formData ? formData.name : '',
                onChange: (e) => handleData('name', e.target.value),
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountBox className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <CustomInput
              formControlProps={{
                fullWidth: true,
                className: 'mt-3'
              }}
              labelText='Email'
              id='email'
              inputProps={{
                type: 'email',
                value: formData ? formData.email : '',
                onChange: (e) => handleData('email', e.target.value),
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }} />
          </GridItem>
        </GridContainer>

        <Typography
          className={classes.districtTitle}
          align='center'
          variant='h6'>
          About me
        </Typography>
        <Container className='mb-3'>
          <textarea
            onChange={(e) => handleData('bio', e.target.value)}
            value={formData ? formData.bio : ''}
            className={classes.textarea}
            placeholder='Introduce yourself...'>
          </textarea>
        </Container>
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
