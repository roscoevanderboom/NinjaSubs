import React, { useContext } from 'react';
import GlobalState from '../../state/store';

import { Col, Row } from 'reactstrap';

import AvatarCard from './AvatarCard';
import SubDetails from './SubDetails';
import EmployerDetails from './EmployerDetails';

export default () => {
    const { state } = useContext(GlobalState)

    return (state.profileData &&
        <React.Fragment>
            <Col className='mt-3' lg='8' md='10' xs='12'>
                <Row>
                    <Col className='mb-3' xs='12' md='4'>
                        <AvatarCard />
                    </Col>
                    <Col className='mb-3' xs='12' md='8'>
                        {state.profileData.type === 'Employer'
                            ? <EmployerDetails />
                            : <SubDetails />
                        }
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}