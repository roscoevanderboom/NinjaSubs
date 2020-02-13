/* eslint-disable */
/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { CardBody, Col, Row } from "reactstrap";

import {
    TextareaAutosize, Collapse, ListItem, Button,
    ListItemIcon, ListItemText
} from '@material-ui/core';
import {
    Map, DateRange, Money, PinDrop, Phone,
    AccountBox, ExpandLess, ExpandMore
} from '@material-ui/icons';

import CustomListIem from '../ListItem/Item';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    comments: {
        border: 'none',
        width: '100%',
        fontSize: '1rem'
    }
}));

export default ({ post }) => {
    const classes = useStyles();
    const [collapse, setCollapse] = React.useState(false);

    const handleCollapse = () => {
        collapse ? setCollapse(false) : setCollapse(true)
    }
    
    return (
        <React.Fragment>
            <ListItem
                className='p-0'>
                {post.rates === "" ? '' :
                    <React.Fragment>
                        <ListItemIcon>
                            <Money />
                        </ListItemIcon>
                        <ListItemText>
                            {post.neg
                                ? `${post.rates} NTD / hour -- Negotiable`
                                : `${post.rates} NTD / hour -- NOT Negotiable`}
                        </ListItemText>
                    </React.Fragment>
                }

                <Button onClick={handleCollapse}>
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </Button>
            </ListItem>

            <Collapse in={collapse} >
                <Row>
                    <Col md='6' sm='12'>
                        <CustomListIem
                            icon={<AccountBox />}
                            secondary={post.contact} />
                    </Col>
                    <Col md='6' sm='12'>
                        <CustomListIem
                            icon={<DateRange />}
                            secondary={`${post.start} to  ${post.end}`} />
                    </Col>
                </Row>
                <Row>
                    {post.location === "" ? null :
                        <Col md='6' sm='12'>
                            <CustomListIem
                                icon={<Map />}
                                secondary={`${post.location}`} />
                        </Col>
                    }
                </Row>
                <Row>
                    {post.address === "" ? null :
                        <Col md='6' sm='12'>
                            <CustomListIem
                                icon={<PinDrop />}
                                secondary={`${post.address}`} />
                        </Col>
                    }
                    {post.phone === "" ? null :
                        <Col md='6' sm='12'>
                            <CustomListIem
                                icon={<Phone />}
                                secondary={`${post.phone}`} />
                        </Col>}
                </Row>
                {post.comments === "" ? null :
                    <TextareaAutosize
                        className={classes.comments}
                        value={post.comments} />}
            </Collapse>
            
        </React.Fragment>
    )
}