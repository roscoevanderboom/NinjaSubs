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

import React, { useContext, useEffect, useState } from "react";
import GlobalState from '../../state/store'
// reactstrap components
import {
    Card,
    CardBody,
    CardFooter,
    Row,
    Col
} from "reactstrap";

const styles = {
    cardBody: {
        minHeight: 'auto',
        textAlign: 'center',
        cursor: 'pointer'
    },
    img: {
        width: '100%',
        maxWidth: '200px'
    },
    footer: {
        backgroundColor: 'burlywood',
        textAlign: 'center'
    }
}

const AvatarCard = () => {
    const { state, methods, constants } = useContext(GlobalState);
    const { user, profileData, availableSubs } = state;
    const { handleModals, updateProfileData } = methods;
    const { noUserImage, isArrayEqual } = constants;
    const [stars, setStars] = useState([]);
    const [likes, setLikes] = useState(0);

    const changeAvatar = () => {
        handleModals('ChangeAvatar', true);
    }

    const setRating = () => {
        let count = []
        if (profileData.name !== null) {
            count.push('name');
        }
        if (profileData.image !== constants.noUserImage) {
            count.push('image');
        }
        if (profileData.bio !== '') {
            count.push('bio');
        }
        if (user.emailVerified) {
            count.push('verified');
        }
        setStars(count);
        if (isArrayEqual(count, profileData.rating)) {
            return;
        }
        if (count !== profileData.rating) {           
            updateProfileData({ rating: count })
        }
    }

    useEffect(() => {
        if (profileData.rating !== undefined) {
            setRating();
        }
        // eslint-disable-next-line
    }, [profileData.rating])

    useEffect(() => {
        if (availableSubs && profileData.type === 'Substitute') {
            let me = availableSubs.filter(sub => sub.uid === profileData.uid);
            if (me.length > 0) {
                setLikes(me[0].likes.length);
                return;
            }            
        }
        // eslint-disable-next-line
    }, [availableSubs])

    return (profileData &&
        <Card className="card-user">
            <CardBody style={styles.cardBody}>
                <img
                    onClick={changeAvatar}
                    alt="avatar"
                    style={styles.img}
                    src={profileData.image === '' ? noUserImage : profileData.image}
                />
                <h5 className="title text-dark pt-2">{`${profileData.name}`}</h5>
            </CardBody>

            {profileData.type === 'Employer' ? null :
                <CardFooter style={styles.footer}>
                    <div className="button-container">
                        <Row>
                            <Col className="ml-auto" xs="6">
                                <h5>
                                    {likes} <br />
                                    <small>Likes</small>
                                </h5>
                            </Col>
                            <Col className="ml-auto mr-auto" xs="6">
                                <h5>
                                    {stars.length}<br />
                                    <small>Stars</small>
                                </h5>
                            </Col>
                        </Row>
                    </div>
                </CardFooter>
            }
        </Card>
    );
}

export default AvatarCard;
