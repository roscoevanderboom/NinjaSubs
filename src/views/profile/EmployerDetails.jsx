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
    Card, CardHeader, CardBody,
    Row, Col, Label
} from "reactstrap";

const DetailsCard = () => {
    const { state, constants, methods } = useContext(GlobalState);
    const { user, profileData } = state;
    const { updateProfileData, feedback } = methods;
    const { Taipei } = constants;
    const [formData, setFormData] = useState(false)

    const handleData = key => (event) => {
        setFormData({
            ...formData,
            [key]: event.target.value
        });
    }

    const handleSubmit = async () => {
        let res = true     
        if (profileData === formData) {
            console.log('no changes')
            return;
        }
        if (formData.name === null || formData.location === '') {
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
            console.log('updating')           
            updateProfileData(formData);
            return
        }
        console.log('email error')
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

    return (profileData &&
        <Card className="card-user text-dark">
            <CardHeader>
                <h5>Edit Profile</h5>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="schoolName">School Name</label>
                                <Input
                                    id='schoolName'
                                    onChange={handleData('name')}
                                    value={formData && formData.name !== null ? formData.name : ''}
                                    placeholder="School Name"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="email"> Email Address</label>
                                <Input
                                    id='email'                                   
                                    onChange={handleData('email')}
                                    placeholder="Email"
                                    value={formData ? formData.email : ''}
                                    type="email" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="contactPerson">Contact Person</label>
                                <Input
                                    id='contactPerson'
                                    required minLength="1"
                                    onChange={handleData('contact')}
                                    placeholder="Designate a Contact Person"
                                    value={formData ? formData.contact : ''}
                                    type="text" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="phone">Phone Number</label>
                                <Input
                                    required
                                    id='phone'                                    
                                    onChange={handleData('phone')}
                                    placeholder="Add a Phone Number"
                                    value={formData ? formData.phone : ''}
                                    type="text" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="district">District</Label>
                                <Input
                                    required
                                    type="select"
                                    name="district"
                                    id="district"
                                    onChange={handleData('location')}>
                                    <option defaultValue>{!formData || formData.location === ''
                                        ? 'Select District'
                                        : formData.location}
                                    </option>
                                    {Taipei.map((dist, i) =>
                                        <option key={i} >{dist}</option>
                                    )}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label htmlFor="streetAddress">Street Address</label>
                                <Input
                                    required
                                    onChange={handleData('address')}
                                    placeholder="Paste your Google Street Address"
                                    value={formData ? formData.address : ''}
                                    type="text" />
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
