import React from "react";
import store from 'state';
// Constants
import * as constants from '../../constants';
// Actions
import { handleProfileData } from '../../actions/user';
import { applyToJobPost, removeJobApplication } from '../../actions/noticeboard';
// reactstrap components
import {
    CardFooter, Button, Row, Col
} from "reactstrap";

import { Hidden } from '@material-ui/core';
import { CheckCircle, CloseRounded, Star } from '@material-ui/icons';

const PostFooter = ({ post }) => {
    const { state, feedback } = React.useContext(store);
    const { profileData, user } = state;

    const apply = () => {
        if (user === null) {
            return;
        }
        applyToJobPost(post, profileData, feedback);
    }
    const ignore = () => {
        removeJobApplication(post, profileData, feedback)
        handleProfileData({
            action: 'update',
            user,
            data: { ignoreList: profileData.ignoreList.concat(post.ref) }
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
                <Col className="p-0 m-p" md='6' sm='12'>
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