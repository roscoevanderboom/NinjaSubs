import React from 'react';

// Cmponents
import {
    CardContent, Collapse, TextareaAutosize,
    ListItemText, ListItem,
} from '@material-ui/core';

// Custom components
import Item from './Item';

import { ExpandLess, ExpandMore, Star } from '@material-ui/icons';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    comments: {
        border: 'none',
        width: '100%'
    }
}));

export default ({ data }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const mapFromNumber = (num) => {
        let arr = [];
        for (let i = 0; i < num; ++i) {
            arr.push('star');
        }
        return arr
    }

    return (
        <React.Fragment>
            <ListItem
                className={classes.listItem}
                button
                onClick={handleExpandClick}>
                <ListItemText
                    className={classes.listItemText}
                    primary="Details" />
                <ListItemText
                    className={classes.listItemText}
                    primary={
                        <div >
                            {mapFromNumber(data.stars).map((star,i) =>
                                <Star key={i} />
                            )}
                        </div>
                    } />
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Item
                        primary={`Contact person:`}
                        secondary={`${data.contact}`} />
                    <Item
                        primary={`Dates:`}
                        secondary={`From ${data.start} to  ${data.end}`} />
                    <Item
                        primary={`Rates:`}
                        secondary={data.neg ? `${data.rates} NTD / hour -- Negotiable` : `${data.rates} NTD / hour -- NOT Negotiable`} />
                    <Item
                        primary={`Location:`}
                        secondary={`${data.location}`} />
                    {data.address === "" ? null :
                        <Item
                            primary={`Address:`}
                            secondary={`${data.address}`} />}
                    {data.comments === "" ? null :
                        <React.Fragment>
                            <Item
                                primary={`Comments:`}
                                secondary={``} />
                            <TextareaAutosize
                                className={classes.comments}
                                value={data.comments} />
                        </React.Fragment>}
                </CardContent>
            </Collapse>
        </React.Fragment>
    );
}