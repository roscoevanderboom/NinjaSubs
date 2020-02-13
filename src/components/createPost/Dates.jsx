import React from 'react';

// Components
import { TextField } from '@material-ui/core';

import { Col, Row } from 'reactstrap'

export default ({ post, handleData }) => {
    return (
        <Row>
            <Col md='6' xs='12'>
                <TextField                  
                    fullWidth
                    type='date' value={post.start}
                    helperText='Start date'
                    onChange={handleData('start')} />

            </Col>
            <Col md='6' xs='12'>
                <TextField                  
                    fullWidth
                    type='date' value={post.end}
                    helperText='End date'
                    onChange={handleData('end')} />
            </Col>
        </Row>
    )
}