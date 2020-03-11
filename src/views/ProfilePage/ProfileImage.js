import React from "react";
// Custom components
import ChangeAvatar from './ChangeAvatar';
// Styles
import useStyles from './styles';

export default function ProfileImage({ formData }) {  
    const classes = useStyles();

    return (
        <div className={classes.profile}>
            <div>
                <img alt="..."
                    style={{ marginRight: '-32px' }}
                    className={classes.image}
                    src={formData ? formData.image : ''} />
                <ChangeAvatar />
            </div>
            <div className={classes.name}>
                <h3 className={classes.title}>{formData ? formData.name : ''}</h3>
            </div>
        </div>
    );
}
