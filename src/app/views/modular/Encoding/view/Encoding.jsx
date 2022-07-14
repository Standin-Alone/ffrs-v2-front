
import {

  styled,
  Box
} from "@mui/material";
import { Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { AddUserForm } from "./forms/EncodingForm";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import {  CircularProgress,Button,Icon,Skeleton} from '@mui/material'

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { EncodingForm } from "./forms/EncodingForm";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));


  
function getSteps() {
  return ["Encoding", "Uploading", "Create an ad"];
}

function getStepContent(stepIndex,setActiveStep) {
  switch (stepIndex) {
    case 0:
      return <EncodingForm setActiveStep={setActiveStep}/>;

    case 1:
      return `Integer euismod dapibus sapien, a interdum augue blandit eget. Donec pellentesque, sapien iaculis dignissim sagittis, risus nulla auctor eros, sed suscipit eros mauris id lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer porttitor mauris egestas consequat molestie. Nam egestas iaculis malesuada. Praesent sagittis venenatis finibus. Praesent porttitor ipsum et sapien cursus, eu mattis augue ornare.`;

    case 2:
      return `In laoreet, dui vel tristique facilisis, velit dui dictum diam, nec feugiat mi mauris eu nunc. Nullam auctor eget ante ac laoreet. Aliquam et ante ligula. Nam imperdiet augue magna, ac tincidunt neque mollis nec. Sed eu nunc sit amet tellus commodo elementum non sit amet sem. Etiam ipsum nibh, rutrum vel ultrices in, vulputate ac dolor. Morbi dictum lectus id orci dapibus, et faucibus nulla viverra. Nulla consectetur ex vitae pretium vehicula. Quisque varius tempor erat et semper. Vivamus consectetur, eros sit amet ornare facilisis, nulla felis laoreet tortor, sit amet egestas risus ipsum sed eros.`;

    default:
      return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
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
      }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (

    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Material", path: "/encoding" }, { name: "Form" }]} />
    </Box>

    <Stack spacing={3}>
                
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
            {/* <Typography>All steps completed</Typography> */}

            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep,setActiveStep)}

            <Box pt={2}>
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
            </Box>
          </Box>
        )}
      </Box>        
        
    </Stack>
  </Container>
     

  );
};

export default Encoding;
