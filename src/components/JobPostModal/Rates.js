import React from 'react';

// Components
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import CustomInput from 'components/CustomInput/CustomInput';

export default ({ post, handleData, handleNegRates }) => {
    return (
        <div className='row'>
            <div className='col-xs-8 col-sm-6'>
                <CustomInput
                    formControlProps={{
                        error: post.rates === '' ? true : false
                    }}
                    labelText='Rates per hour'
                    inputProps={{
                        onChange: handleData('rates'),
                        value: post.rates,
                        type: 'number'
                    }}
                />
            </div>

            <div className='col-xs-1 col-sm-6'>
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
        </div>
    )
}