import { 
  FormControlLabel,
  FormGroup,
  Grid,    
  Checkbox,
  styled,
  Typography,  
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Icon,
  Button
} from "@mui/material";
import {SimpleCard } from "app/components";
import { colors, themeColors } from "app/components/MatxTheme/themeColors";
import { object } from "prop-types";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import NumberFormat from 'react-number-format';
import { styles } from "../style";



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


export const FarmProfile = (props)=>{
  
    
    const [state, setState] = useState({ 
      parcel:[{
        farmNumber:1,
        farmLandDescription:{
            province:'',
            municipality:'',
            barangay:'',
            totalFarmArea:'',
            ownership:'',
            typeOfOwnership:'',
            ARB:'',
            ancestralDomain:'',
            farmerName:'',
        },
        parcelInfo:[{
          crop:'',  
          size:'',
          noOfHead:'',
          farmType:'',
          organicPractitioner:'',
          remarks:''
        }]
      }]
  
      });
      
      let myDiv = '';
      const {
        isFarmer,        
        isRice,
        isCorn,
        isOtherCrops,
        specifyOtherCrops,

        isLivestock,
        specifyLivestock,

        isPoultry,
        specifyPoultry,

        isFarmworker,
        isLandPreparation,
        isPlanting,
        isCultivation,
        isHarvesting,
        isOtherWork,
        specifyOtherWork,

        isFisherFolk,
        isFishCapture,
        isAquaCulture,
        isGleaning,
        isFishProcessing,
        isFishVending,
        isOtherFishing,
        specifyOtherFishing,


        isAgriYouth,
        isFarmingHousehold,
        isAttendedFormalAgriFishery,
        isAttendedNonFormalAgriFishery,
        isParticipatedInAgriculturalActivity,
        isOthersTypeOfInvolvement,
        specifyOtherTypeOfInvolvement,
        
        farmingIncome,
        nonFarmingIncome,

        
        //  PARCEL 
        numberOfFarmParcel,
        nameOfFarmersInRotation,
        

      } = state;
    

    useEffect(async ()=>{
      
    },[])
    

    // SUBMIT FORM 2
    const handleSubmit = (event) => {
       event.preventDefault()
      // console.log("submitted");

     
      props.setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };
  

    
    const handleChange = (event) => {
      event.persist();
      
      setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleChangeFarmDescription = (event) => {
      event.persist();
      
      setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleCheckboxChange = (event) => {
      event.persist();
      
      setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleAddParcel = ()=>{

      let parcelCount = state.parcel.length + 1;
    

      // add new parcel;
      setState({ ...state, parcel:[...state.parcel,{
        farmNumber:parcelCount,
        farmLandDescription:{
            province:'',
            municipality:'',
            barangay:'',
            totalFarmArea:'',
            ownership:'',
            typeOfOwnership:'',
            ARB:'',
            ancestralDomain:'',
            farmerName:'',
        },
        parcelInfo:[{
          crop:'',  
          size:'',
          noOfHead:'',
          farmType:'',
          organicPractitioner:'',
          remarks:''
        }]
      }]});

    }


    // ADD PARCEL INFO
    const handleAddParcelInfo = (farmNumber)=>{
      
     
      
      setState({ ...state, parcel:state.parcel.map((item)=>{
                    if(item.farmNumber == farmNumber){
                        item.parcelInfo = [...item.parcelInfo,{  
                        crop:'',  
                        size:'',
                        noOfHead:'',
                        farmType:'',
                        organicPractitioner:''}];
                    }
                    return item
          })
      })
    }

    // REMOVE PARCEL INFO
    const handleRemoveParcelInfo = (farmNumber)=>{
     
      setState({ ...state, parcel:state.parcel.map((item)=>{
                    if(item.farmNumber == farmNumber){
                        item.parcelInfo = item.parcelInfo.splice(1);
                    }
                    return item
          })
      })
    }

    return(

        <Grid>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null} id="step-1-form" >
            <SimpleCard title="Farm Profile" >        
            <Grid container spacing={6}>            
              <Grid item lg={200} md={200} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div style={{flexDirection:'row',display:'flex'}}>                                    
                      <Grid container  lg={100} marginX={2}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        

                        <Typography variant="subtitle1">
                            MAIN LIVELIHOOD
                        </Typography>
                        <FormGroup row >
                          <FormControlLabel control={<Checkbox />} label="Farmer" name="isFarmer"  value={isFarmer}    onChange={handleCheckboxChange}/>                                           
                          <FormControlLabel control={<Checkbox />} label="Farmworker/Laborer"  name="isFarmworker"  value={isFarmworker}  onChange={handleCheckboxChange}  />                       
                          <FormControlLabel control={<Checkbox />} label="FisherFolk" name="isFisherFolk"   value={isFisherFolk}  onChange={handleCheckboxChange} />
                          <FormControlLabel control={<Checkbox />} label="AgriYouth" name="isAgriYouth"      value={isAgriYouth}  onChange={handleCheckboxChange} />
                        </FormGroup>
                      </Grid>                  
                    </Grid>  
                  </div>
                


                <div  style={{flexDirection:'row',display:'flex'}}>

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{border: '2px solid #ddd'}}>
                    <TableHead>
                      <TableRow style={styles.tableHeader} >
                        {/* FOR FARMER CELL */}
                        <TableCell align="center" style={styles.tableHeader} >
                          <Typography variant="subtitle1" style={{fontWeight:'bold'}}>
                            For Farmers:
                          </Typography>                                                                                             
                        </TableCell>

                        {/* FOR FARMWORKERS CELL */}
                        <TableCell align="center" style={styles.tableHeader} >
                          <Typography variant="subtitle1" style={{fontWeight:'bold'}}>
                              For Farmworkers:
                          </Typography>                             
                        </TableCell>

                          
                        {/* FOR FISHERFOLK CELL */}

                     
                        <TableCell align="center" style={styles.tableHeader} >                   
                            <Typography variant="subtitle1" style={{fontWeight:'bold'}}>
                                For Fisherfolk:
                            </Typography>                                              
                        </TableCell>

                        <TableCell align="center" style={styles.tableHeader} >
                          <Typography   variant="subtitle1" style={{fontWeight:'bold'}}>
                            For Agri Youth:
                          </Typography>                            
                        </TableCell>                        
                      </TableRow>



                      <TableRow>
                        
                        <TableCell align="center" style={{border: '0px solid #ddd'}}>
                          {isFarmer  && 
                          <Typography variant="subtitle2" >
                          Type of Farming Activity:
                          </Typography>
                          }
                        </TableCell>
                        

                                        
                        <TableCell align="center" style={{border: '0px solid #ddd'}}>
                          {isFarmworker && 
                          <Typography variant="subtitle2">
                            Kind of Work
                          </Typography>
                          }
                        </TableCell>
                        


                       
                        <TableCell align="center" style={{border: '0px solid #ddd'}}>
                          {isFisherFolk && 
                          <Typography variant="subtitle2">
                            Type of Fishing Activity                     
                          </Typography>
                          }
                        </TableCell>
                        

                        <TableCell align="center" style={{border: '0px solid #ddd'}}>
                          
                        {isAgriYouth && 
                          <Typography variant="subtitle2">
                            Type of Involvement
                          </Typography>
                        }
                        </TableCell>
                        

                      </TableRow>
                    </TableHead>

                    {/* TABLE BODY */}
                    <TableBody>      
                      <TableRow>
                      <TableCell align="center">
                          {/* MAINLIVELIHOOD = 1-FARMER */}
                          {isFarmer  &&   
                              
                              <Grid container  lg={10} mr={5} ml={5}>
                                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                      
                                  <FormGroup >
                                    <FormControlLabel control={<Checkbox />} label="Rice" name="isRice"  value={isRice}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox />} label="Corn"  name="isCorn"  value={isCorn}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Other Crops" name="isOtherCrops"   value={isOtherCrops}  onChange={handleCheckboxChange} />
                                          {/* OTHER CROPS */}
                                          { isOtherCrops &&
                                                <Grid container  lg={100} marginX={1}>
                                                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                  <TextField
                                                    type="text"
                                                    name="specifyOtherCrops"
                                                    label="Please Specify:"
                                                    onChange={handleChange}
                                                    value={specifyOtherCrops || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                                       
                                                  />
                                                </Grid>
                                            </Grid>    
                                          }       
                                    <FormControlLabel control={<Checkbox />} label="Livestock" name="isLivestock"      value={isLivestock}  onChange={handleCheckboxChange} />
                                    {/* LIVESTOCK */}
                                    { isLivestock &&
                                                <Grid container  lg={100} marginX={1}>
                                                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                  <TextField
                                                    type="text"
                                                    name="specifyLivestock"
                                                    label="Please Specify:"
                                                    onChange={handleChange}
                                                    value={specifyLivestock || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                          
                                                  />
                                                </Grid>
                                            </Grid>    
                                    }       
                                    <FormControlLabel control={<Checkbox />} label="Poultry" name="isPoultry"      value={isPoultry}  onChange={handleCheckboxChange} />
                                      {/* POULTRY */}
                                      { isPoultry &&
                                        <Grid container  lg={100} marginX={1}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                              <TextField
                                                type="text"
                                                name="specifyPoultry"
                                                label="Please Specify:"
                                                onChange={handleChange}
                                                value={specifyPoultry || ""}
                                                validators = {['required']}
                                                errorMessages = {["this field is required"]}
                                                InputLabelProps={inputLabelProps}           
                                                inputProps={inputProps}                          
                                              />
                                            </Grid>
                                        </Grid>    
                                      }       
                                  </FormGroup>
                                </Grid>
                              </Grid>                                                                       
                              }            

                      </TableCell>



                      <TableCell align="center">
                        {/* MAINLIVELIHOOD = 2- FARM WORKER */}
                        { isFarmworker &&
                          <Grid container  lg={10} mr={5}  ml={5}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                   
                        
                                <FormGroup >
                                    <FormControlLabel control={<Checkbox />} label="Land Preparation" name="isLandPreparation"  value={isLandPreparation}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox />} label="Planting/Transplanting"  name="isPlanting"  value={isPlanting}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Cultivation"  name="isCultivation"  value={isCultivation}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Harvesting"  name="isHarvesting"  value={isHarvesting}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Others"  name="isOtherWork"  value={isOtherWork}  onChange={handleCheckboxChange}  />
                                    {/* OTHER WORK */}
                                    { isOtherWork &&
                                      <Grid container  lg={100} marginX={1}>
                                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField
                                              type="text"
                                              name="specifyOtherWork"
                                              label="Please Specify:"
                                              onChange={handleChange}
                                              value={specifyOtherWork || ""}
                                              validators = {['required']}
                                              errorMessages = {["this field is required"]}
                                              InputLabelProps={inputLabelProps}           
                                              inputProps={inputProps}                          
                                            />
                                          </Grid>
                                      </Grid>    
                                    }       
                                </FormGroup>
                            </Grid>
                          </Grid>  
                          }
                      </TableCell>

                      <TableCell align="center">
                          {/* MAINLIVELIHOOD = 3- FISHER FOLK */}
                          { isFisherFolk &&
                          <Grid container  lg={10} mr={5}  ml={5}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                             
                                <FormGroup >
                                    <FormControlLabel control={<Checkbox />} label="Fish Capture" name="isFishCapture"  value={isFishCapture}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox />} label="Aqua Culture"  name="isAquaCulture"  value={isAquaCulture}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Gleaning"  name="isGleaning"  value={isGleaning}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Fish Processing"  name="isFishProcessing"  value={isFishProcessing}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Fish Vending"  name="isFishVending"  value={isFishVending}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox />} label="Others"  name="isOtherFishing"  value={isOtherFishing}  onChange={handleCheckboxChange}  />
                                    
                                    {/* OTHER WORK */}
                                    { isOtherFishing &&
                                      <Grid container  lg={200} marginX={1}>
                                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField
                                              type="text"
                                              name="specifyOtherFishing"
                                              label="Please Specify:"
                                              onChange={handleChange}
                                              value={specifyOtherFishing || ""}
                                              validators = {['required']}
                                              errorMessages = {["this field is required"]}
                                              InputLabelProps={inputLabelProps}           
                                              inputProps={inputProps}                          
                                            />
                                          </Grid>
                                      </Grid>    
                                    }       
                                </FormGroup>
                            </Grid>
                          </Grid>  
                          }
                      </TableCell>

                      <TableCell align="center">
                        {/* MAINLIVELIHOOD = 4- AGRI YOUTH*/}
                        { isAgriYouth &&
                              <Grid container  lg={10} mr={5}  ml={5}>
                                  <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                              
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox />} label="part of a farming household" name="isFarmingHousehold"  value={isFarmingHousehold}    onChange={handleCheckboxChange}/>
                                        <FormControlLabel control={<Checkbox />} label="attending/attended formal agri-fishery related course"  name="isAttendedFormalAgriFishery"  value={isAttendedFormalAgriFishery}  onChange={handleCheckboxChange}  />
                                        <FormControlLabel control={<Checkbox />} label="attending/attended non-formal agri-fishery related course"  name="isAttendedNonFormalAgriFishery"  value={isAttendedNonFormalAgriFishery}  onChange={handleCheckboxChange}  />
                                        <FormControlLabel control={<Checkbox />} label="participated in any agricultural activity/program"  name="isParticipatedInAgriculturalActivity"  value={isParticipatedInAgriculturalActivity}  onChange={handleCheckboxChange}  />
                                        
                                        <FormControlLabel control={<Checkbox />} label="Others"  name="isOthersTypeOfInvolvement"  value={isOthersTypeOfInvolvement}  onChange={handleCheckboxChange}  />

                                        {/* OTHER WORK */}
                                        { isOthersTypeOfInvolvement &&
                                          <Grid container  lg={20} marginX={1}>
                                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                <TextField
                                                  type="text"
                                                  name="specifyOtherTypeOfInvolvement"
                                                  label="Please Specify:"
                                                  onChange={handleChange}
                                                  value={specifyOtherTypeOfInvolvement || ""}
                                                  validators = {['required']}
                                                  errorMessages = {["this field is required"]}
                                                  InputLabelProps={inputLabelProps}           
                                                  inputProps={inputProps}                          
                                                />
                                              </Grid>
                                          </Grid>    
                                        }       
                                    </FormGroup>
                                </Grid>
                              </Grid>  
                              }
                      </TableCell>
                      </TableRow>              
                    </TableBody>
                  </Table>
                  </TableContainer>
                </div>     
                
              <div style={{flexDirection:'row',display:'flex'}}>                                    
                      <Grid container  lg={100} marginX={2}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        

                         

                        <Typography variant="subtitle1">
                            Gross Annual Income Last Year
                        </Typography>

                        <div style={{flexDirection:'row',display:'flex'}}>  
                        <Grid container  lg={20} marginX={1}>
                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <NumberFormat
                              value={farmingIncome || ""}                              
                              displayType={'text'}
                              allowedDecimalSeparators
                              thousandSeparator={true}
                              prefix={'PHP '}
                              decimalScale={2} 
                              allowNegative={false}        
                              renderText={(value, props) => 
                                <TextField
                                type="text"
                                name="farmingIncome"
                                label="Farming:"
                                onChange={handleChange}
                                value={value || ""}
                                validators = {['required']}
                                errorMessages = {["this field is required"]}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                                                     
                              />
                              }
                            />
                                  
                            </Grid>
                        </Grid>    
                  
                      <Grid container  lg={20} marginX={1}>
                          <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                  
                        
                            <NumberFormat
                              value={nonFarmingIncome || ""}                              
                              displayType={'text'}
                              allowedDecimalSeparators
                              thousandSeparator={true}
                              prefix={'PHP '}
                              decimalScale={2} 
                              allowNegative={false}        
                              renderText={(value, props) => 
                                <TextField
                                type="text"
                                name="nonFarmingIncome"
                                label="Non-farming:"
                                onChange={handleChange}
                                value={value || ""}
                                validators = {['required']}
                                errorMessages = {["this field is required"]}
                                InputLabelProps={inputLabelProps}           
                                inputProps={inputProps}                                       
                            />
                              }
                            />
                                  
                        </Grid>
                      </Grid>  
                      </div>                                
                    </Grid>
                    </Grid>
                  </div>
                                                                                                                                        
              </Grid>
            </Grid>
            </SimpleCard> 
            
            <br></br>
            <br></br>


            {/* PARCEL CARD  */}
            <SimpleCard title="Parcel" >   
           
            <Grid container spacing={6}>            
              <Grid item lg={200} md={200} sm={12} xs={12} sx={{ mt: 2 }}>
                
                  <div style={{flexDirection:'row',display:'flex'}}>                                    
                      <Grid container  lg={100} marginX={2}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>   
                          <NumberFormat
                                value={numberOfFarmParcel || ""}                              
                                displayType={'text'}
                                allowedDecimalSeparators
                                thousandSeparator={true}                                                   
                                allowNegative={false}        
                                
                                renderText={(value, props) => 
                                  <TextField
                                  type="text"
                                  name="numberOfFarmParcel"
                                  label="Number of Farm Parcel:"
                                  onChange={handleChange}
                                  value={value || ""}
                                  validators = {['required']}
                                  errorMessages = {["this field is required"]}
                                  InputLabelProps={inputLabelProps}           
                                  inputProps={inputProps}                                                     
                                />
                                }
                              />
                        </Grid>
                      </Grid>  

                 
                  </div>
                    
               

                     

                      {state.parcel.map((item)=>(
                      <>
                      <div style={{flexDirection:'row',display:'flex'}} ref={(el)=>{myDiv = el}}>                                    
                        {/* PARCEL TABLE START */}  
                      <Grid container  lg={50} marginX={1}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                          <TableContainer >
                            <Table  aria-label="simple table" style={{border: '2px solid #ddd'}}>
                              <TableHead>
                                <TableRow style={styles.tableHeader} >
                                  <TableCell align="center"> 
                                    Farm Parcel No.   
                                  </TableCell>

                                  <TableCell align="center">
                                    Farm Land Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>  
                                <TableRow >
                                    <TableCell align="center">
                                    {item.farmNumber}
                                    </TableCell>
                                    
                                    <TableCell align="center" > 
                                    <Grid container  lg={100}  >
                                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                      <Grid container  lg={100}>
                                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                          <TextField
                                                type="text"
                                                name="nameOfFarmersInRotation"
                                                label="Location (Province):"
                                                onChange={handleChange}
                                                value={item.farmLandDescription.province|| ""}
                                                validators = {['required']}
                                                errorMessages = {["this field is required"]}
                                                InputLabelProps={inputLabelProps}           
                                                inputProps={inputProps}                                                     
                                              />                                          
                                        </Grid>
                                      </Grid>
                                        <div style={{flexDirection:'row',display:'flex'}}>
                                          <Grid container  lg={100} >
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Location (Municipality):"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.municipality|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                          </Grid>

                                          <Grid container  lg={100} marginX={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Location (Barangay):"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.barangay|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                          </Grid>
                                        </div>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Total Farm Area:"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.totalFarmArea|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Ownership:"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.ownership|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Type of Ownership:"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.typeOfOwnership|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="ARB:"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.ARB|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Ancestral Domain:"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.ancestralDomain|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label="Farmer Name (Rotation):"
                                                    onChange={handleChange}
                                                    value={item.farmLandDescription.farmerName|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                      </Grid>
                                    </TableCell>                                           
                                  </TableRow>                    
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>

                      
                      
                      <Grid container  lg={100}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                          <TableContainer >
                            <Table aria-label="simple table" style={{border: '2px solid #ddd'}}>
                              <TableHead>
                                <TableRow style={styles.tableHeader} >                            
                                  <TableCell align="center">
                                      Crop/Commodity 

                                    <Tooltip title={`                                              
                                            (Rice/Corn/HVC/Livestock/Poultry/Agri-fishery)                                            
                                            For Livestock & Poultry                                        
                                            (specify type of animal)`}>
                                        <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                    </Tooltip>
                           
                                  </TableCell>

                                  <TableCell align="center">
                                    SIZE 
                                    <Tooltip title={`(ha)`}>
                                        <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                  </Tooltip>                                  
                                  </TableCell>


                                  <TableCell align="center">
                                    NO. OF HEAD                                                           
                                    <Tooltip title={`(For Livestock and Poultry)`}>
                                          <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                    </Tooltip>
                                  </TableCell>

                                  <TableCell align="center">
                                    FARM TYPE
                                  </TableCell>

                                  <TableCell align="center">
                                    ORGANIC<br></br>PRACTITIONER
                                  </TableCell>

                                  <TableCell align="center">
                                    REMARKS 
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>  
                                {/* CROP COMMODITY  START*/}

                                {item.parcelInfo.map((parcelItem)=>(


                                
                                
                                <TableRow >
                                    <TableCell align="center">
                                        <Grid container   mx={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.crop || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <Grid container   mx={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.size || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell align="center" >
                                        <Grid container   mx={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.noOfHead || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell align="center" >
                                        <Grid container   mx={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.farmType || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell align="center" >
                                        <Grid container   mx={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.organicPractitioner || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell align="center" >
                                        <Grid container  mx={3}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="nameOfFarmersInRotation"
                                                    label=""
                                                    onChange={handleChange}
                                                    value={parcelItem.remarks || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>                                           
                                  </TableRow>                    

                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          {/* PARCEL INFO BUTTONS */}
                          <div style={{flexDirection:'row',display:'flex',justifyContent:'flex-end'}}>
                            <Grid container row  spacing={2} mt={2} justifyContent="flex-end">
                              <Grid item >  
                                <Button variant="outlined" color="success" onClick={()=>handleAddParcelInfo(item.farmNumber)}> <Icon>add_circle</Icon>Add</Button>
                              </Grid>
                              <Grid item >  
                                <Button variant="outlined" color="error" onClick={()=>handleRemoveParcelInfo(item.farmNumber)}> <Icon>remove_circle</Icon> Remove</Button>
                              </Grid>
                             
                            </Grid>
                            
                            
                        </div>

                        </Grid>
                      </Grid>
                     
                        </div>
                      </>
                    ))}

                    <div style={{flexDirection:'row',display:'flex'}}>
                      <Grid container  lg={200} marginX={1} >
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                          <Button variant="outlined" color="success" onClick={handleAddParcel}> <Icon>add_circle</Icon>Add Parcel</Button>
                        </Grid>
                      </Grid>
                  </div>

                   
                </Grid>  
              </Grid>  
            </SimpleCard>

                

          </ValidatorForm>
      </Grid>
    )
}