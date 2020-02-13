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

import React, { useContext, useEffect } from "react";
import GlobalState from '../../state/store'

// reactstrap components
import { Card, Button, } from "reactstrap";

import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

import PostBody from '../../components/NoticeboardCard/PostBody';


const ActivitiesCard = () => {
    const { state, methods, fb, filters, setState } = useContext(GlobalState);
    const { profileData, noticeboardQuery, searchList } = state;
    const { feedback } = methods;

    useEffect(() => {
        if (noticeboardQuery) {
            setState.setCurrentList(filters.filterSubActivities(noticeboardQuery, profileData))
        }
        // eslint-disable-next-line
    }, [profileData, noticeboardQuery])  

    return (profileData &&
        <React.Fragment>
            {searchList.length > 0 ? null :
                <span className="text-muted mt-3">
                    <small>No activities</small>
                </span>
            }
            <ul className="list-unstyled col-xs-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 m-3 p-0 text-dark">
                {searchList.map((post, i) =>
                    <Card key={i}
                        className='mt-2'>
                        <CardHeader
                            className='text-dark'
                            avatar={<Avatar src={post.image} alt='avatar' />}
                            title={post.name}
                            subheader={post.location}
                            action={
                                <Tooltip title='Remove Job Application'
                                    placement='top'>
                                    <Button
                                        onClick={() => fb.removeJobApplication(post, profileData, feedback)}
                                        className="btn-round btn-icon"
                                        color="danger"
                                        outline
                                        size="sm"   >
                                        <Close />
                                    </Button>
                                </Tooltip>
                            } />
                        <PostBody post={post} />
                    </Card>
                )}
            </ul>
        </React.Fragment >
    );
}

export default ActivitiesCard;
