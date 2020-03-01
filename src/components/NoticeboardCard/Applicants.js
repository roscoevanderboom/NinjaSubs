import React from "react";

import {
    Collapse, Button,
    ListItemIcon, ListItemText, ListItem
} from '@material-ui/core';

import {
    People, ExpandLess, ExpandMore
} from '@material-ui/icons';


import SubCard from '../SubCard/SubCard';

export default ({ candidates }) => {
    const [collapse, setCollapse] = React.useState(false);
    const handleCollapse = () => {
        collapse ? setCollapse(false) : setCollapse(true)
    }
    return (candidates !== undefined && candidates.length > 0 &&
        <React.Fragment>
            <ListItem className='p-1 mb-2 border rounded'>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText>
                    Applicants
                </ListItemText>

                <Button onClick={handleCollapse}>
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </Button>
            </ListItem>
            <Collapse in={collapse} >
                <div className='d-flex flex-wrap' >
                    {candidates.map((sub, i) =>
                        <SubCard key={i} sub={sub} />
                    )}
                </div>
            </Collapse>
        </React.Fragment>
    )
}