import React from 'react';
// State
import { GlobalState } from '../../state';
// Constants
import { Taipei } from '../../constants';
// Components
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Input,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
// Style
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 250,
    marginBottom: 12,
    [theme.breakpoints.up('sm')]: {
      width: 450
    }
  }
}))

export default () => {
  const classes = useStyles();
  const { state, methods } = React.useContext(GlobalState);
  const { user, profileData } = state;
  const { handleModals, feedback, updateProfileData } = methods;

  const [formData, setformData] = React.useState(false);

  const handleData = key => (e) => {
    setformData({
      ...formData,
      [key]: e.target.value
    })
  }
  const handleSubmit = async () => {
    if (formData.name === null || formData.location === '') {
      feedback('error', 'Please fill in all details')
      return;
    }
    if (formData.name !== profileData.name) {
      user.updateProfile({ displayName: formData.name });
    }
    updateProfileData(formData)
    handleModals('UpdateUserInfo');
  }
  React.useEffect(() => {
    setformData(profileData);
  }, [profileData])

  return (<React.Fragment>
    <DialogContent className={classes.formControl}>
      <TextField
        margin="dense"
        label="School Name"
        value={formData && formData.name !== null ? formData.name : ''}
        onChange={handleData('name')}
        placeholder='This is your display name' />

      <TextField
        label="Contact person"
        id='contact'
        margin="dense"
        value={formData ? formData.contact : ''}
        onChange={handleData('contact')}
        placeholder='Contact person' />

      <FormControl>
        <InputLabel id="Locations-label">Select District</InputLabel>
        <Select
          labelId="Locations-label"
          id="Locations"
          value={formData ? formData.location : ''}
          input={<Input />}
          onChange={handleData('location')}>
          {
            Taipei.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <TextField
        margin="dense"
        label="Street Address"
        value={formData ? formData.address : ''}
        onChange={handleData('address')}
        placeholder='Paste your Google address' />

      <TextField
        margin="dense"
        label="Phone number"
        value={formData ? formData.phone : ''}
        onChange={handleData('phone')}
        placeholder='Phone number' />

    </DialogContent>

    <DialogActions>
      <Button variant='outlined' onClick={handleSubmit} color="primary">
        Submit
      </Button>
    </DialogActions>
  </React.Fragment>)
}
