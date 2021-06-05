//
//
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, title } from "assets/jss/material-kit-react";
export const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      margin: "0px 12px",
    },
  },
  chip: {
    height: "fit-content",
    padding: 10,
    backgroundColor: "dodgerblue",
    color: "white",
    fontWeight: 500,
    "&:hover": {
      ...boxShadow,
      color: "black",
    },
  },
  avatar: {
    cursor: "pointer",
  },
  title: {
    ...title,
  }
}));
