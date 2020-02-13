/* eslint-disable */
/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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