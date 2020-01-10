import React from 'react';
// State
import { GlobalState } from '../../state';

// Components
import {
  Button, DialogActions, DialogContent,
  FormControl, TextField, Select,
  InputLabel, MenuItem, Input,
  TextareaAutosize
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
  },
  textarea: {
    border: 'none',
    padding: '8px 10px',
    backgroundColor: 'khaki',
    fontFamily: 'cursive',
    fontSize: 'large'
  }
}))

export default () => {
  const classes = useStyles();
  const { state, methods, constants } = React.useContext(GlobalState);
  const { profileData, user } = state;
  const { handleModals, feedback, updateProfileData } = methods;
  const [formData, setFormData] = React.useState(false);

  const handleData = key => (event) => {
    setFormData({
      ...formData,
      [key]: event.target.value
    });
  }

  const handleSubmit = async () => {
    if (formData.name === null || formData.locations.length === 0) {
      feedback('error', 'Please fill in all details');
      return;
    }
    if (formData.name !== profileData.name) {
      user.updateProfile({ displayName: formData.name });
    }
    updateProfileData(formData)
    handleModals('UpdateUserInfo');
  }

  React.useEffect(() => {
    setFormData(profileData)
  }, [profileData])

  return (profileData && <React.Fragment>
    <DialogContent className={classes.formControl}>
      <TextField
        margin="dense"
        label="Display Name"
        value={formData && formData.name !== null ? formData.name : ''}
        onChange={handleData('name')}
        placeholder='The name employers will see.' />

      <FormControl
        className={classes.input}>
        <InputLabel id="Locations-label">Select Districts</InputLabel>
        <Select
          labelId="Locations-label"
          id="Locations" multiple
          value={formData ? formData.locations : []}
          input={<Input />}
          onChange={handleData('locations')}>
          {
            constants.Taipei.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl>
        <h4>Edit Bio</h4>
        <TextareaAutosize
          placeholder='Click here'
          className={classes.textarea}
          onChange={handleData('bio')}
          value={formData ? formData.bio : ''} rows='5' />
      </FormControl>

    </DialogContent>

    <DialogActions>
      <Button onClick={handleSubmit} variant='outlined' color="primary">
        Submit
      </Button>
    </DialogActions>
  </React.Fragment>)
}
