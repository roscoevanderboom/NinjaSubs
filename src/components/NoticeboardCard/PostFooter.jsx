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
import React from "react";
import GlobalState from '../../state/store';
// reactstrap components
import {
    CardFooter, Button, Row, Col
} from "reactstrap";

import { Hidden } from '@material-ui/core';
import { CheckCircle, CloseRounded, Star } from '@material-ui/icons';

const PostFooter = ({ post }) => {
    const { state, methods, fb, constants } = React.useContext(GlobalState);
    const { updateProfileData, feedback } = methods;
    const { profileData } = state;

    const apply = () => {
        fb.applyToJobPost(post, profileData, feedback);
    }
    const ignore = () => {
        fb.removeJobApplication(post, profileData, feedback)
        updateProfileData({
            ignoreList: [...profileData.ignoreList, post.ref]
        });
    }

    return (state.profileData.type === 'Substitute' &&
        <CardFooter className='d-flex align-items-center bt-1'>
            <Col md='6' sm='12'>
                <div className="stats text-dark">
                    {constants.mapFromNumber(post.stars).map((star, i) =>
                        <Star key={i} />)}
                </div>
            </Col>
            {<Hidden only={['xs', 'sm']}>
                <Col md='6' sm='12'>
                    <Row className='justify-content-end'>
                        <Button
                            color='success'
                            className='ml-1 mr-1'
                            onClick={apply}
                            children={'Apply'} />
                        <Button
                            color='warning'
                            className='ml-1 mr-1'
                            onClick={ignore}
                            children={'Ignore'} />
                    </Row>
                </Col>
            </Hidden>}
            <Hidden only={['md', 'lg', 'xl']}>
                <Col md='6' sm='12'>
                    <Row className='justify-content-end'>
                        <Button
                            size='sm'
                            color='success'
                            className='ml-1 mr-1 btn-icon'
                            onClick={apply}
                            children={<CheckCircle />} />
                        <Button
                            size='sm'
                            color='warning'
                            className='ml-1 mr-1 btn-icon'
                            onClick={ignore}
                            children={<CloseRounded />} />
                    </Row>
                </Col>
            </Hidden>
        </CardFooter>
    )
}

export default PostFooter