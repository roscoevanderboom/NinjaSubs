import React from "react";

// reactstrap components
import { CardBody, Col, Row } from "reactstrap";

import {
    Chip, Collapse, Avatar, Button,
    ListItemIcon, ListItemText, ListItem
} from '@material-ui/core';

import {
    EmojiPeople, AccountBox, ExpandLess, ExpandMore
} from '@material-ui/icons';

export default ({ candidates }) => {
    const [collapse, setCollapse] = React.useState(false);
    const handleCollapse = () => {
        collapse ? setCollapse(false) : setCollapse(true)
    }
    return (
        <React.Fragment>
            <ListItem className='p-0'>
                <ListItemIcon>
                    <EmojiPeople />
                </ListItemIcon>
                <ListItemText>
                    Applicants
                </ListItemText>

                <Button onClick={handleCollapse}>
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </Button>
            </ListItem> 
            <Collapse in={collapse} >
                {candidates.map((sub, i) =>
                    <Chip
                        key={i}
                        label={sub.name}                        
                        avatar={<Avatar src={sub.image} alt={sub.name} />}
                        clickable={true} />
                )}
            </Collapse>
        </React.Fragment>
    )
}