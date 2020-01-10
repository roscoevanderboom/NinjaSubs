import React from 'react';

// Components
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';

export default ({ post, handleData, handleNegRates, classes }) => {
    return (
        <div>
            <TextField
                classes={{ root: classes.input }}
                type='number'
                value={post.rates}
                helperText='Rates per hour'
                onChange={handleData('rates')} />
            <FormControlLabel
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