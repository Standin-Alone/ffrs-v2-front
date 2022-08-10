import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function ConfirmDialog({title,subtitle,confirmText,isOpen,confirm,cancel}) {
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

      <Dialog open={isOpen} onClose={cancel} aria-labelledby="form-dialog-title"  >          
        <br></br>
        <div style={{padding:'0.1%'}}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
            <embed src={'/assets/images/dialogs/question.gif'} style={{width:'20%',height:'20%'}}/><br></br>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        </div>
        <DialogContent  >
          <DialogContentText>
            {subtitle}
          </DialogContentText>
   
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={cancel} size="large">
            Cancel
          </Button>
          <Button onClick={confirm}  variant="outlined"  color="success" size="large">
            {confirmText}
          </Button>            
        </DialogActions>
        <br></br>
        </div>
      </Dialog>
    </Box>
  );
}
