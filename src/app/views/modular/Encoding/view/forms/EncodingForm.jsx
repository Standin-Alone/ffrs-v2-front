import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,  
  Divider,
  Grid,  
  Icon,  
  styled,
  Typography
} from "@mui/material";
import {SimpleCard } from "app/components";
import { colors } from "app/components/MatxTheme/themeColors";
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import constants from "global/constants";


const TextField = styled(TextValidator)((textValidatorProps) => {

  return ({
    width: "100%",
    marginBottom: "16px",      
    '& input:valid + fieldset': {
      borderColor:  textValidatorProps.value ? 'green' : '#ddd',      
      color: textValidatorProps.value ? 'green' : '#ddd'      
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
    
})});


const inputProps = { style: { textTransform: "uppercase",fontWeight:'bold',   } };


export const EncodingForm = (props)=>{
  

    const [state, setState] = useState({ date: new Date() });

    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);
  
    const handleSubmit = (event) => {
       event.preventDefault()
      // console.log("submitted");
      alert('sample')
      props.setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };
  
    const handleChange = (event) => {
      event.persist();

      
      setState({ ...state, [event.target.name]: event.target.value });
    };
  
    const handleDateChange = (date) => setState({ ...state, date });

    const {
        referenceNumber,
        surName,
        firstName,
        middleName,
        extensionName,
        gender,
        address1,
        address2,    
        address3,
        address4,
        address5,
        address6,
        mobileNumber,
        landlineNumber,
        birthday,
        pobMunicipality,
        pobProvince,
        pobCountry
      } = state;


    return(

        <Grid>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null} id="step-1-form">
        <InputMask
            mask="99-99-99-999-999999"
            type="text"
            name="referenceNumber"
            label="Reference Number"
            onChange={handleChange}
            value={referenceNumber || ""}
            validators = {['required']}
            errorMessages = {["this field is required"]}
            inputProps={inputProps}
            disabled={false}
            maskChar=" "
            variant="standard"      
          >
            {(inputProps)=><TextField
                {...inputProps}                        
            />}
          </InputMask>

        <SimpleCard title="Personal Information">
        
        
          <Grid container spacing={6}>
            <Grid item lg={200} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {/* <TextField
                type="text"
                name="First Name"
                id="standard-basic"
                value={username || ""}
                size="large"
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Username (Min length 4, Max length 9)"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              /> */}
        
            
            <div style={{flexDirection:'row',display:'flex'}}>
              <Grid container  lg={100} marginX={2} >
                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                  
                    type="text"
                    name="surName"
                    label="SURNAME"
                    onChange={handleChange}                                        
                    value={surName || ""}                    
                    validators={["required"]}
                    errorMessages={["this field is required"]}              
                    error={false}
                    inputProps={inputProps}                                        
                    autoFocus            
                    />
                </Grid>
              </Grid>

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                   <TextField
                    type="text"
                    name="firstName"
                    label="FIRST NAME"
                    onChange={handleChange}
                    value={firstName || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    inputProps={inputProps}
                  />
                  </Grid>
              </Grid>
            
            </div>  

            <div style={{flexDirection:'row',display:'flex'}}>
            <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                   <TextField
                    type="text"
                    name="middleName"
                    label="MIDDLE NAME"
                    onChange={handleChange}
                    value={middleName || ""}                    
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                   <TextField
                    type="text"
                    name="extensionName"
                    label="EXTENSION NAME"
                    onChange={handleChange}
                    value={extensionName || ""}
      
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>



              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="gender"
                    label="Gender (1 = Male and 1 = Female)"
                    onChange={handleChange}
                    value={gender || ""}
                    validators = {['required','matchRegexp:^[1-2]$']}
                    errorMessages = {["this field is required",'Please set 1 and 0 only.']}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>                          
            </div>

            <Grid container  lg={100} marginY={2}>
                <Grid item lg={14} >
                  <Divider flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}/>                          
                </Grid>
            </Grid> 
          
            <div style={{flexDirection:'row',display:'flex'}}>
              <Typography >
                Address
              </Typography>
              
              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address6"
                    label="REGION"
                    onChange={handleChange}
                    value={address6 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>  


              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address5"
                    label="PROVINCE"
                    onChange={handleChange}
                    value={address5 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>     


              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address4"
                    label="MUNICIPALITY "
                    onChange={handleChange}
                    value={address4 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>  
              
            
            </div>

            <div style={{flexDirection:'row',display:'flex'}}>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
                
              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address1"
                    label="HOUSE/LOT/BLDG. NO./PUROK  "
                    onChange={handleChange}
                    value={address1 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>             

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address2"
                    label="STREET/SITIO/SUBDV"
                    onChange={handleChange}
                    value={address2 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>                 

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address3"
                    label="STREET/SITIO"
                    onChange={handleChange}
                    value={address3 || ""}
                    validators = {['required']}
                    errorMessages = {["this field is required"]}
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>  
                                  
            </div>


            <Grid container  lg={100} marginY={2}>
                <Grid item lg={14} >
                  <Divider flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}/>                          
                </Grid>
            </Grid> 

            {/* CONTACT INFO */}
            <Grid container>
              <Grid item xs>
                <div style={{flexDirection:'row',display:'flex'}}>
                    <Grid container  lg={100} marginX={2}>
                      <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                      
                      <InputMask
                        mask="(0)999-999-9999"
                        type="text"
                        name="mobileNumber"
                        label="MOBILE NUMBER"
                        onChange={handleChange}
                        value={mobileNumber || ""}
                        validators = {['required']}
                        errorMessages = {["this field is required"]}
                        inputProps={inputProps}
                        disabled={false}
                        maskChar=" "
                  
                      >
                        {(inputProps)=><TextField
                            {...inputProps}                        
                        />}
                      </InputMask>
                      </Grid>
                  </Grid>  


                  <Grid container  lg={100} marginX={2}>
                      <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                      
                      <InputMask
                        mask="(0)999-999-9999"
                        type="text"
                        name="landlineNumber"
                        label="LANDLINE NUMBER"
                        onChange={handleChange}
                        value={landlineNumber || ""}
                        validators = {['required']}
                        errorMessages = {["this field is required"]}
                        inputProps={inputProps}
                        disabled={false}
                        maskChar=" "
                  
                      >
                        {(inputProps)=><TextField
                            {...inputProps}                        
                        />}
                      </InputMask>
                      </Grid>
                  </Grid>  
                                   

                  
                </div>


                {/* BIRTHDAY INFO*/}
                <div style={{flexDirection:'row',display:'flex'}}>

                <Grid container  lg={100} marginX={2}>
                      <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                 

                  <InputMask
                        mask="99/99/9999"
                        type="text"
                        name="birthday"
                        label="Birthday (DD/MM/YYYY)"
                        onChange={handleChange}
                        value={birthday || ""}
                        validators = {['required','date']}
                        errorMessages = {["this field is required",'Invalid Date']}
                        inputProps={inputProps}
                        
                        disabled={false}
                        maskChar=" "
                  
                      >
                        {(inputProps)=><TextField
                            {...inputProps}                        
                        />}
                      </InputMask>
                      </Grid>
                  </Grid>  
                </div>

                <div style={{flexDirection:'row',display:'flex'}}>

                  
                    <Typography >
                      Place of Birth
                    </Typography>

                    
                    <Grid container  lg={100} marginX={2}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                          type="text"
                          name="pobMunicipality"
                          label="Municipality"
                          onChange={handleChange}
                          value={pobMunicipality || ""}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          inputProps={inputProps}                          
                        />
                        </Grid>
                    </Grid>                      
              </div>

              <div style={{flexDirection:'row',display:'flex'}}>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <Grid container  lg={100} marginX={1}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                          type="text"
                          name="pobProvince"
                          label="Province/State"
                          onChange={handleChange}
                          value={pobProvince || ""}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          inputProps={inputProps}                          
                        />
                        </Grid>
                    </Grid>  

                     <Grid container  lg={100} marginX={1}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                          type="text"
                          name="pobCountry"
                          label="Country"
                          onChange={handleChange}
                          value={pobCountry || ""}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          inputProps={inputProps}                          
                        />
                        </Grid>
                    </Grid>    
              </div>
              </Grid>
              <Divider orientation="vertical" flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}>
                {/* VERTICAL */}
              </Divider>
              <Grid item xs>
                    <Button type="submit" variant="outlined" id="step-1-submit-button" style={{display:'none'}}>Submit</Button>
              </Grid>
            </Grid>
            </Grid>                       
          </Grid>
            
      </SimpleCard>      
      </ValidatorForm>
      </Grid>
    )
}