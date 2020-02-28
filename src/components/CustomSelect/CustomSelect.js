import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    FormControl, InputLabel,
    Select, MenuItem, Input,
    ListSubheader
} from "@material-ui/core";

import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        onChange,
        value,
        error,
        white,
        inputRootCustomClasses,
        success,
        endAdornment,
        options
    } = props;

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
        <FormControl {...formControlProps} className={formControlClasses}>
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + " " + labelClasses}
                    htmlFor='grouped-select'
                    id='grouped-select-label'
                    {...labelProps} >
                    {labelText}
                </InputLabel>
            ) : null}

            <Select value={'District'} input={<Input id="grouped-select" />}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <ListSubheader>Category 1</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
            </Select>

            {/* <Select
                classes={{
                    root: underlineClasses,
                    disabled: classes.disabled,
                    select: underlineClasses,
                    selectMenu: underlineClasses
                }}
                labelid={`${id}-label`}
                id={id}
                defaultValue=""
                endAdornment={endAdornment}>
                
                {options.map((option, i) =>
                    <div key={i}>
                        <ListSubheader
                            className={classes.subheader}>
                            {option.header}
                        </ListSubheader>
                        {option.values.map((val) =>
                            <MenuItem
                                key={val}
                                value={val}
                                onClick={() => onChange('location', val)}>
                                {val}
                            </MenuItem>
                        )}
                    </div>
                )}
            </Select> */}
        </FormControl>
    );
}

// CustomInput.propTypes = {
//     labelText: PropTypes.node,
//     labelProps: PropTypes.object,
//     id: PropTypes.string,
//     value: PropTypes.string,
//     inputProps: PropTypes.object,
//     formControlProps: PropTypes.object,
//     inputRootCustomClasses: PropTypes.string,
//     error: PropTypes.bool,
//     success: PropTypes.bool,
//     white: PropTypes.bool
// };
