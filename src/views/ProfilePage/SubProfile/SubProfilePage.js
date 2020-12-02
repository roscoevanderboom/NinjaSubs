import React, { useContext, useState, useEffect } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// Constants
import { newSubBoardListing, isArrayEqual, noUserImage, ninjaStar } from '../../../constants'
import * as collections from '../../../constants/firebase/collections';
// Actions
import { handleProfileData } from '../../../actions/user';
// @material-ui/core components
import {
  Typography, Tooltip, InputAdornment, Badge,
  Container, FormControlLabel, Switch
} from "@material-ui/core";
// @material-ui/icons
import { Email, AccountBox } from "@material-ui/icons";
// Reactstrap components
import { Row, Col } from 'reactstrap';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput";
// Custom components
import ProfileImage from '../ProfileImage';
import DistrictCollapse from './DistrictCollapse';
import Footer from '../ProfileFooter';
// Styles
import useStyles from '../styles';

export default function ProfilePage({ props }) {
  const { formData, handleData,
    handleSubmit, handleCancel } = props;

  const { state, feedback } = useContext(store);
  const { user, profileData, availableSubs } = state;

  const [likes, setLikes] = useState(0);
  const [stars, setStars] = useState([]);

  const classes = useStyles();

  const heartIcon = classNames(
    classes.heartIcon,
    'fas fa-heart',
  )

  const handleUpdate = () => {
    handleProfileData({
      action: 'update',
      user,
      data: { available: profileData.available ? false : true }
    })
  }

  const createNewSub = () => {
    if (profileData.name === '') {
      window.alert('Please give yourself a display name and click update.');
      return;
    }
    collections.availableSubs.doc(user.uid)
      .set(newSubBoardListing(profileData))
      .then(() => {
        handleUpdate();
      })
      .catch((err) => {
        feedback('error', err.message)
      })
  }
  const handleAvailable = () => {
    if (user === null) {
      return;
    }
    collections.availableSubs.doc(user.uid)
      .update(newSubBoardListing(profileData))
      .then(() => {
        handleUpdate();
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
    if (profileData.image !== noUserImage) {
      count.push('image');
    }
    if (profileData.bio !== '') {
      count.push('bio');
    }
    if (user.emailVerified) {
      count.push('verified');
    }
    if (profileData.locations.length > 0) {
      count.push('locations');
    }

    setStars(count);
    if (isArrayEqual(count, profileData.rating)) {
      return;
    }
    if (count !== profileData.rating) {
      handleProfileData({ action: 'update', user, data: { rating: count } })
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
    <Col xs='12' sm='10' lg='8'>
      <Row className='justify-content-around'>
        <Col xs='11' md='7' lg='4'
          className={classes.gridItem}>
          <ProfileImage formData={formData} />

          <div className='d-flex align-items-center justify-content-around w-100 mt-2 mb-3'>
            <Tooltip placement='right'
              title='Likes'>
              <Badge badgeContent={likes}>
                <i className={heartIcon} />
              </Badge>
            </Tooltip>
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
            <Tooltip placement='left'
              title='Profile Rating'>
              <Badge badgeContent={stars.length}>
                <img src={ninjaStar} width='30' height='30' alt='ninjaStar' />
              </Badge>
            </Tooltip>
          </div>
          <Typography
            className={classes.districtTitle}
            align='center'
            variant='h6'>
            Districts
        </Typography>
          <DistrictCollapse style={classes.districtTitle} />
        </Col>
        <Col xs='11' md='7' lg='6'
          className={classes.gridItem}>
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
            <Footer
              handleSubmit={handleSubmit}
              handleCancel={handleCancel} />
          }
        </Col>
      </Row>
    </Col>
  );
}
