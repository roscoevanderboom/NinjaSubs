import React, { useContext, useState, useEffect } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import Parallax from "components/Parallax/Parallax.js";
// Custom components
import SubProfile from './SubProfile/SubProfilePage';
import EmpProfile from './EmployerProfile/EmpProfilePage';
// Styles
import useStyles from './styles';
// Form validation
import validate from './formvalidation';

export default function ProfilePage() {
    const classes = useStyles();
    const { state, methods } = useContext(store);
    const { user, profileData } = state;
    const { updateProfileData, feedback } = methods;
    const [formData, setFormData] = useState(false);

    const handleData = (key, value) => {
        setFormData({
            ...formData, [key]: value
        });
    }
    const handleSubmit = () => {
        let res = validate(profileData, formData, user, feedback);
        if (res) {
            updateProfileData(formData);
        }
    }
    const handleCancel = () => {
        setFormData(profileData);
    }

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
        // eslint-disable-next-line
    }, [profileData])

    return (
        <div>
            <Header
                brand="NinjaSubs"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 100,
                    color: "white"
                }}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className='d-flex justify-content-center'>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="space-between">
                                {profileData.type === 'Substitute'
                                    ? <SubProfile props={{
                                        formData, handleData,
                                        handleSubmit, handleCancel
                                    }} />
                                    : <EmpProfile props={{
                                        formData, handleData,
                                        handleSubmit, handleCancel
                                    }} />}
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
