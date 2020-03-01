

import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// reactstrap components
import { Card, Button, } from "reactstrap";
// @material-ui/core components
import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";
// @material-ui/icons
import { Close } from "@material-ui/icons";
// Custom components
import PostBody from 'components/NoticeboardCard/PostBody';
import ListHeader from 'components/EmptyListHeader';

const ActivitiesCard = () => {
    const { state, methods, fb, filters } = useContext(store);
    const { profileData, noticeboardQuery } = state;
    const { feedback } = methods;
    const [list, setList] = useState([])

    useEffect(() => {
        if (noticeboardQuery) {
            setList(filters.filterSubActivities(noticeboardQuery, profileData))
        }
        // eslint-disable-next-line
    }, [profileData, noticeboardQuery])

    return (profileData &&
        <React.Fragment>
            {list.length > 0 ? null :
               <ListHeader text='No activities' />
            }
            <React.Fragment>
                {list.map((post, i) =>
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
            </React.Fragment>
        </React.Fragment >
    );
}

export default ActivitiesCard;
