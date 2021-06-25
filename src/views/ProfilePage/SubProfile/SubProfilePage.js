import React, { useContext, useState, useEffect } from "react";
// Store
import store from "state";
// nodejs library that concatenates classes
import classNames from "classnames";
// Actions
import { changeDisplayName } from "actions/user";
import { handleSubProfile, createNewSub } from "actions/availableSubs";
// Constants
import { ninjaStar } from "../../../constants";
import { setRating } from "../../../constants/starRating";
import { subBoardListing } from "../../../constants/subBoard";
// @material-ui/core components
import { Tooltip, Badge } from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";
// Reactstrap components
import { Row, Col } from "reactstrap";
// Custom components
import ProfileImage from "../ProfileImage";
import AvailableSwitch from "./AvialableSwitch";
import Districts from "./Districts";
import ProfileDetails from "./ProfileDetails";
import LessonPlans from "./LessonPlans";
import VideoLinks from "./VideoLinks";
import Bio from "./Bio";
import { DialogWithoutTrigger } from "../../../components/SmallDialogs";
// Styles
import useStyles from "../styles";

export default function ProfilePage() {
  const { state, feedback } = useContext(store);
  const { user, profileData, availableSubs } = state;

  const [likes, setLikes] = useState(0);
  const [stars, setStars] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const heartIcon = classNames(classes.heartIcon, "fas fa-heart");

  const handleModal = () => setOpen(!open);

  const handleDisplayName = (e) => setDisplayName(e.target.value);

  useEffect(() => {
    if (profileData.rating !== undefined) {
      setRating(user, profileData, setStars);
    }
    // eslint-disable-next-line
  }, [profileData.rating]);

  useEffect(() => {
    if (availableSubs && profileData.type === "Substitute") {
      let me = availableSubs.filter((sub) => sub.uid === profileData.uid);
      if (me.length > 0) {
        setLikes(me[0].likes.length);
        return;
      }
    }
    // eslint-disable-next-line
  }, [availableSubs]);

  useEffect(() => {
    handleSubProfile(user, {
      action: "update",
      data: subBoardListing(profileData),
    }).catch(() => createNewSub(user, profileData));
    // eslint-disable-next-line
  }, [profileData]);

  return (
    <Col xs="12" lg="10">
      <Row className="justify-content-around">
        <Col xs="11" md="7" lg="5" xl="4" className={classes.gridItem}>
          <ProfileImage profileData={profileData} user={user} />

          <div className="d-flex align-items-center justify-content-around w-100 mt-2 mb-3">
            <Tooltip placement="right" title="Likes">
              <Badge badgeContent={likes}>
                <i className={heartIcon} />
              </Badge>
            </Tooltip>
            <AvailableSwitch
              state={state}
              feedback={feedback}
              classes={classes}
            />
            <Tooltip placement="left" title="Profile Rating">
              <Badge badgeContent={stars.length}>
                <img src={ninjaStar} width="30" height="30" alt="ninjaStar" />
              </Badge>
            </Tooltip>
          </div>
          <Districts profileData={profileData} styles={classes.districtTitle} />
        </Col>
        <Col xs="11" md="7" lg="6" className={classes.gridItem}>
          <ProfileDetails />
          <Bio classes={classes} />
          <br />
          <LessonPlans />
          <VideoLinks />
        </Col>
      </Row>
      <DialogWithoutTrigger
        type="text"
        open={user && user.displayName === null}
        handleModal={handleModal}
        id="update-displaName"
        lable="Enter a display name"
        value={displayName}
        icon={<AccountBox />}
        handleValue={handleDisplayName}
        handleSubmit={() => changeDisplayName(user, displayName, feedback)}
      />
    </Col>
  );
}
