import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

export let addSnack: (message: string) => void;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: 0,
      paddingLeft: theme.spacing(0.5),
    },
  })
);
export interface SnackbarMessage {
  message: string;
  key: number;
}
export const MySnack = () => {
  const [snackPack, setSnackPack] = React.useState<SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      // setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  addSnack = (message: string) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
    >
      <MuiAlert severity="success" elevation={6} variant="filled">
        {messageInfo ? messageInfo.message : undefined}

        <IconButton
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiAlert>
    </Snackbar>
  );
};
