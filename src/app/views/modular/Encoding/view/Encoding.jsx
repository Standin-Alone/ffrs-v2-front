
import {

  styled,
  Box
} from "@mui/material";
import { Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect, useState } from "react";
import {  Grid,Button,Icon,Skeleton} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { PersonalInformation} from "./forms/PersonalInformation";
import { FarmProfile} from "./forms/FarmProfile";

import '../../../../../global/styles/style.css';
import { Uploading } from "./forms/Uploading";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
    
  }));


  
function getSteps() {
  return ["Encoding", "Farm Profile", "Uploading"];
}

function getStepContent(stepIndex,setActiveStep) {


  switch (stepIndex) {
    case 0:
      return <PersonalInformation setActiveStep={setActiveStep}/>;

    case 1:
      return <FarmProfile setActiveStep={setActiveStep}/>;

    case 2:
      return <Uploading setActiveStep={setActiveStep}/>
  }
}


const Encoding = () => {
 
  const [state, setState] = useState({
      data:[],
      columns:[{
        name:'RSBSA_NO',
        label:'RSBSA Number'
      },{
        name:'FIRST_NAME',
        label:'First Name'
      },{
        name:'MIDDLE_NAME',
        label:'Middle Name'
      },{
        name:'SURNAME',
        label:'LAST NAME'
      }],
      options:{
        serverSide:true
      },
      openAddModal:false

  });

  useEffect(()=>{    

    

    let parameter = {

    }   

  const handleEdit = ()=>{

  }
    data.map(item=>{

      item.handleEdit = handleEdit;
    })

  },[]) 


  const handleOpenAddModal = ()=>{
      setState({...state,openAddModal:state.openAddModal ? false :true})
  }

  const {data,options} = state;

  
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {

      if(activeStep == 0){
         document.getElementById('step-1-submit-button').click();
      }else if(activeStep == 1){
        document.getElementById('step-2-submit-button').click();
        // setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }else if(activeStep == 2){

        
        document.getElementById('step-3-submit-button').click();
        
      }
    
  };

  const handleBack = () => {
    
      
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  };

  const handleReset = () => setActiveStep(2);

  return (

    <Container>    
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Material", path: "/encoding" }, { name: "Form" }]} />
    </Box>
    <MuiAlert severity="error">
        The collection of personal information is for documentation, planning, reporting and processing purposes in availing agricultural related interventions. Processed data shall only be shared to partner agencies for planning, reporting and other use in accordance to the mandate of the agency. You have the right to ask for a copy of your personal data that we hold about you as well as to ask for it to be corrected if you think it is wrong.
    </MuiAlert>
    <br/>
    <br/>
    
    <Stack spacing={3} className="sample">
                
    <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>


      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>            
            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        ) : (
          <Grid>
            {getStepContent(activeStep,setActiveStep)}
            <Grid pt={2}  justifyContent="right" container>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>                
    </Stack>
  </Container>
     

  );
};

export default Encoding;
