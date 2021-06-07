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
import store from "state";

// reactstrap components
import { CardBody } from "reactstrap";

import Applicants from "./Applicants";
import Details from "./Details";

const PostBody = ({ post }) => {
  const { state } = React.useContext(store);

  return (
    <CardBody className="text-dark">
      <Details post={post} />
      {state.profileData.type === "Substitute" ? null : (
        <Applicants candidates={post.candidates} />
      )}
    </CardBody>
  );
};

export default PostBody;
