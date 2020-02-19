import React from "react";

// core components
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";

export default ({ props }) => {
    const { classes, title } = props;

    const handleOAuth = (value) => {
        console.log(title, value);

    }

    return (
        <CardHeader color="primary" className={classes.cardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.socialLine}>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('twitter')} >
                    <i className={"fab fa-twitter"} />
                </Button>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('facebook')} >
                    <i className={"fab fa-facebook"} />
                </Button>
                <Button
                    justIcon
                    color="transparent"
                    onClick={() => handleOAuth('google')} >
                    <i className={"fab fa-google"} />
                </Button>
            </div>
        </CardHeader>
    )
}

