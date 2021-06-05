import React, { useContext } from "react";
// Store
import store from 'state';
// Reactstrap components
import { Row, Col } from 'reactstrap';
// Custom components
import ProfileImage from '../ProfileImage';
import ProfileDetails from './ProfileDetails';
import ActivePosts from './ActivePosts';
// Styles
import useStyles from '../styles';

export default function ProfilePage() {
  const { state } = useContext(store);
  const { profileData } = state;
  const classes = useStyles();

  return (
    <Col xs='12' lg='10'>
      <Row className='justify-content-around'>
        <Col xs='11' md='7' lg='5' xl='4'
          className={classes.gridItem}>

          <ProfileImage profileData={profileData} />

          <ActivePosts />
        </Col>

        <Col xs='11' md='7' lg='6'
          className={classes.gridItem}>         
          <ProfileDetails />
        </Col>
      </Row>
    </Col>
  );
}
