import React from 'react';
// Locations array
import { taiwan } from 'constants/locations';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

const locationSettings = taiwan.Taipei;
const mainDistricts = Object.keys(locationSettings);
const subDistricts = Object.values(locationSettings);

export default function DistrictSelect(props) {
    const {
        handleData,
        formControlProps,
        value,
        error,
        white,
        inputRootCustomClasses,
        success,
        endAdornment
    } = props;
    const classes = useStyles();

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });
    const marginTop = classNames({
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = classNames({
        [classes.input]: true,
        [classes.whiteInput]: white
    });
    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.formControl
        );
    } else {
        formControlClasses = classes.formControl;
    }

    return (
        <FormControl fullWidth className={formControlClasses}
            error={value === '' ? true : false }>
            <InputLabel htmlFor="location-select"
                className={classes.labelRoot + " " + labelClasses}>
                District
            </InputLabel>
            <Select native
                classes={{
                    root: underlineClasses,
                    disabled: classes.disabled,
                    select: underlineClasses,
                    selectMenu: underlineClasses
                }}
                value={value}
                onChange={(e) => handleData('location', e.target.value)}
                endAdornment={endAdornment}
                input={
                    <Input
                        classes={{
                            input: inputClasses,
                            root: marginTop,
                            disabled: classes.disabled,
                            underline: underlineClasses
                        }}
                        id="location-select" />
                }>
                <option>{value}</option>
                {mainDistricts.map((district, i) =>
                    <optgroup key={i} label={district}>
                        {subDistricts[i].map(dist => <option key={dist} value={dist}>{dist}</option>)}
                    </optgroup>
                )}
            </Select>
        </FormControl>
    );
}