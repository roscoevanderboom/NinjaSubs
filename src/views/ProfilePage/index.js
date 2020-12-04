import React, { useContext, useState, useEffect } from "react";
// Store
import store from "state";
// Actions
import { handleProfileData } from "../../actions/user";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// Custom components
import SubProfile from "./SubProfile/SubProfilePage";
import EmpProfile from "./EmployerProfile/EmpProfilePage";
// Styles
import useStyles from "./styles";
// Form validation
import validate from "./formvalidation";

export default function ProfilePage() {
    const classes = useStyles();
    const { state, feedback } = useContext(store);
    const { user, profileData } = state;
    const [formData, setFormData] = useState(false);

    const handleData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };
    const handleSubmit = () => {
        if (user === null) {
            return;
        }
        let res = validate(profileData, formData, user, feedback);
        if (res) {
            handleProfileData({ action: "update", user, data: formData })
                .then(() => feedback("success", "Profile has been updated"))
                .catch((err) => feedback("error", err));
        }
    };
    const handleCancel = () => {
        setFormData(profileData);
    };

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
        // eslint-disable-next-line
    }, [profileData]);

    return (
        <div>
            <Header
                brand="NinjaSubs"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 100,
                    color: "white",
                }}
            />
            <div className={classes.body}>
                <div className={classes.profileContainer}>
                    {profileData.type === "Substitute" ? (
                        <SubProfile
                            props={{
                                formData,
                                handleData,
                                handleSubmit,
                                handleCancel,
                            }}
                        />
                    ) : (
                            <EmpProfile
                                props={{
                                    formData,
                                    handleData,
                                    handleSubmit,
                                    handleCancel,
                                }}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}
