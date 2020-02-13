/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";
import GlobalState from '../../state/store'
// reactstrap components
import {
    Button, Input, Form, FormGroup,
    Card, CardHeader, CardBody, Row, Col
} from "reactstrap";

import { Chip, Switch, TextareaAutosize, makeStyles } from '@material-ui/core';

const styles = makeStyles({
    textArea: {
        height: 'fit-content',
        width: '100%',
        fontSize: '1rem'
    }
})

const DetailsCard = () => {
    const classes = styles();
    const { state, constants, methods, fb } = useContext(GlobalState);
    const { user, profileData } = state;
    const { updateProfileData, feedback } = methods;
    const { Taipei, newSubBoardListing } = constants;
    const [chipsArray, setChipsArray] = useState([]);
    const [formData, setFormData] = useState(false)

    const handleData = key => (event) => {
        setFormData({
            ...formData,
            [key]: event.target.value
        });
    }
    const filterChips = () => {
        let newArray = []
        Taipei.forEach((dist, i) => {
            if (profileData.locations.includes(dist)) {
                newArray.push({
                    name: dist,
                    variant: 'outlined',
                    color: 'primary'
                })
                return;
            }
            newArray.push({
                name: dist,
                variant: 'default'
            })
        })
        setChipsArray(newArray);
    }
    const handleLocations = location => () => {
        if (profileData.locations.includes(location)) {
            profileData.locations.splice(profileData.locations.indexOf(location), 1);
            updateProfileData({ locations: profileData.locations })
            return;
        }
        profileData.locations.push(location);
        updateProfileData({ locations: profileData.locations })
    }
    const handleSubmit = async () => {
        let res = true
        if (profileData === formData) {
            console.log('no changes')
            return;
        }
        if (formData.name === null || formData.locations.length === 0) {
            feedback('error', 'Please fill in all details');
            return;
        }
        if (formData.name !== profileData.name) {
            user.updateProfile({ displayName: formData.name });
        }
        if (formData.email !== profileData.email) {
            user.updateEmail(formData.email)
                .catch((err) => {
                    res = false;
                    feedback('logout', err.message)
                })
        }
        if (res) {
            updateProfileData(formData);
            return
        }
        console.log('email error')
    }
    const createNewSub = () => {
        fb.availableSubs.doc(user.uid)
            .set(newSubBoardListing(profileData))
            .catch((err) => {
                feedback('error', err.message)
                console.log(err)
            })
    }
    const handleAvailable = async () => {
        // if (!isUserVerfied()) {
        //     return;
        // }
        if (profileData.name === null) {
            feedback('error', "You have not added a username");
            return
        }
        updateProfileData({ available: profileData.available ? false : true })
        fb.availableSubs.doc(user.uid)
            .update(newSubBoardListing(profileData))
            .catch((err) => {
                createNewSub();
                console.log(err);
            })
    }

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
        // eslint-disable-next-line
    }, [profileData])
    useEffect(() => {
        if (profileData.email !== user.email) {
            updateProfileData({ email: user.email })
        }
        // eslint-disable-next-line
    }, [profileData])
    useEffect(() => {
        if (profileData.locations !== undefined) {
            filterChips();
        }
        // eslint-disable-next-line
    }, [profileData.locations])

    return (profileData &&
        <Card className="card-user text-dark">
            <CardHeader className='d-flex justify-content-between align-items-center'>
                <h5>Edit Profile</h5>
                <label>
                    Set Availability
                        <Switch
                        onClick={handleAvailable}
                        checked={formData ? formData.available : false}
                        className='ml-2 success' />
                </label>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label>Username</label>
                                <Input
                                    onChange={handleData('name')}
                                    defaultValue={formData && formData.name !== null ? formData.name : ''}
                                    placeholder="Username"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="exampleInputEmail1">
                                    Email address
                          </label>
                                <Input
                                    onChange={handleData('email')}
                                    placeholder="Email"
                                    defaultValue={formData ? formData.email : ''}
                                    type="email" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>About:</label>
                                <TextareaAutosize
                                    className={classes.textArea}
                                    onChange={handleData('bio')}                                    
                                    defaultValue={profileData.bio}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Locations</label>
                                <label className="pl-4 text-danger">
                                    {formData && formData.locations.length > 0 ? null :
                                        'Select districts'}</label>
                                <div>
                                    {chipsArray.map((chip, i) =>
                                        <Chip key={i}
                                            onClick={handleLocations(chip.name)}
                                            className="m-1"
                                            label={chip.name}
                                            clickable={true}
                                            color={chip.color}
                                            variant={chip.variant} />
                                    )}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                                onClick={handleSubmit}
                                className="btn-round"
                                color="primary">
                                Update Profile
                        </Button>
                        </div>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    );
}

export default DetailsCard;
