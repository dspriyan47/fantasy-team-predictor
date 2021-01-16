import React, { useReducer } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
    }
  );
  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    let data = { formInput };
    console.log(data);

    fetch(`http://localhost:5000/scrap-series/${formInput.seriesId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
  };

  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Scrap Series</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the series id from cricinfo site, to scrap the data of a particular series.</DialogContentText>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="Series Id"
              id="margin-normal"
              name="seriesId"
              defaultValue={formInput.email}
              onChange={handleInput}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Begin Scrapping
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
