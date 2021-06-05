import React, { useContext } from 'react';
import store from 'state';
import { handleProfileData } from "../../actions/user";
// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
// custom components
import SettingsItem from './SettingsItem';
import SmallDialog from "components/SmallDialogs/index";

export default () => {
    const [value, setValue] = React.useState("");
    const { state, feedback } = useContext(store);
    const { user } = state;

    const handleValue = (e) => setValue(e.target.value);

    const handleSubmit = async () => {
        await user
            .updateEmail(value)
            .then(() => {
                handleProfileData({
                    action: "update",
                    user, data: { email: value }
                })
                    .then(() => feedback("success", "Email address changed"))
            })
            .catch(function (error) {
                feedback("logout", error.message);
            });

    };

    return (
        <React.Fragment>
            <SettingsItem
                text='Change your email address.'
                icon={
                    <SmallDialog
                        id="change-email"
                        lable="Enter a new email address"
                        type="text"
                        value={value}
                        icon={<Mail />}
                        handleValue={handleValue}
                        handleSubmit={handleSubmit}
                        Trigger={Mail}
                    />} />
        </React.Fragment>

    )
}
