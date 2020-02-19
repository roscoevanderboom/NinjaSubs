import React from "react";

// core components
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";

export default ({ props }) => {
    const { classes, title, handleSubmit, handleTitle } = props;

    return (
        <CardFooter className={classes.cardFooter}>
            <Button round
                onClick={handleSubmit}
                className={classes.btns}>
                {title === 'Login' ? 'Sign In' : 'Submit'}
            </Button>
            <Button round
                className={classes.btns}
                onClick={handleTitle}
                color="primary">
                {title === 'Login' ? 'Register' : 'Login'}
            </Button>
        </CardFooter>
    )
}