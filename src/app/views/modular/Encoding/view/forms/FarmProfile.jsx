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
  Button,
  Autocomplete,
  createFilterOptions
} from "@mui/material";
import {SimpleCard } from "app/components";
import { colors } from "app/components/MatxTheme/themeColors";
import { GET_SESSION } from "global/async_storage";
import { useEffect, useState,useRef, createRef} from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import NumberFormat from 'react-number-format';
import {  loadProvinces,loadMunicipality,loadBarangay,step2FormAction, loadCrops } from "../../actions/actions";
import { styles } from "../style";
import ConfirmDialog from "app/views/material-kit/dialog/ConfirmDialog";


const TextField = styled(TextValidator)((textValidatorProps) => {
  return ({
    width: "100%",
    marginBottom: "16px",   
    backgroundColor:colors.bgGray,   
    '& input:valid + fieldset': {
      borderColor:  textValidatorProps.value ? 'green' : '#ddd',      
      color: textValidatorProps.value ? 'green' : '#ddd',      
      backgroundColor: textValidatorProps.value ? colors.greenTint : '#ddd'
  },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },    
})});



const inputProps = { style: { textTransform: "uppercase",fontWeight:'bold',  zIndex:1 }};
const inputLabelProps = { style: { fontWeight:'bold',   } };


