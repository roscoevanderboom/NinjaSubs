import React from "react";

import {
    Chip, Collapse, Avatar, Button,
    ListItemIcon, ListItemText, ListItem
} from '@material-ui/core';

import {
    EmojiPeople, ExpandLess, ExpandMore
} from '@material-ui/icons';


import SubCard from '../SubCard/SubCard';

export default ({ candidates }) => {
    const [collapse, setCollapse] = React.useState(false);
    const handleCollapse = () => {
        collapse ? setCollapse(false) : setCollapse(true)
    }
    return (candidates.length > 0 && candidates !== undefined &&
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
            <Collapse in={collapse} className='d-flex flex-wrap' >
                <div className='d-flex flex-wrap' >
                    {candidates.map((sub, i) =>
                        <SubCard key={i} sub={sub} />
                    )}
                </div>
            </Collapse>
        </React.Fragment>
    )
}