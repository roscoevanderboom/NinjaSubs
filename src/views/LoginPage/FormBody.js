import React from "react";
// @material-ui/core components
import { InputAdornment, Checkbox } from "@material-ui/core";
// @material-ui/icons
import { Email, People, Replay } from "@material-ui/icons"
// core components
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import PasswordInput from './Password';


export default ({ props }) => {
    const { classes, title, data, errors, handleData } = props;

    return (
        <CardBody>
            {title === "Login" ? null :
                <CustomInput
                    labelText="Username.."
                    id="username"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                        value: data.username,
                        onChange: (e) => handleData('username', e.target.value),
                        endAdornment: (
                            <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                            </InputAdornment>
                        )
                    }} />
            }

            <CustomInput
                labelText="Email..."
                id="email"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "email",
                    value: data.email,
                    onChange: (e) => handleData('email', e.target.value),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                    )
                }}
            />

            <PasswordInput
                errors={errors}
                handleData={handleData}
                password={data.password} />

            {title === "Login" ? null :
                <CustomInput
                    labelText="Repeat Password"
                    id="repeat-pass"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "password",
                        value: data.repeatPass,
                        onChange: (e) => handleData('repeatPass', e.target.value),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Replay className={classes.inputIconsColor} />
                            </InputAdornment>
                        ),
                        autoComplete: "off"
                    }}
                />}

            {title === 'Login' ? null :
                <div className='row justify-content-center align-items-center'>
                    <a href='https://www.termsandconditionsgenerator.com/live.php?token=cUjuC2S5w2vTipxpiAQVx56WBJZReus7'
                        target='_blank' rel="noopener noreferrer">Terms and Conditions</a>
                    <Checkbox
                        color='primary'
                        onChange={() => handleData('terms', data.terms ? false : true)}
                        value='terms'
                        checked={data.terms} />
                </div>
            }
        </CardBody>
    );
}
