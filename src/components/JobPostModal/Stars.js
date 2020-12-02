import React from 'react';

// Components
import { Badge, Button, Tooltip } from '@material-ui/core';
import { Star } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    tooltip: {
        padding: 3,
        fontSize: '0.75rem'
    }
}));

export default ({ stars, errors }) => {
    const classes = useStyles();
    return (
        <Tooltip
            open={stars === 5 ? false : true}
            placement='left'
            title={
                <React.Fragment>
                    {errors.map((err, i) =>
                        <div key={i}
                            className={classes.tooltip}>
                            {err}
                        </div>
                    )}
                </React.Fragment>
            }>
            <Badge badgeContent={stars}>
                <Button>
                    <Star />
                </Button>
            </Badge>
        </Tooltip>
    )
}
