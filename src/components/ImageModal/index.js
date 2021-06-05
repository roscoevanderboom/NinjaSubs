import React, { useContext, useEffect, useState } from "react";
import store from "state";
// Actions
import { setModals } from "actions/modals";
// Components
import CustomButton from "components/CustomButtons/Button";
import {
  Dialog,
  CardHeader,
  DialogContent,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
// import useStyles from './styles';

const ImageModal = () => {
  const { state, dispatch } = useContext(store);
  const { ImageModal } = state.modals;
  const { currentSub } = state;
  const [sub, setSub] = useState(false);
  // const classes = useStyles();
  const handleModal = () => {
    setModals(dispatch, "ImageModal");
  };

  useEffect(() => {
    if (currentSub) {
      setSub(currentSub);
    }
    return () => {
      setSub(false);
    };
  }, [currentSub]);

  return (
    <Dialog open={ImageModal} onClose={handleModal}>
      <CardHeader
        avatar={
          <Typography variant="h6" justify="center">
            {sub ? sub.name : ""}
          </Typography>
        }
        action={
          <CustomButton
            size="sm"
            color="danger"
            className="p-2"
            onClick={handleModal}
          >
            <Close />
          </CustomButton>
        }
      />
      <DialogContent>
        <img src={sub ? sub.image : ""} alt={sub ? sub.name : ""} />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
