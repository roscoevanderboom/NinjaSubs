import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// Filter
import { filterSubActivities } from '../../constants/filters';
// Actions
import { removeJobApplication } from '../../actions/noticeboard';
// reactstrap components
import { Card } from "reactstrap";
import CustomBtn from 'components/CustomButtons/Button';
// @material-ui/core components
import {
    CardHeader, Avatar, Tooltip
} from "@material-ui/core";
// @material-ui/icons
import { Close } from "@material-ui/icons";
// Custom components
import PostBody from 'components/NoticeboardCard/PostBody';
import ListHeader from 'components/EmptyListHeader';
import ClearIgnoredPosts from "./ClearIgnoredPosts";

const ActivitiesCard = () => {
    const { state, feedback } = useContext(store);
    const { profileData, noticeboardQuery } = state;
    const [list, setList] = useState([]);

    useEffect(() => {
        if (noticeboardQuery) {
            setList(filterSubActivities(noticeboardQuery, profileData))
        }
        // eslint-disable-next-line
    }, [profileData, noticeboardQuery])

    return (profileData &&
        <React.Fragment>
            {list.length > 0 ? null :
                <ListHeader text='No activities' />
            }

            {!profileData || profileData.ignoreList.length === 0 ? null :
                <>
                    <br />
                    <ClearIgnoredPosts />
                    <br />
                </>
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
                                    <CustomBtn
                                        onClick={() => removeJobApplication(post, profileData, feedback)}
                                        className="p-2"
                                        color="danger"
                                        size="sm"   >
                                        <Close />
                                    </CustomBtn>
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