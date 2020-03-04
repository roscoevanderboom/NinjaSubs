import React, { useContext } from "react";
// Store
import store from 'state';
// nodejs library that concatenates classes
import classNames from "classnames";
// Custom components
import ChangeAvatar from './ChangeAvatar';
// Styles
import useStyles from './styles';

export default function ProfileImage({ formData }) {    
    const { constants } = useContext(store);

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    return (
        <div className={classes.profile}>
            <div>
                <img alt="..."
                    style={{ marginRight: '-32px' }}
                    src={formData ? formData.image : constants.noImage}
                    className={imageClasses} />
                <ChangeAvatar />
            </div>
            <div className={classes.name}>
                <h3 className={classes.title}>{formData ? formData.name : ''}</h3>
            </div>
        </div>
    );
}
