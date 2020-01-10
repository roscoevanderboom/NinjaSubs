import React from 'react';

// Components
import { TextField, Tooltip } from '@material-ui/core';

export default ({ props }) => {
    const { password, errors, handlePassword, classes } = props;

    const [tooltip, setTooltip] = React.useState(false);

    const showTooltip = (value) => {
        setTooltip(value)
    }

    const UL = () => (
        <ul className={classes.tooltipUL}>
            {errors.map((err, i) =>
                <li key={i}
                    className={classes.tooltipLI}>
                    {err}
                </li>
            )}
        </ul>
    )

    React.useEffect(() => {
        if (errors.length > 0) {
            setTooltip(true);
            return
        }
        if (password === '') {
            setTooltip(false);
            return
        }
        setTooltip(false);
    }, [errors, password])

    return (
        <Tooltip
            placement='top-start'
            open={tooltip}
            title={<UL />}
            children={
                <TextField
                    fullWidth
                    classes={{
                        root: classes.input,
                    }}
                    onBlur={() => showTooltip(false)}
                    value={password}
                    type='password'
                    placeholder='Password'
                    onChange={handlePassword} />
            } />
    )
}

