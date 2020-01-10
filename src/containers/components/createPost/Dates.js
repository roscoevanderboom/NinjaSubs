import React from 'react';

// Components
import { TextField } from '@material-ui/core';

export default ({ post, handleData, classes }) => {
    return (
        <div>
            <TextField
                classes={{ root: classes.input }}
                type='date' value={post.start}
                helperText='Start date'
                onChange={handleData('start')} />
            <TextField
                classes={{ root: classes.input }}
                type='date' value={post.end}
                helperText='End date'
                onChange={handleData('end')} />
        </div>
    )
}