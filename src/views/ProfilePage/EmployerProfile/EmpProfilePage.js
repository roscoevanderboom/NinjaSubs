import React, { useContext } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {
  Typography, Container
} from "@material-ui/core";
// Reactstrap components
import { Row, Col } from 'reactstrap';
// Custom components
import ChangeAvatar from '../ChangeAvatar';
import ProfileDetails from './ProfileDetails';
import ActivePosts from './ActivePosts';
import Footer from '../ProfileFooter';
// Styles
import useStyles from '../styles';

export default function ProfilePage({ props }) {
  const { formData, handleData,
    handleSubmit, handleCancel } = props;

  const { state, constants } = useContext(store);
  const { profileData } = state;

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <Col xs='12' sm='10' lg='8'>
      <Row className='justify-content-around'>
        <Col xs='11' md='7' lg='4'
          className={classes.gridItem}>
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
        </Col>
        <Col xs='11' md='7' lg='6'
          className={classes.gridItem}>
          <Typography
            className={classes.detailsTitle}
            align='center'
            variant='h6'>
            Profile details
        </Typography>
          <ProfileDetails props={{ formData, handleData }} />
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
