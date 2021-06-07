import React from "react";
import PropTypes from "prop-types";
// reactstrap components
import { Col, Row } from "reactstrap";

import {
  Collapse,
  ListItem,
  Button,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import {
  Map,
  DateRange,
  Money,
  PinDrop,
  Phone,
  AccountBox,
  ExpandLess,
  ExpandMore,
  Mail,
} from "@material-ui/icons";

import CustomListIem from "components/ListItem/Item";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  comments: {
    border: "none",
    width: "100%",
    fontSize: "1rem",
  },
  commentsContainer: {
    borderTop: "1px solid slategray",
    paddingTop: 12,
  },
}));

const CardDetails = ({ post }) => {
  const classes = useStyles();
  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <React.Fragment>
      <ListItem className="p-1 mb-2 border rounded">
        {post.rates === "" ? (
          ""
        ) : (
          <React.Fragment>
            <ListItemIcon>
              <Money />
            </ListItemIcon>
            <ListItemText>
              {post.neg
                ? `${post.rates} NTD / hour -- Negotiable`
                : `${post.rates} NTD / hour -- NOT Negotiable`}
            </ListItemText>
          </React.Fragment>
        )}

        <Button onClick={handleCollapse}>
          {collapse ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </ListItem>

      <Collapse in={collapse}>
        <Row>
          <Col xl="6" sm="12">
            <CustomListIem
              icon={<DateRange />}
              secondary={`${post.start} to  ${post.end}`}
            />
          </Col>
          <Col xl="6" sm="12">
            <CustomListIem
              icon={<AccountBox />}
              secondary={post["Contact person"]}
            />
          </Col>

          {post.location === "" ? null : (
            <Col xl="6" sm="12">
              <CustomListIem icon={<Map />} secondary={`${post.location}`} />
            </Col>
          )}
          {post.address === "" ? null : (
            <Col xl="6" sm="12">
              <CustomListIem icon={<PinDrop />} secondary={`${post.address}`} />
            </Col>
          )}
          {post.email === "" ? null : (
            <Col xl="6" sm="12">
              <CustomListIem icon={<Mail />} secondary={`${post.email}`} />
            </Col>
          )}
          {post.phone === "" ? null : (
            <Col xl="6" sm="12">
              <CustomListIem icon={<Phone />} secondary={`${post.phone}`} />
            </Col>
          )}
        </Row>
        <Container className={classes.commentsContainer}>
          {post.comments === "" ? null : (
            <TextareaAutosize
              className={classes.comments}
              value={post.comments}
            />
          )}
        </Container>
      </Collapse>
    </React.Fragment>
  );
};

export default CardDetails;

CardDetails.propTypes = {
  post: PropTypes.object,
};
