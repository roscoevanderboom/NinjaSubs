import React from 'react';

// Components
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';

export default ({ post, handleData, handleNegRates, classes }) => {
    return (
        <div className='mb-2'>
            <TextField
                classes={{ root: classes.input }}
                type='number'
                value={post.rates}
                helperText='Rates per hour'
                onChange={handleData('rates')} />
            <FormControlLabel
            className='ml-2 mr-2'
                label="Neg. rates"
                control={
                    <Checkbox
                        checked={post.neg}
                        onChange={handleNegRates}
                        value={post.neg} />
                } />
        </div>
    )
}