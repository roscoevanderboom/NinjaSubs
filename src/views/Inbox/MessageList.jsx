import React, { useContext } from "react";
import PropTypes from "prop-types";
import store from "state";

import { ListItem, ListItemText } from "@material-ui/core";

import { useStyles } from "./styles";

export default function MessageList({ list }) {
  const classes = useStyles();
  const { state } = useContext(store);
  const { profileData } = state;

  return (
    list && (
      <ul className={classes.list}>
        {list.map((item, i) => (
          <div
            key={i}
            className={
              item.sender_uid === profileData.uid
                ? "text-dark mt-2 row p-0 m-0 justify-content-end"
                : "text-dark mt-2 row p-0 m-0 justify-content-start"
            }
          >
            <ListItem className="col-6 p-0 m-0">
              <ListItemText
                inset={true}
                classes={{
                  primary:
                    item.sender_uid === profileData.uid
                      ? classes.listItemLeft
                      : classes.listItemRight,
                }}
                className={
                  item.sender_uid === profileData.uid
                    ? "row p-0 m-0 justify-content-end"
                    : "row p-0 m-0 justify-content-start"
                }
                primary={item.post}
              />
            </ListItem>
          </div>
        ))}
      </ul>
    )
  );
}

MessageList.propTypes = {
  list: PropTypes.array,
};
