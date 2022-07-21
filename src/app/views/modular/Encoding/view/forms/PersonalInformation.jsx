import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,  
  Divider,
  Grid,    
  Autocomplete,
  styled,
  Typography,  
} from "@mui/material";
import {SimpleCard } from "app/components";
import { colors } from "app/components/MatxTheme/themeColors";
import InputMask from 'react-input-mask';
import { useEffect, useState,useRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import constants from "global/constants";
import moment from 'moment';
import {  loadProvinces, loadRegions,loadMunicipality,loadBarangay, step1FormAction } from "../../actions/actions";
import { GET_SESSION } from "global/async_storage";



const TextField = styled(TextValidator)((textValidatorProps) => {

  return ({
    width: "100%",
    marginBottom: "16px",   
    backgroundColor:colors.bgGray,   
    '& input:valid + fieldset': {
      borderColor:  textValidatorProps.value ? 'green' : '#ddd',      
      color: textValidatorProps.value ? 'green' : '#ddd',
      
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
    
})});


const inputProps = { style: { textTransform: "uppercase",fontWeight:'bold',   }};
const inputLabelProps = { style: { fontWeight:'bold',   } };


export const PersonalInformation = (props)=>{
  
    
    const [state, setState] = useState({ 
        date: new Date(),
        regions:[],
        provinces:[],
        municipalities:[],
        barangays:[],
        

    
        // surName:"CERVANTES",
        // firstName: "LEA MAE",        
        // gender:1, 
        // mobileNumber:"9106120892",
    
        // birthday: "27/04/1995",
        // pobMunicipality:"Caloocan City",
        // pobProvince:"Metro Manila",
        // pobCountry:"Philippines",
        // religion: 1,
        // civilStatus: 1,  
        // mothersMaidenName:"NMMN",
        // isHouseholdHead:1,                
        // numberOfLivingHouseholdMembers:1,
        // numberOfFemale:1,
        // numberOfMale:1,



        // highestFormalEducation:1,
        // personWithDisability: 2,
        // fourPsBeneficiary:1,
        // memberOfIndigenousGroup:2,        
        // withGovernmentId: 2,                         
        // memberOfFarmerAssocCooperative:2,        
        // personToNotifyInCaseOfEmergency: "ZENAROSA",
        // personToNotifyMobileNumber: "9106120892"
      });
  
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
        pobCountry,
        religion,
        civilStatus,
        spouseName,
        mothersMaidenName,
        isHouseholdHead,
        householdHeadName,
        relationshipHouseholdHead,
        numberOfLivingHouseholdMembers,
        numberOfFemale,
        numberOfMale,

        // VERTICAL PAGE 2
        highestFormalEducation,
        personWithDisability,
        fourPsBeneficiary,
        memberOfIndigenousGroup,
        specifyIndigenousGroup,        
        withGovernmentId,
        specifyIdType,        
        specifyIdNumber,       
        memberOfFarmerAssocCooperative,
        specifyFarmerAssocCooperative,
        personToNotifyInCaseOfEmergency,
        personToNotifyMobileNumber

      } = state;
    

    useEffect(async ()=>{

      ValidatorForm.addValidationRule("isValidAge", (value) => {
        let getDateNow = moment(new Date(),"DD/MM/YYYY");
        let birthday = moment(value,"DD/MM/YYYY");
        let computeAge = getDateNow.diff(birthday, 'years');
        
        if (computeAge < 18)return false;

        return true          
      });

      ValidatorForm.addValidationRule("date", (value) => {
        
        let date = moment(value,"DD/MM/YYYY");        
        
        if (!date.isValid())return false;

        return true          
      });

      
      let getDraftedPersonalInformation =  JSON.parse(localStorage.getItem('PERSONAL_INFORMATION'));
                  
      // check if personal information in session
      if(getDraftedPersonalInformation){

        getDraftedPersonalInformation.map((item,index)=>{            
          
          setState(prevState => ({ ...prevState, [Object.keys(item) ]: Object.values(item)[0] }));
        })

      }else{
        
        loadRegions(state,setState)
      
      }
      
      

          
      

      
            
    },[])
    

    // SUBMIT FORM 1
    const handleSubmit = (event) => {
       event.preventDefault()
      // console.log("submitted");

    
      let personalInformation = Object.keys(state).map(key=>({[key]:state[key]}));
      
      
      step1FormAction(personalInformation,state);

      props.setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };
  

    
    const handleChange = (event) => {
      event.persist();      
      console.log('CHANGE',address1);
      setState({ ...state, [event.target.name]: event.target.value });
    };


    const handleSelectChange = (event,value,r)=>{
      let getName = event.target.id.substr(0, event.target.id.indexOf('-'));
      
      


            
      if(getName == 'address1'){
        let parameter = {
            regionCode:value,
            value:{[getName]: value}
        }
          
        loadProvinces(parameter,state,setState);
        
      }else if(getName == 'address2'){
        console.warn(state);
        let parameter = {
          regionCode:state.address1,
          provinceCode:value,
          value:{[getName]: value}
        }

        loadMunicipality(parameter,state,setState);
      }else if(getName == 'address3'){
        
        let parameter = {
          regionCode:state.address1,
          provinceCode:state.address2,
          municipalityCode:value,
          value:{[getName]: value}
        }

        loadBarangay(parameter,state,setState);
      }else{        
        setState({ ...state, [getName]: value});
      }
      
        
        

    

        
      
    }
  
    



    return(

        <Grid>

          <ValidatorForm onSubmit={handleSubmit} onError={() => null} id="step-1-form" >
        <InputMask
            mask="99-99-99-999-999999"
            type="text"
            name="referenceNumber"
            label="Reference Number"
            onChange={handleChange}
            value={referenceNumber || ""}            
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
            <Grid item lg={200} md={200} sm={12} xs={12} sx={{ mt: 2 }}>
           
            
            <div style={{flexDirection:'row',display:'flex'}}>
              <Grid container  lg={100} marginX={2} >
                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
               
                    type="text"
                    name="surName"
                    label="SURNAME"                                        
                    onChange={handleChange}                                        
                    value={surName}                    
                    validators={["required"]}
                    errorMessages={["this field is required"]}              
                    error={false}
                    InputLabelProps={inputLabelProps}
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
                    value={firstName}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    InputLabelProps={inputLabelProps}
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
                    value={middleName}         
                    InputLabelProps={inputLabelProps}           
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
                    value={extensionName}
                    InputLabelProps={inputLabelProps}           
                    inputProps={inputProps}
                    
                  />
                  </Grid>
              </Grid>



              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="gender"
                    label="Gender"
                    onChange={handleChange}
                    value={gender }
                    validators = {['required','matchRegexp:^[1-2]$']}
                    errorMessages = {["this field is required",'Please set 1 and 0 only.']}
                    InputLabelProps={inputLabelProps}           
                    inputProps={inputProps}                    
                  />
                   <Typography>
                          ( 1-Male, 2-Female )
                   </Typography>
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
                Address ${`${address1}`}
              </Typography>
              
              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <Autocomplete
                      disablePortal             
                      value={address1 || ''}       
                      defaultValue={address1 || ''}
                        
                      options={state.regions}                           
                      id="address1"                      
                      type="text"                      
                      label="REGION"                   
                      getOptionLabel={(option) =>option.label}                      
                      onChange={handleSelectChange}    
                      
                                                                                                                                                                         
                      renderInput={(params) => 
                        <TextField
                        {...params}    
                        InputLabelProps={inputLabelProps}           
                        inputProps={{...params.inputProps,inputProps}}                                               
                        label="REGION"                         
                        validators = {['required']}
                        errorMessages = {["this field is required"]}                                                                                        
                        value={address1}     
                      />}
                    />
                  
                  </Grid>
              </Grid>  


              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  
                  <Autocomplete               
                      disablePortal
                      defaultValue={address2 }
                      options={state.provinces}                                                                         
                      type="text"
                      id="address2"                      
                      label="PROVINCE"
                      onChange={handleSelectChange}                      
                      getOptionLabel={(option) => option && option.label}                      
                      value={address2 || ''}                
                       
                      renderInput={(params) => 
                        <TextField
                        {...params}                                                           
                        InputLabelProps={inputLabelProps}           
                        validators = {['required']}
                        errorMessages = {["this field is required"]}                        
                        label="PROVINCE"                         
                        value={address2}
                      />}
                    />
                  </Grid>
              </Grid>     


              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                   <Autocomplete
               
                      disablePortal
             
                      options={state.municipalities}                                                                         
                      type="text"
                      id="address3"                      
                      label="MUNICIPALITY"
                      onChange={handleSelectChange}
                      value={address3 || ''}
                      
                      renderInput={(params) => 
                        <TextField
                        {...params}                                                           
                        label="MUNICIPALITY" 
                        InputLabelProps={inputLabelProps}                                   
                        validators = {['required']}
                        errorMessages = {["this field is required"]}                                                      
                        value={address3}
                          id="address3"                        
                      />}
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
                   <Autocomplete
               
                      disablePortal
                      defaultValue={address4}
                      options={state.barangays}                                                                         
                      type="text"
                      id="address4"                      
                      label="BARANGAY"
                      onChange={handleSelectChange}
                      value={address4 || ''}
                      
                      renderInput={(params) => 
                        <TextField
                        {...params}                                                           
                        label="BARANGAY" 
                        InputLabelProps={inputLabelProps}                                   
                        validators = {['required']}
                        errorMessages = {["this field is required"]}                                                                              
                        id="address4"         
                        value={address4}               
                      />}
                    />
                    </Grid>
                  </Grid>  
              

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address5"
                    label="HOUSE/LOT/BLDG. NO./PUROK  "
                    onChange={handleChange}
                    value={address5 || ""}
                  
                    InputLabelProps={inputLabelProps}     
                    inputProps={inputProps}
                 
                  />
                  </Grid>
              </Grid>             

              <Grid container  lg={100} marginX={2}>
                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="address6"
                    label="STREET/SITIO/SUBDV"
                    onChange={handleChange}
                    value={address6 || ""}                
                    InputLabelProps={inputLabelProps}           
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
              {/* VERTICAL PAGE 1 */}
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
                        value={mobileNumber}
                        validators = {['required']}
                        errorMessages = {["this field is required"]}
                        InputLabelProps={inputLabelProps}           
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
                        InputLabelProps={inputLabelProps}           
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
                        
                        validators = {['isValidAge','required','date']}                        
                        errorMessages = {['Age must be 18 years old and above',"this field is required",'Invalid Date']}
                        value={birthday}
                        InputLabelProps={inputLabelProps}           
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
                          value={pobMunicipality}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          InputLabelProps={inputLabelProps}           
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
                          value={pobProvince}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          InputLabelProps={inputLabelProps}           
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
                          value={pobCountry}
                          validators = {['required']}
                          errorMessages = {["this field is required"]}
                          InputLabelProps={inputLabelProps}           
                          inputProps={inputProps}                          
                        />
                        </Grid>
                    </Grid>    
              </div>

              <div style={{flexDirection:'row',display:'flex'}}>
                         
              <Grid container  lg={100} marginX={1}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                          type="text"
                          name="religion"
                          label="RELIGION "
                          onChange={handleChange}
                          value={religion}
                          validators = {['required','matchRegexp:^[1-3]$']}
                          errorMessages = {["this field is required",'Invalid Value']}
                          InputLabelProps={inputLabelProps}           
                          inputProps={inputProps}                          
                        />
                          <Typography>
                            ( 1-Christianity, 2-Islam, 3-Others )
                          </Typography>
                        </Grid>
                    </Grid>  

                     <Grid container  lg={100} marginX={1}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                          type="text"
                          name="civilStatus"
                          label="CIVIL STATUS"
                          onChange={handleChange}                          
                          value={civilStatus}
                          validators = {['required','matchRegexp:^[1-4]$']}
                          errorMessages = {["this field is required",'Invalid Value']}
                          InputLabelProps={inputLabelProps}           
                          inputProps={inputProps}                          
                        />
                          <Typography>
                              ( 1-Single, 2-Married, 3-Widowed, 4-Separated )
                          </Typography>
                        </Grid>
                    </Grid>    
              </div>


              { civilStatus == 2 &&
                <div style={{flexDirection:'row',display:'flex'}}>
                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="spouseName"
                              label="NAME OF SPOUSE"
                              onChange={handleChange}
                              value={spouseName || ""}
                              validators = {[ (civilStatus == 2 && 'required'),'matchRegexp:^[1-3]$']}
                              errorMessages = {[ (civilStatus == 2 && "this field is required"),'Invalid Value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                          </Grid>
                      </Grid>              
                </div>
              }


                <div style={{flexDirection:'row',display:'flex'}}>
                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="mothersMaidenName"
                              label="MOTHER'S MAIDEN NAME"
                              onChange={handleChange}
                              value={mothersMaidenName}
                              validators = {['required']}
                              errorMessages = {['"this field is required']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                          </Grid>
                      </Grid>              
                </div>

                <div style={{flexDirection:'row',display:'flex'}}>                          
                    <Grid container  lg={100} marginX={1}>
                        <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                          <TextField
                            type="text"
                            name="isHouseholdHead"
                            label="IS HOUSEHOLD HEAD? "
                            onChange={handleChange}
                            value={isHouseholdHead}
                            validators = {['required','matchRegexp:^[1-2]$']}
                            errorMessages = {['"this field is required','Invalid value']}
                            InputLabelProps={inputLabelProps}           
                            inputProps={inputProps}                          
                          />
                          <Typography>
                             ( 1-YES, 2-NO)
                          </Typography>
                        </Grid>
                    </Grid>              
                </div>

                { isHouseholdHead == 2 ?

                      <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="householdHeadName"
                              label="Name of Household Head "
                              onChange={handleChange}
                              value={householdHeadName || ""}
                              validators = {['required']}
                              errorMessages = {['"this field is required']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />                           
                          </Grid>
                      </Grid>   

                        <Grid container  lg={100} marginX={1}>
                          <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="relationshipHouseholdHead"
                              label="Relationship "
                              onChange={handleChange}
                              value={relationshipHouseholdHead || ""}
                              validators = {['required']}
                              errorMessages = {['"this field is required']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />                           
                          </Grid>
                      </Grid>              
                      </div>
                  :

                  <div>
                      <div style={{flexDirection:'row',display:'flex'}}>                          
                        <Grid container  lg={100} marginX={1}>
                            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                              <TextField
                                type="text"
                                name="numberOfLivingHouseholdMembers"
                                label="No. of living household members? "
                                onChange={handleChange}
                                value={numberOfLivingHouseholdMembers}
                                validators = {['required','matchRegexp:^[0-9]{0,2}$']}
                                errorMessages = {['"this field is required','Invalid value']}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                          
                              />
                              <Typography>
                                ( 1-YES, 2-NO)
                              </Typography>
                            </Grid>
                        </Grid>              
                      </div>
                      <div style={{flexDirection:'row',display:'flex'}}>                          
                        <Grid container  lg={100} marginX={1}>
                            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                              <TextField
                                type="text"
                                name="numberOfMale"
                                label="No. of male? "
                                onChange={handleChange}
                                value={numberOfMale}
                                validators = {['required','matchRegexp:^[0-9]{0,2}$']}
                                errorMessages = {['"this field is required','Invalid value']}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                          
                              />                              
                            </Grid>
                        </Grid> 
                        <Grid container  lg={100} marginX={1}>
                            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                              <TextField
                                type="text"
                                name="numberOfFemale"
                                label="No. of female? "
                                onChange={handleChange}
                                value={numberOfFemale }
                                validators = {['required','matchRegexp:^[0-9]{0,2}$']}
                                errorMessages = {['"this field is required','Invalid value']}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                          
                              />
                              
                            </Grid>
                        </Grid>              
                      </div>
                  </div>
                }

              </Grid>
              <Divider orientation="vertical" flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}>
                {/* VERTICAL */}
              </Divider>

              {/* VERTICAL PAGE 2 */}            
              <Grid item xs>
                <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="highestFormalEducation"
                              label="HIGHEST FORMAL EDUCATION "                              
                              onChange={handleChange}
                              value={highestFormalEducation}
                              validators = {['required','matchRegexp:^[1-9]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                            <Typography>
                              ( 1-Pre-School, 2-Elementary, 3-High School (non k-12), 4-Junior High School (k-12), 5-Senior High School (k-12), 6-College, 7-Vocational, 8-Post-graduate, 9-None  )
                            </Typography>
                          </Grid>
                      </Grid>              
                  </div>

                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="personWithDisability"
                              label="PERSON WITH DISABILITY (PWD)"
                              onChange={handleChange}
                              value={personWithDisability}
                              validators = {['required','matchRegexp:^[1-2]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                            <Typography>
                                ( 1-YES, 2-NO )
                            </Typography>
                          </Grid>
                      </Grid>              
                  </div>


                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="fourPsBeneficiary"
                              label="4Ps BENEFICIARY"
                              onChange={handleChange}
                              value={fourPsBeneficiary }
                              validators = {['required','matchRegexp:^[1-2]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                            <Typography>
                                ( 1-YES, 2-NO )
                            </Typography>
                          </Grid>
                      </Grid>              
                  </div>

                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="memberOfIndigenousGroup"
                              label="MEMBER OF INDIGINEOUS GROUP "
                              onChange={handleChange}
                              value={memberOfIndigenousGroup}
                              validators = {['required','matchRegexp:^[1-2]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                            <Typography>
                                ( 1-YES, 2-NO )
                            </Typography>
                          </Grid>
                      </Grid>      
                      
                      {  memberOfIndigenousGroup == 1 &&
                          
                        <Grid container  lg={100} marginX={1}>
                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                              <TextField
                                type="text"
                                name="specifyIndigenousGroup"
                                label="Specify"
                                onChange={handleChange}
                                value={specifyIndigenousGroup || ""}
                                validators = {['required']}
                                errorMessages = {["this field is required"]}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                          
                              />
                            </Grid>
                        </Grid>              
                        
                      }        
                  </div>
                      

                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="withGovernmentId"
                              label="WITH GOVERNMENT ID?"
                              onChange={handleChange}
                              value={withGovernmentId }
                              validators = {['required','matchRegexp:^[1-2]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                            <Typography>
                              ( 1-YES, 2-NO )
                            </Typography>
                          </Grid>
                      </Grid>      
                      
                      {  withGovernmentId == 1 &&
                          
                        <>
                        
                          <Grid container  lg={100} marginX={1}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                  type="text"
                                  name="specifyIdType"
                                  label="SPECIFY ID TYPE"
                                  onChange={handleChange}
                                  value={specifyIdType || ""}
                                  validators = {['required']}
                                  errorMessages = {["this field is required"]}
                                  InputLabelProps={inputLabelProps}           
                                  inputProps={inputProps}                          
                                />
                              </Grid>
                          </Grid>       
                          <Grid container  lg={100} marginX={1}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                  type="text"
                                  name="specifyIdNumber"
                                  label="SPECIFY ID NUMBER"
                                  onChange={handleChange}
                                  value={specifyIdNumber || ""}
                                  validators = {['required']}
                                  errorMessages = {["this field is required"]}
                                  InputLabelProps={inputLabelProps}           
                                  inputProps={inputProps}                          
                                />
                              </Grid>
                          </Grid>       
                        
                        </>
                        
                      }        
                  </div>


                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="memberOfFarmerAssocCooperative"
                              label="MEMBER OF FARMER ASSOCIATION COOPERATIVE? ( 1 = YES, 2 = NO)"
                              onChange={handleChange}
                              value={memberOfFarmerAssocCooperative}
                              validators = {['required','matchRegexp:^[1-2]$']}
                              errorMessages = {['"this field is required','Invalid value']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                             <Typography>
                                ( 1-YES, 2-NO )
                            </Typography>
                          </Grid>
                      </Grid>      
                      
                      {  memberOfFarmerAssocCooperative == 1 &&
                          
                        <>
                        
                          <Grid container  lg={100} marginX={1}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                  type="text"
                                  name="specifyFarmerAssocCooperative"
                                  label="SPECIFY FARMER ASSOCIATION COOPERATIVE"
                                  onChange={handleChange}
                                  value={specifyFarmerAssocCooperative || ""}
                                  validators = {['required']}
                                  errorMessages = {["this field is required"]}
                                  InputLabelProps={inputLabelProps}           
                                  inputProps={inputProps}                          
                                />
                              </Grid>
                          </Grid>       
        
                        
                        </>
                        
                      }        
                  </div>

                  <div style={{flexDirection:'row',display:'flex'}}>                          
                      <Grid container  lg={100} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              type="text"
                              name="personToNotifyInCaseOfEmergency"
                              label="PERSON TO NOTIFY IN CASE OF EMERGENCY?"
                              onChange={handleChange}
                              value={personToNotifyInCaseOfEmergency}
                              validators = {['required']}
                              errorMessages = {['"this field is required']}
                              InputLabelProps={inputLabelProps}           
                              inputProps={inputProps}                          
                            />
                          </Grid>
                      </Grid>    
                      <Grid container  lg={100} marginX={2}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                      
                          <InputMask
                            mask="(0)999-999-9999"
                            type="text"
                            name="personToNotifyMobileNumber"
                            label="CONTACT  NUMBER"
                            onChange={handleChange}
                            value={personToNotifyMobileNumber }
                            validators = {['required']}
                            errorMessages = {["this field is required"]}
                            InputLabelProps={inputLabelProps}           
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

              </Grid>
              <Button type="submit" variant="outlined" id="step-1-submit-button" style={{display:'none'}}>Submit</Button>
            </Grid>
            </Grid>                       
          </Grid>
            
      </SimpleCard>      
      </ValidatorForm>
      </Grid>
    )
}