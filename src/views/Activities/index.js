import React, { useContext, useState, useEffect } from "react";
// Store
import store from "state";
// Filters
import { filterSubActivities, filterEmpActivities } from "constants/filters";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, Avatar } from "@material-ui/core";
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Custom components
import { SubstituteActions } from "./SubActivities";
import { EmployerActions, CreatePost } from "./EmpActivities";
import PostBody from "components/NoticeboardCard/PostBody";
import ListHeader from 'components/EmptyListHeader';
// Styles
import { body, bodyContainer } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body,
    marginTop: 12,
  },
});

const Activities = () => {
  const classes = useStyles();
  const { state } = useContext(store);
  const { profileData, noticeboardQuery } = state;
  const [list, setList] = useState([]);

  const dataReady = noticeboardQuery && profileData;
  const subTitle = profileData.type === "Substitute" && list.length === 0 
  const empTitle = profileData.type === "Employer" && list.length === 0 

  useEffect(() => {
    if (dataReady && profileData.type === "Substitute") {
      setList(filterSubActivities(noticeboardQuery, profileData));
    } else if (dataReady && profileData.type === "Employer") {
      setList(filterEmpActivities(noticeboardQuery, profileData));
    }
    // eslint-disable-next-line
  }, [profileData, noticeboardQuery]);

  return (
    <div>
      <Header
        brand="NinjaSubs"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
      />
      <div className={classes.body}>
        <div className={bodyContainer}>
          {profileData.type === "Employer" && <CreatePost />}
          {subTitle && <ListHeader text='You have not applied to any positions yet.' />}
          {empTitle && <ListHeader text='You have not created any positions yet.' />}
          <React.Fragment>
            {list.map((post, i) => (
              <Card key={i} className="mt-2 w-100">
                <CardHeader
                  className="text-dark"
                  avatar={<Avatar src={post.image} alt="avatar" />}
                  title={post["School name"]}
                  subheader={post.location}
                  action={
                    profileData.type === "Employer" ? (
                      <EmployerActions post={post} />
                    ) : (
                      <SubstituteActions post={post} />
                    )
                  }
                />
                <PostBody post={post} />
              </Card>
            ))}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Activities;
