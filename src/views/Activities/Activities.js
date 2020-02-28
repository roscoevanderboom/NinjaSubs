
import React, { useContext } from "react";
import GlobalState from '../../state/store';

import SubActivities from './SubActivities';
import EmpActivities from './EmpActivities';

// reactstrap components
import { Col } from "reactstrap";

const Noticeboard = () => {
    const { state } = useContext(GlobalState);
    const { profileData } = state;

    return (profileData &&
        <React.Fragment>
             <Col className='d-flex flex-column align-items-center p-0 m-0'>
                    {profileData.type === 'Employer'
                        ? <EmpActivities />
                        : <SubActivities />
                    }
                </Col>
        </React.Fragment>
    )
}

export default Noticeboard;