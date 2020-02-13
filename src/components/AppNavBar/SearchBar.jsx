import React, { useContext, useEffect, useState } from 'react';
import GlobalState from '../../state/store';

import { InputBase } from '@material-ui/core';
import ClearSearch from '@material-ui/icons/Close';
import { Button } from 'reactstrap'

export default ({ classes }) => {
    const { methods, state } = useContext(GlobalState);
    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleClear = () => {
        setInput('')
    }

    useEffect(() => {
        methods.search(input)
        // eslint-disable-next-line
    }, [input, state.currentList]);

    return (
        <div className={classes.search}>
            <InputBase
                placeholder="Search…"
                value={input}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInput}
            />
            <Button className='p-0 m-0'>
                <ClearSearch onClick={handleClear} />
            </Button>
        </div>
    )
}