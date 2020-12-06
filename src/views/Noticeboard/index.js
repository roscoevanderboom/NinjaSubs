import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// Constants
import { filterNoticeboard } from "../../constants/filters";
// @material-ui/core components
import { makeStyles } from "@material-ui/core";
// Custom components
import Button from "components/CustomButtons/Button";
import Card from 'components/NoticeboardCard/Card';
import ListHeader from 'components/EmptyListHeader';
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { body, bodyContainer } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body
  }
});

export default () => {
  const { state } = useContext(store);
  const { profileData, noticeboardQuery } = state;
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useState(['Full-Time', 'Part-time', 'Tutoring']);

  const FilterBtn = (props) => (
    <Button
      color={searchParams.includes(props.param) ? 'primary' : 'transparent'}
      className='p-2 col-3'
      onClick={handleSearchParams(`${props.param}`)}>
      {props.children}
    </Button>
  )

  const handleSearchParams = (key) => () => {
    if (!searchParams.includes(key)) {
      setSearchParams(searchParams => searchParams.concat(key))
    } else if (searchParams.includes(key)) {
      setSearchParams(searchParams.filter(param => param !== key))
    }
  }

  useEffect(() => {
    if (profileData && noticeboardQuery) {
      const methodProps = { noticeboardQuery, searchParams, profileData }
      profileData.type === 'Substitute'
        ? setList(filterNoticeboard('SUBSTITUTE', methodProps))
        : setList(filterNoticeboard('EMPLOYER', methodProps))
    }
    // eslint-disable-next-line
  }, [noticeboardQuery, profileData, searchParams]);

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
          <div className='row w-100 bg-dark mt-1 justify-content-center'>
            <FilterBtn param='Full-Time' >Full-time</FilterBtn>
            <FilterBtn param='Part-time' >Part-time</FilterBtn>
            <FilterBtn param="Tutoring" >Tutoring</FilterBtn>
          </div>
          {list.length > 0 ? null :
            <ListHeader text='No positions available' />
          }
          {list.map((post, i) => <Card key={i} post={post} />)}
        </div>
      </div>
    </div>
  );
}
