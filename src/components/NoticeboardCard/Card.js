import React from "react";
import PropTypes from "prop-types";
// MUI components
import { Avatar, CardHeader, Card } from "@material-ui/core";

import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const NoticeboardCard = ({ post }) => (
  <Card className="w-100 mt-2 shadow-lg">
    <CardHeader
      className="text-dark"
      avatar={<Avatar src={post.image} alt="avatar" />}
      title={post["School name"]}
      action={post.type}
      subheader={post.location}
    />
    <PostBody post={post} />
    <PostFooter post={post} />
  </Card>
);

export default NoticeboardCard;

NoticeboardCard.propTypes = {
  post: PropTypes.object,
};
