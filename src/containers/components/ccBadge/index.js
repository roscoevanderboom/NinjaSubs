import React from 'react';
import { GlobalState } from '../../../state';

export const CreativeCommons = () => {
    const { constants } = React.useContext(GlobalState);
    const { creativeCommons } = constants;

    return (
        <a rel="license" href={creativeCommons.href}>
            <img alt={creativeCommons.alt}
                src={creativeCommons.png} />
        </a>
    )
}
