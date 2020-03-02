import React from 'react';
// core components
import Button from "components/CustomButtons/Button.js";
import Container from "@material-ui/core/Container";

export default (props) => {
    const { handleSubmit, handleCancel } = props;
    return (
        <Container className='row justify-content-around'>
            <Button
                size='lg'
                color='info'
                onClick={handleSubmit}>
                Update
            </Button>
            <Button
                size='lg'
                color='danger'
                onClick={handleCancel}>
                Cancel
            </Button>
        </Container>
    )
}