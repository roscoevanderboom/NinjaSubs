import * as materialStyles from "../../assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "50%",
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    overflow: "scroll",
  },
  paperScrollPaper: {
    [theme.breakpoints.down("md")]: {
      margin: 0,
      maxHeight: "95%",
    },
    display: "block",
    width: "100%",
    maxWidth: 600,
  },
  footer: {
    justifyContent: "space-evenly",
  },
  editBtn: {
    minWidth: 20,
    padding: "4px 8px",
    marginLeft: 5,
    ...materialStyles.boxShadow,
  },
}));

export default useStyles;
