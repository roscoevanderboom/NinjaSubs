import React from 'react';
// core components
import Button from "components/CustomButtons/Button.js";
import Container from "@material-ui/core/Container";

import styles from './styles';

export default (props) => {
    const classes = styles();
    const { handleSubmit, handleCancel } = props;
    return (
        <Container className={classes.footer}>
            <Button
                size='sm'
                color='info'
                onClick={handleSubmit}>
                Update
            </Button>
            <Button
                size='sm'
                color='danger'
                onClick={handleCancel}>
                Cancel
            </Button>
        </Container>
    )
}