export const FarmProfile = (props)=>{
    const scrollDiv = createRef();
    const cropSizeRef  = useRef(null);
    const [state, setState] = useState({ 
      confirmationDialog:{
        isOpen:false,
        title:'',
        isConfirm:null,        
      },
      regions:[],
      provinces:[],
      municipalities:[],
      barangays:[],
      crops:[],
      // TEST DATA
      isFarmer:true,        
      isRice:true,
      isCorn:false,
      isOtherCrops:false,
      

      isLivestock:false,      

      isPoultry:false,      

      isFarmworker:true,
      isLandPreparation:true,
      isPlanting:true,
      isCultivation:true,
      isHarvesting:true,
      isOtherWork:false,
      

      isFisherFolk:true,
      isFishCapture:true,
      isAquaCulture:true,
      isGleaning:true,
      isFishProcessing:true,
      isFishVending:true,
      isOtherFishing:false,
      specifyOtherFishing:false,


      isAgriYouth:false,
      isFarmingHousehold:false,
      isAttendedFormalAgriFishery:false,
      isAttendedNonFormalAgriFishery:false,
      isParticipatedInAgriculturalActivity:false,
      isOthersTypeOfInvolvement:false,
      specifyOtherTypeOfInvolvement:false,
      
      farmingIncome:300000,
      nonFarmingIncome:300000,
      
      parcel:[{        
        farmNumber:1,
        farmLandDescription:{
            province:{label: 'ILOCOS SUR', id: '29'},
            municipality:{label: 'BAUTISTA', id: '10'},
            barangay:{label: 'BINALONAN', id: '12'},
            totalFarmArea:1,
            ownership:1,
            typeOfOwnership:1,
            ARB:1,
            ancestralDomain:1,
            farmerName:'JOhn Santos',
        },
        parcelInfo:[{
          crop:{label: 'Achuete', id: 3, CLASS: '1'},  
          size:1,
          noOfHead:1,
          farmType:1,
          organicPractitioner:1,          
        }]
      }]
      // END TEST
       
      // parcel:[{        
      //   farmNumber:1,
      //   farmLandDescription:{
      //       province:'',
      //       municipality:'',
      //       barangay:'',
      //       totalFarmArea:'',
      //       ownership:'',
      //       typeOfOwnership:'',
      //       ARB:'',
      //       ancestralDomain:'',
      //       farmerName:'',
      //   },
      //   parcelInfo:[{
      //     crop:'',  
      //     size:'',
      //     noOfHead:'',
      //     farmType:'',
      //     organicPractitioner:'',          
      //   }]
      // }]
  
      });

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
        

      } = state;
    

    useEffect(async ()=>{

      // LOAD REGIONS AND CROPS
      // loadRegions(state,setState)
      loadCrops(state,setState);
      
       

      const getRegion = await GET_SESSION('PERSONAL_INFORMATION');
 

      let farmProfile = await GET_SESSION('FARM_PROFILE');
      
      
      
    
      let parameter = {
        regionCode:getRegion[Object.keys(getRegion).filter((key)=>{
          return getRegion[key]['address1']               
        })]['address1'],
        value:{regionCode:getRegion[Object.keys(getRegion).filter((key)=>{
          return getRegion[key]['address1']               
        })]['address1']}
      }

       loadProvinces(parameter,state,setState);  

   
      // // CROP SIZE VALIDATION
      ValidatorForm.addValidationRule("cropSizeValidation", (value,event) => {
              
        let totalFarmArea = state.parcel[cropSizeRef.current.props.parcelindex]?.farmLandDescription?.totalFarmArea;
     
        
        if (value > totalFarmArea)return false;

        return true          
      });


    },[state.parcel])
    

   

    
    const handleChange = (event) => {
      event.persist();
      
      setState({ ...state, [event.target.name]: event.target.value });
    };



    
    const handleChangeParcel = (event,index) => {
      event.persist();
      
      setState({ ...state, parcel: state.parcel.map((value,parcelIndex)=>{

          if(parcelIndex == index){
               value.farmLandDescription[event.target.name]  = event.target.value   
          }

          return value
        }) 
      });
    };

    const handleChangeParcelInfo = (event,index,parcelInfoIndex) => {
      event.persist();
  

      setState((prevState)=>({...prevState , parcel: state.parcel.map((value,parcelIndex)=>{

          if(parcelIndex == index){
               value.parcelInfo = value.parcelInfo.map((parcelInfoValue,parcelInfoMapIndex)=>{

                  if(parcelInfoMapIndex == parcelInfoIndex){
                    parcelInfoValue[event.target.name]  = event.target.value  
                  }
                  return parcelInfoValue
               })
          }

          return value
        }) 
      }));
    };

    const handleCheckboxChange = (event) => {
      event.persist();
      
      setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleAddParcel = ()=>{

      let parcelCount = state.parcel.length + 1;
    

      // add new parcel;
      setState(prevState=>({...prevState, parcel:[...prevState.parcel,{
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
          organicPractitioner:''          
        }]
      }],
      numberOfFarmParcel:parcelCount
      }));

      console.warn(scrollDiv);
      // if(scrollDiv.current){
      //   scrollDiv.current.scrollIntoView({ behavior: "smooth" });
      // }
      
    }


    // ADD PARCEL INFO
    const handleAddParcelInfo =  (farmNumber)=>{
   




      
      setState((prevState)=>({...prevState, parcel:prevState.parcel.map((item)=>{
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
        )

      return true
  
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

    // SELECT PROVINCE, MUNICIPALITY AND BARANGAY
    const handleSelectChange = async (event,value,index,parcelInfoIndex)=>{
      let getName = event.target.id.substr(0, event.target.id.indexOf('-'));      


      let getParcelJson = state.parcel.filter((val,parcelIndex)=>parcelIndex == index)[0];
     
      let getRegion = await GET_SESSION('PERSONAL_INFORMATION');
      


       if(getName == 'province'){
  


        let parameter = {
          regionCode:getRegion[Object.keys(getRegion).filter((key)=>{
            return getRegion[key]['address1']               
          })]['address1'],
          provinceCode:value,
          value:{parcel: state.parcel.map((val,parcelIndex)=>{
            if(parcelIndex == index){

              val.farmLandDescription.province = value;              
            }
            return val
          })}, 
         
        }

        loadMunicipality(parameter,state,setState);
      }else if(getName == 'municipality'){
        
        let parameter = {
          regionCode:getRegion[Object.keys(getRegion).filter((key)=>{
          return getRegion[key]['address1']               
        })]['address1'],
          provinceCode:getParcelJson.farmLandDescription.province,
          municipalityCode:value,
          value:{parcel: state.parcel.map((val,parcelIndex)=>{
            if(parcelIndex == index){              
              val.farmLandDescription.municipality = value;   
            }
            return val
          })},
              
        }
        loadBarangay(parameter,state,setState);

      }else if (getName == 'barangay'){
        setState({...state,
          parcel: state.parcel.map((val,parcelIndex)=>{
            if(parcelIndex == index){              
              val.farmLandDescription.barangay = value;   
            }
            return val
          })          
      });        
      }else if(getName == 'crop'){
       
        setState((prevState)=>({...prevState , parcel: state.parcel.map((parcelValue,parcelIndex)=>{
          if(parcelIndex == index){
            parcelValue.parcelInfo = parcelValue.parcelInfo.map((parcelInfoValue,parcelInfoMapIndex)=>{

                  if(parcelInfoMapIndex == parcelInfoIndex){
                    parcelInfoValue[getName]  = value
                  }
                  return parcelInfoValue
               })
          }
          return parcelValue
        })
      })
      );

      }

  }


    // SUBMIT FORM 2
    const handleSubmit = async (event) => {
      event.preventDefault()
     
      
      
      let personalInformation = await GET_SESSION('PERSONAL_INFORMATION');
      let farmProfile = state;

      let personalInformationClean = {};

      personalInformation.map((val,index)=>{        
          Object.keys(val).map(key=>{
            personalInformationClean[key] = val[key]
          });
      });


      


      let payload = { 
          data: Object.assign(personalInformationClean,farmProfile),
          farmProfile: farmProfile
        };

      
      
      setState((prevState)=>({...prevState,confirmationDialog:{isOpen:true,title:'Are you sure you want to add this record?',confirmText:'Submit',confirm:()=>{

              step2FormAction(payload,setState,props)
              

            }
          }
        })
      );
     

   };
 

    return(
        <Grid>
          {/* CONFIRMATION DIALOG */}
          <ConfirmDialog 
              isOpen={state.confirmationDialog?.isOpen}              
              title={state.confirmationDialog?.title}
              confirm={state.confirmationDialog?.confirm}         
              confirmText={state.confirmationDialog?.confirmText}  
              cancel={()=>setState((prevState)=>({...prevState,confirmationDialog:{...prevState.confirmationDialog,isOpen:false}}))} 

          />
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
                          <FormControlLabel control={<Checkbox checked={isFarmer}    />} label="Farmer" name="isFarmer"  value={isFarmer}     onChange={handleCheckboxChange}/>                                           
                          <FormControlLabel control={<Checkbox checked={isFarmworker} />} label="Farmworker/Laborer"  name="isFarmworker"  value={isFarmworker}   onChange={handleCheckboxChange}  />                       
                          <FormControlLabel control={<Checkbox  checked={isFisherFolk} />} label="FisherFolk" name="isFisherFolk"   value={isFisherFolk}   onChange={handleCheckboxChange} />
                          <FormControlLabel control={<Checkbox  checked={isAgriYouth} />} label="AgriYouth" name="isAgriYouth"       value={isAgriYouth}   onChange={handleCheckboxChange} />
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
                        
                        <TableCell align="center" style={{borderRight: '2px solid #ddd',borderBottom:0}}>
                         
                          <Typography variant="subtitle2"  >
                          Type of Farming Activity:
                          </Typography>
                       
                        </TableCell>
                        

                                        
                        <TableCell align="center" style={{borderRight: '2px solid #ddd',borderBottom:0}}>
                 
                          <Typography variant="subtitle2">
                            Kind of Work
                          </Typography>
                       
                        </TableCell>
                        


                       
                        <TableCell align="center" style={{borderRight: '2px solid #ddd',borderBottom:0}}>
                         
                          <Typography variant="subtitle2">
                            Type of Fishing Activity                     
                          </Typography>
                       
                        </TableCell>
                        

                        <TableCell align="center" style={{border: '0px solid #ddd'}}>
                          
                      
                          <Typography variant="subtitle2">
                            Type of Involvement
                          </Typography>
                     
                        </TableCell>
                        

                      </TableRow>
                    </TableHead>

                    {/* TABLE BODY */}
                    <TableBody>      
                      <TableRow>
                      <TableCell align="center"  style={{borderRight: '2px solid #ddd'}}>
                          {/* MAINLIVELIHOOD = 1-FARMER */}
                       
                              
                              <Grid container  lg={10} mr={5} ml={5}>
                                <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                      
                                  <FormGroup >
                                    <FormControlLabel control={<Checkbox checked={isRice} disabled ={isFarmer ? false :true } />} label="Rice" name="isRice"  value={isRice}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox  checked={isCorn}  disabled ={isFarmer ? false :true } />} label="Corn"  name="isCorn"  value={isCorn}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isOtherCrops} disabled ={isFarmer ? false :true } />} label="Other Crops" name="isOtherCrops"   value={isOtherCrops}  onChange={handleCheckboxChange} />
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
                                                    disabled={isFarmer ? false : true }                                                                    
                                                  />
                                                </Grid>
                                            </Grid>    
                                          }       
                                    <FormControlLabel control={<Checkbox    checked={isLivestock}  disabled ={isFarmer ? false :true } />} label="Livestock" name="isLivestock"      value={isLivestock}  onChange={handleCheckboxChange} />
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
                                                    disabled={isFarmer ? false : true }                                                                                          
                                                  />
                                                </Grid>
                                            </Grid>    
                                    }       
                                    <FormControlLabel control={<Checkbox checked={isPoultry}  disabled ={isFarmer ? false :true } />} label="Poultry" name="isPoultry"      value={isPoultry}  onChange={handleCheckboxChange} />
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
                                                disabled={isFarmer ? false : true }                                                                                   
                                              />
                                            </Grid>
                                        </Grid>    
                                      }       
                                  </FormGroup>
                                </Grid>
                              </Grid>                                                                                                      

                      </TableCell>



                      <TableCell align="center" style={{borderRight: '2px solid #ddd'}}>
                        {/* MAINLIVELIHOOD = 2- FARM WORKER */}
                       
                          <Grid container  lg={10} mr={5}  ml={5}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                   
                        
                                <FormGroup >
                                    <FormControlLabel control={<Checkbox  checked={isLandPreparation}  disabled ={isFarmworker ? false :true }/>} label="Land Preparation" name="isLandPreparation"  value={isLandPreparation}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox checked={isPlanting} disabled ={isFarmworker ? false :true }/>} label="Planting/Transplanting"  name="isPlanting"  value={isPlanting}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isCultivation} disabled ={isFarmworker ? false :true }/>} label="Cultivation"  name="isCultivation"  value={isCultivation}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isHarvesting} disabled ={isFarmworker ? false :true }/>} label="Harvesting"  name="isHarvesting"  value={isHarvesting}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isOtherWork} disabled ={isFarmworker ? false :true }/>} label="Others"  name="isOtherWork"  value={isOtherWork}  onChange={handleCheckboxChange}  />
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
                                              disabled={isFarmworker ? false : true }                  
                                            />
                                          </Grid>
                                      </Grid>    
                                    }       
                                </FormGroup>
                            </Grid>
                          </Grid>  
                       
                      </TableCell>

                      <TableCell align="center" style={{borderRight: '2px solid #ddd'}}>
                          {/* MAINLIVELIHOOD = 3- FISHER FOLK */}
                        
                          <Grid container  lg={10} mr={5}  ml={5}>
                              <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                             
                                <FormGroup >
                                    <FormControlLabel control={<Checkbox checked={isFishCapture} disabled ={isFisherFolk ? false :true }/>} label="Fish Capture" name="isFishCapture"  value={isFishCapture}    onChange={handleCheckboxChange}/>
                                    <FormControlLabel control={<Checkbox checked={isAquaCulture} disabled ={isFisherFolk ? false :true }/>} label="Aqua Culture"  name="isAquaCulture"  value={isAquaCulture}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isGleaning} disabled ={isFisherFolk ? false :true }/>} label="Gleaning"  name="isGleaning"  value={isGleaning}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isFishProcessing} disabled ={isFisherFolk ? false :true }/>} label="Fish Processing"  name="isFishProcessing"  value={isFishProcessing}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isFishVending} disabled ={isFisherFolk ? false :true }/>} label="Fish Vending"  name="isFishVending"  value={isFishVending}  onChange={handleCheckboxChange}  />
                                    <FormControlLabel control={<Checkbox checked={isOtherFishing} disabled ={isFisherFolk ? false :true }/>} label="Others"  name="isOtherFishing"  value={isOtherFishing}  onChange={handleCheckboxChange}  />
                                    
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
                                              disabled={isFisherFolk ? false : true }                          
                                            />
                                          </Grid>
                                      </Grid>    
                                    }       
                                </FormGroup>
                            </Grid>
                          </Grid>  
                          
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
                              onValueChange={handleChange}
                              displayType={'text'}                            
                              thousandSeparator={true}
                              prefix={'PHP '}
                              decimalScale={2} 
                              allowNegative={false}        
                              renderText={(value, props) => 
                                <TextField
                                {...props}
                                type="text"
                                name="farmingIncome"
                                label="Farming:"
                                // onChange={handleChange}
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
               

                     

                      {state.parcel.map((item,index)=>(
                      <>
                      <div style={{flexDirection:'row',display:'flex'}} key={index} ref={scrollDiv}>                                    
                        {/* PARCEL TABLE START */}  
                      <Grid container  lg={70} marginX={1}>
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                          <TableContainer >
                            <Table  aria-label="simple table" style={{border: '2px solid #ddd'}}>
                              <TableHead>
                                <TableRow  >
                                  <TableCell align="center"  width="4%" style={{...styles.tableHeader,...{border: '2px solid #ddd'}}}> 
                                    Farm Parcel No.   
                                  </TableCell>

                                  <TableCell align="center" width="25%" style={{...styles.tableHeader,...{border: '2px solid #ddd'}}} >
                                    Farm Land Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>  
                                <TableRow >
                                    <TableCell align="center" style={{border: '2px solid #ddd'}}>
                                    {item.farmNumber}
                                    </TableCell>
                                    
                                    <TableCell align="center"> 
                                    <Grid container  lg={100}   pl={4}>
                                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                      <Grid container  lg={100}>
                                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                                                                             
                                                <Autocomplete               
                                                      disablePortal
                                                      defaultValue={item.farmLandDescription.province }
                                                      options={state.provinces}                                                                         
                                                      type="text"
                                                      id="province"                      
                                                      label="Location (Province):"
                                                      onChange={(event,value)=>handleSelectChange(event,value,index)}                      
                                                      getOptionLabel={(option) => option && option.label}                      
                                                      value={item.farmLandDescription.province || ''}                
                                                      
                                                      renderInput={(params) => 
                                                        <TextField
                                                        {...params}                                                           
                                                        InputLabelProps={inputLabelProps}           
                                                                                                       
                                                        validators = {['required']}
                                                        errorMessages = {["this field is required"]}                        
                                                        label="PROVINCE"                         
                                                        value={item.farmLandDescription.province}
                                                        disabled={state.isFarmer ? false : true }
                                                      />}
                                                    />
                                        </Grid>
                                      </Grid>
                                        <div style={{flexDirection:'row',display:'flex'}}>
                                          <Grid container  lg={100} >
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                                                                                      

                                            <Autocomplete               
                                                      disablePortal
                                                      defaultValue={item.farmLandDescription.municipality }
                                                      options={state.municipalities}                                                                         
                                                      type="text"
                                                      id="municipality"                      
                                                      label="Location (Municipality):"
                                                      onChange={(event,value)=>handleSelectChange(event,value,index)}                                      
                                                      getOptionLabel={(option) => option && option.label}                      
                                                      value={item.farmLandDescription.municipality || ''}                
                                                      
                                                      renderInput={(params) => 
                                                        <TextField
                                                        {...params}                                                           
                                                        InputLabelProps={inputLabelProps}           
                                                                                                       
                                                        validators = {['required']}
                                                        errorMessages = {["this field is required"]}                        
                                                        label="Municipality"                         
                                                        value={item.farmLandDescription.municipality}
                                                        disabled={state.isFarmer ? false : true }
                                                      />}
                                                    />
                                            </Grid>
                                          </Grid>

                                          <Grid container  lg={100} marginX={2}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                            <Autocomplete               
                                                      disablePortal
                                                      defaultValue={item.farmLandDescription.barangay }
                                                      options={state.barangays}              
                                                                                                                 
                                                      type="text"
                                                      id="barangay"                      
                                                      label="Location (Barangay):"
                                                      onChange={(event,value)=>handleSelectChange(event,value,index)}                                      
                                                      getOptionLabel={(option) => option && option.label}                      
                                                      value={item.farmLandDescription.barangay || ''}                
                                                      
                                                      renderInput={(params) => 
                                                        <TextField
                                                        {...params}                                                           
                                                        InputLabelProps={inputLabelProps}           
                                                                                                       
                                                        validators = {['required']}
                                                        errorMessages = {["this field is required"]}                        
                                                        label="Barangay"                         
                                                        value={item.farmLandDescription.barangay}
                                                        disabled={state.isFarmer ? false : true }
                                                      />}
                                                    />
                                            </Grid>
                                          </Grid>
                                        </div>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                                                                                               
                                              
                                            <TextField
                                                type="text"
                                                name="totalFarmArea"
                                                label="Total Farm Area:"
                                                onChange={(event)=>handleChangeParcel(event,index)}
                                                value={item.farmLandDescription.totalFarmArea || ""}
                                                validators = {['required',"matchRegexp:^\\s*(?=.*[0-9])\\d*(?:\\.\\d{1,4})?\\s*$"]}
                                                errorMessages = {["this field is required",'Please enter numbers only.']}
                                                InputLabelProps={inputLabelProps}           
                                                inputProps={inputProps}   
                                                disabled={state.isFarmer ? false : true }                                                  
                                              />

                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="ownership"
                                                    label="Ownership:"
                                                    onChange={(event)=>handleChangeParcel(event,index)}
                                                    value={item.farmLandDescription.ownership|| ""}
                                                    validators = {['required','matchRegexp:^([1-9]|1[012]|9[9])$']}
                                                    errorMessages = {["this field is required","Please input 1-12 or 99 only."]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}       
                                                    disabled={state.isFarmer ? false : true }                                              
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="typeOfOwnership"
                                                    label="Type of Ownership:"
                                                    onChange={(event)=>handleChangeParcel(event,index)}
                                                    value={item.farmLandDescription.typeOfOwnership|| ""}
                                                    validators = {['required','matchRegexp:^[1-4]$']}
                                                    errorMessages = {["this field is required",'Please set 1-4 only.']}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}   
                                                    disabled={state.isFarmer ? false : true }                                                  
                                                  />                                          
                                                  <Typography>
                                                    (1-Registered Owner, 2-Tenant, 3-Lessee, 4-Others)
                                                  </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="ARB"
                                                    label="ARB:"
                                                    onChange={(event)=>handleChangeParcel(event,index)}
                                                    value={item.farmLandDescription.ARB|| ""}
                                                    validators = {['required','matchRegexp:^[1-2]$']}
                                                    errorMessages = {["this field is required",'Please set 1 or 2 only.' ]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}        
                                                    disabled={state.isFarmer ? false : true }                                             
                                                  />                            
                                                <Typography>
                                                  (1-YES, 2-NO)
                                                </Typography>              
                                            </Grid>
                                        </Grid>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="ancestralDomain"
                                                    label="Ancestral Domain:"
                                                    onChange={(event)=>handleChangeParcel(event,index)}
                                                    value={item.farmLandDescription.ancestralDomain|| ""}
                                                    validators = {['required','matchRegexp:^[1-2]$']}
                                                    errorMessages = {["this field is required",'Please set 1 or 2 only.']}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}   
                                                    disabled={state.isFarmer ? false : true }                                                  
                                                  />               
                                              <Typography>
                                                (1-YES, 2-NO)
                                              </Typography>                              
                                            </Grid>
                                        </Grid>

                                        <Grid container  lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="farmerName"
                                                    label="Farmer Name (Rotation):"
                                                    onChange={(event)=>handleChangeParcel(event,index)}
                                                    value={item.farmLandDescription.farmerName|| ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}      
                                                    disabled={state.isFarmer ? false : true }                                               
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
                            <Table aria-label="simple table" style={{border: '2px solid #ddd',padding:'20%'}}>
                              <TableHead>
                                <TableRow >                            
                                  <TableCell align="center" width="10%"  style={styles.tableHeader} >
                                      Crop/Commodity 

                                    <Tooltip title={`                                              
                                            (Rice/Corn/HVC/Livestock/Poultry/Agri-fishery)                                            
                                            For Livestock & Poultry                                        
                                            (specify type of animal)`}>
                                        <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                    </Tooltip>
                           
                                  </TableCell>

                                  <TableCell align="center" width="10%" style={styles.tableHeader} >
                                    SIZE 
                                    <Tooltip title={`(ha)`}>
                                        <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                  </Tooltip>                                  
                                  </TableCell>


                                  <TableCell align="center" width="10%" style={styles.tableHeader} >
                                    NO. OF HEAD                                                           
                                    <Tooltip title={`(For Livestock and Poultry)`}>
                                          <Icon color={"primary"} fontSize={"small"}>help</Icon>                                       
                                    </Tooltip>
                                  </TableCell>

                                  <TableCell align="center" width="10%" style={styles.tableHeader} >
                                    FARM TYPE
                                  </TableCell>

                                  <TableCell align="center" width="10%" style={styles.tableHeader} >
                                    ORGANIC<br></br>PRACTITIONER
                                  </TableCell>
                                  
                                </TableRow>
                              </TableHead>

                              <TableBody>  
                                {/* CROP COMMODITY  START*/}

                                {item.parcelInfo.map((parcelItem,parcelItemKey)=>(
                                
                                
                                <TableRow key={parcelItemKey}>
                                    <TableCell align="center"  >
                                        <Grid container   lg={100}  pl={2} >
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                                                             
                                                   <Autocomplete               
                                                      disablePortal
                                                      defaultValue={parcelItem.crop}

                                                      // filterOptions = {
                                                      //   createFilterOptions({
                                                      //     matchFrom: 'start',
                                                      //     stringify: (option) => option.title,
                                                      //   })
                                                      // }                                                      
                                                      options={state.crops.filter(  (crop)=>{
                                                        // CONTINUE HERE
                                                        let getParcelJson = state.parcel.filter((val,parcelIndex)=>parcelIndex == index)[0];                                                                                                                
                                                     
                                                        return    getParcelJson.parcelInfo.some((item)=> item.crop?.id !== crop.id);
                                                      })}          
                                                      
                                                      

                                                      type="text"
                                                      id="crop"                                                                                                                                                                                       
                                                      onChange={(event,value)=>handleSelectChange(event,value,index,parcelItemKey)}                                                      
                                                      getOptionLabel={(option) => option && option.label}                      
                                                      value={parcelItem.crop || ''}                
                                                      
                                                      renderInput={(params) => 
                                                        <TextField
                                                        {...params}                                                           
                                                        InputLabelProps={inputLabelProps}      
                                                             
                                                        validators = {['required']}
                                                        errorMessages = {["this field is required"]}                        
                                                        label=""                         
                                                        value={parcelItem.crop.id}
                                                        disabled={state.isFarmer ? false : true }
                                                      />}
                                                    />                                      
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell   align="center">
                                        <Grid container   lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    ref = {cropSizeRef}
                                                    inputRef = {cropSizeRef}
                                                    type="text"
                                                    name="size"
                                                    parcelindex = {index}                                                    
                                                    label=""
                                                    onChange={(event)=>handleChangeParcelInfo(event,index,parcelItemKey)}
                                                    value={parcelItem.size || ""}
                                                    validators = {['required','cropSizeValidation']}
                                                    errorMessages = {["this field is required","Crop size must not exceed with the total farm area"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}                                                     
                                                    disabled={state.isFarmer ? false : true }
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell   align="center" >
                                        <Grid container   lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="noOfHead"
                                                    label=""
                                                    onChange={(event)=>handleChangeParcelInfo(event,index,parcelItemKey)}
                                                    value={parcelItem.noOfHead || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}        
                                                    disabled={state.isFarmer ? false : true }                                             
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell  align="center" >
                                        <Grid container   lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="farmType"
                                                    label=""
                                                    onChange={(event)=>handleChangeParcelInfo(event,index,parcelItemKey)}
                                                    value={parcelItem.farmType || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}       
                                                    disabled={state.isFarmer ? false : true }                                              
                                                  />                                          
                                            </Grid>
                                        </Grid>
                                    </TableCell>   
                                    <TableCell  align="center">
                                        <Grid container   lg={100}>
                                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                                 
                                              <TextField
                                                    type="text"
                                                    name="organicPractitioner"
                                                    label=""
                                                    onChange={(event)=>handleChangeParcelInfo(event,index,parcelItemKey)}
                                                    value={parcelItem.organicPractitioner || ""}
                                                    validators = {['required']}
                                                    errorMessages = {["this field is required"]}
                                                    InputLabelProps={inputLabelProps}           
                                                    inputProps={inputProps}   
                                                    disabled={state.isFarmer ? false : true }                                                  
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
                            <Grid container   spacing={2} mt={2} justifyContent="flex-end">
                              <Grid item >  
                                <Button variant="outlined" color="success" onClick={()=>handleAddParcelInfo(item.farmNumber)}     disabled={state.isFarmer ? false : true }        > <Icon>add_circle</Icon>Add</Button>
                              </Grid>
                              <Grid item >  
                                <Button variant="outlined" color="error" onClick={()=>handleRemoveParcelInfo(item.farmNumber)}     disabled={state.isFarmer ? false : true }       > <Icon>remove_circle</Icon> Remove</Button>
                              </Grid>
                             
                            </Grid>
                            
                            
                        </div>

                        </Grid>
                      </Grid>
                     
                        </div>
                      </>
                    ))}


                  {/* PARCLE GUIDE */}
                    <div style={{flexDirection:'row',display:'flex'}}>
                      <Grid container  lg={200} marginX={1} >
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                        <TableContainer >
                            <Table aria-label="simple table" style={{border: '2px solid #ddd',padding:'20%'}}>
                              <TableHead>
                                <TableRow style={styles.tableHeader} >                            
                                  <TableCell align="center" width="10%" style={styles.tableHeader}  >
                                      <Typography variant="inherit">
                                          OWNERSHIP DOCUMENT
                                          <span style={{color:colors.danger,fontWeight:'bolder',fontSize:23}}>*</span>
                                      </Typography>
                                  </TableCell>
                                  <TableCell align="center" width="10%" >
                                                                
                                  </TableCell>
                                  <TableCell align="center" width="10%"  style={styles.tableHeader} >
                                    
                                    <Typography variant="inherit">
                                          FARM TYPE      
                                          <span style={{color:colors.danger,fontWeight:'bolder',fontSize:23}}>**</span>
                                    </Typography>                        
                                  </TableCell>                                  
                                  <TableCell align="center" width="10%"  style={styles.tableHeader} >
                                  <Typography variant="inherit">
                                          Organic
                                          <span style={{color:colors.danger,fontWeight:'bolder',fontSize:23}}>***</span>
                                    </Typography>                        
                                  </TableCell>                                  
                                </TableRow>
                              </TableHead>

                              <TableBody> 
                              <TableRow >                            
                                  <TableCell align="center" width="10%" >
                                    <ol style={{fontWeight:'bold'}}>
                                      <li>Certificate of Land Transfer</li>
                                      <li>Emancipation Patent</li>
                                      <li>Individual Certificate of Land <br>
                                      </br>Ownership Award (CLOA)</li>
                                      <li>Certificate of Land Transfer</li>
                                      <li>Certificate of Land Transfer</li>
                                    </ol>
                                  </TableCell>
                                  <TableCell align="center" width="10%" >
                                  <ol start="6" style={{fontWeight:'bold'}}>
                                      <li>Agricultural Sales Patent</li>
                                      <li>Homestead Patent</li>
                                      <li>Free patent</li>                                      
                                      <li>Certificate of Title or Regular Title</li>
                                      <li>Certificate of Ancestral Domain Title</li>
                                      <li>Certificate of Ancestral Land Title</li>
                                      <li>Tax Declaration</li>
                                      <li value="99">Others (e.g. Barnagay Certification)</li>
                                    </ol>                      
                                  </TableCell>
                                  <TableCell align="center" width="10%" >
                                  <ol start="0" style={{fontWeight:'bold'}}>
                                      <li>Not Applicable</li>
                                      <li>Irrigated</li>
                                      <li>Rainfed Upland</li>
                                      <li>Rainfed Lowland</li>                                      
                                  </ol>                             
                                  <br></br>
                                  (NOTE: not applicable to agri-fishery)
                                  </TableCell>                                  
                                  <TableCell align="center" width="10%" >
                                    <ol start="0" style={{fontWeight:'bold'}}>
                                        <li>Not Applicable</li>
                                        <li>Yes</li>
                                        <li>No</li>                                        
                                    </ol>                                
                                  </TableCell>                                  
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                  </div>

                  {/* ADD PARCEL BUTTON */}
                  <div style={{flexDirection:'row',display:'flex'}}>
                      <Grid container  lg={200} marginX={1} >
                        <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>  
                          <Button variant="outlined" color="success" onClick={handleAddParcel}     disabled={state.isFarmer ? false : true }       > <Icon>add_circle</Icon>Add Parcel</Button>
                        </Grid>
                      </Grid>
                  </div>

                   
                </Grid>  
              </Grid>  
            </SimpleCard>

              <Button type="submit" variant="outlined" id="step-2-submit-button" style={{display:'none'}}>Submit</Button>

          </ValidatorForm>
      </Grid>
    )
}