import React, { useState } from 'react';

// Components
import {
    Collapse, ListItem, ListItemText,
} from '@material-ui/core';

import { ExpandLess, ExpandMore } from '@material-ui/icons';

// Custom components
import Chips from './Chips';

export default ({ data, styles }) => {
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = () => {
        setCollapse(collapse ? false : true)
    }

    return (
        <React.Fragment>
            <ListItem
                className={styles.expand}
                button
                onClick={handleCollapse}>
                <ListItemText
                    className={styles.text}
                    primary="Candidates" />
                {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse
                className={styles.candidates}
                in={collapse} >
                {data.candidates.map((sub, i) =>
                    <Chips
                        key={i}
                        label={sub.name}
                        data={sub}
                        uid={data.candidates_uid[i]}
                    />
                )}
            </Collapse>
        </React.Fragment>
    )
}