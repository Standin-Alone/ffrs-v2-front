import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function FormDialog({title,subtitle,confirmText,isOpen,confirm,cancel}) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(isOpen);
  }

  function handleClose() {
    setOpen(isOpen);
  }

  return (
    <Box>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {subtitle}
          </DialogContentText>
   
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
