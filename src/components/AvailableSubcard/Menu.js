import React from 'react';
import store from 'state';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { defaultFont } from 'assets/jss/material-kit-react';

const useStyles = makeStyles({
  listItem: {
    ...defaultFont,
    fontWeight: 500
  }
})

export default function SubCardMenu({ sub }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state, methods, constants } = React.useContext(store);
  const classes = useStyles();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIgnoreUser = () => {
    if (window.confirm(`Block ${sub.name}?\nYou can unblock user\nfrom Settings page.`)) {
      methods.updateProfileData({
        blackList: constants.add_if_not_included(state.profileData.blackList, sub.uid)
      })
      setAnchorEl(null);
    }
  }

  return (
    <div>
      <IconButton aria-controls="SubCardMenu" aria-haspopup="true" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="SubCardMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} >
        <MenuItem
          className={classes.listItem}
          onClick={handleIgnoreUser}>Ignore user</MenuItem>
      </Menu>
    </div>
  );
}