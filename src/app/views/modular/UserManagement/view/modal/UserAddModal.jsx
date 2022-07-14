import CloseIcon from '@mui/icons-material/Close';
import { Box,  styled,Grid,Item} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/system';
import { H6 } from 'app/components/Typography';
import React,{useState} from 'react';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";


const Transition = React.forwardRef(function Transition(props, ref,) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextField = styled(TextValidator)(() => ({
  width: "1000%",  
  marginBottom: "16px",
}));


  const UserAddModal = ({open,onClose, title}) =>{
  const theme = useTheme();

  const [state,setState] = useState({});  


 

  const handleChange = (event) => {
    event.persist();    
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = ()=>{

  };


  const {username,password} = state;


  return (
    <Box>
      
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>{title}</H6>
                <Button color="inherit" type="submit">
                  Save
                </Button>
              </Toolbar>
            </AppBar>

            <List>
              <ListItem alignItems={'center'} selected={username ? true :false}>                          
                    <TextField
                      type="text"
                      name="username"
                      id="standard-basic"
                      value={username || ''}
                      onChange={handleChange}
                      errorMessages={["this field is required"]}
                      label="First Name"
                      validators={["required"]}
                      required
                    />                        
              </ListItem>
              <Divider />

              <ListItem alignItems={'flex-start'} selected={password ? true :false}>              
              <TextField
                  type="text"
                  name="password"
                  id="standard-basic"
                  value={password || ''}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Middle Name"
                  hintText="sample"
                  validators={["required"]}
                  required
                />
              </ListItem>
          
              <Divider />
            </List>
          </Dialog>
      </ValidatorForm>
    </Box>
  );
}


export default UserAddModal;