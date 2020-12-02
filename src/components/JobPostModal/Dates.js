import React from 'react';

// Components
import { TextField } from '@material-ui/core';
export default ({ post, handleData }) => {
    return (
        <div className='row'>
            <div className='col-xs-12 col-md-6'>
                <TextField
                    fullWidth
                    type='date' value={post.start}
                    helperText='Start date'
                    onChange={handleData('start')} />

            </div>
            <div className='col-xs-12 col-md-6'>
                <TextField
                    fullWidth
                    type='date' value={post.end}
                    helperText='End date'
                    onChange={handleData('end')} />
            </div>
        </div>
    )
}