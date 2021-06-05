import React, { useContext } from 'react';
import store from 'state';
import { handleProfileData } from "../../actions/user";
// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
// custom components
import SettingsItem from './SettingsItem';
import SmallDialog from "components/SmallDialogs/index";

export default () => {
    const [value, setValue] = React.useState("");
    const { state, feedback } = useContext(store);
    const { user } = state;

    const handleValue = (e) => setValue(e.target.value);

    const handleSubmit = () => {
        user
            .updateProfile({ displayName: value })
            .then(() => {
                handleProfileData({
                    action: "update",
                    user, data: { name: value }
                })
                .then(() => feedback("success", "Display name changed"))
            })
            .catch(function (error) {
                feedback("logout", error.message);
            });
    };

    return (
        <React.Fragment>
            <SettingsItem
                text='Change your display name.'
                icon={
                    <SmallDialog
                        id="change-displayName"
                        lable="Enter a new name"
                        type="text"
                        value={value}
                        icon={<AccountBox />}
                        handleValue={handleValue}
                        handleSubmit={handleSubmit}
                        Trigger={AccountBox}
                    />} />
        </React.Fragment>

    )
}