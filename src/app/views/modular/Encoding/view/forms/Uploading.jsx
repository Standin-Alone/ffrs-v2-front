
import {
    Button,    
    Grid,    
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Divider,
    Typography,  
    Icon,
    styled
  } from "@mui/material";
  import {SimpleCard } from "app/components";
  import { colors } from "app/components/MatxTheme/themeColors";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import { GET_SESSION } from "global/async_storage";
  import {Fade} from 'react-reveal';
  import {DropzoneArea} from 'mui-file-dropzone';
import { stepForm3Action } from "../../actions/actions";
import Swal from 'sweetalert2'
  
  const styles = {
    farmerImage:{
      width:'100%',
      height:'100%'
    },
    tableHeader:{
        '&:hover': {
            backgroundColor: 'green !important',
          },
    }
    
  }
  
  

  
  export const Uploading = (props)=>{
  
      
      const [state, setState] = useState({ 
        fullName:'',
        referenceNumber:'',
        personalInformation:{},
        farmParcel:[],
        uploads:[],
        typeoOfOwnershipChoices:['Registered Owner', 'Tenant', 'Lessee', 'Others'],
        ownershipFiles:[],
        otherAttachmentFiles:[],
        rsbsaFormFiles:[]
       });
    
        const {
            profileImage
        } = state;
      
        
        useEffect(async ()=>{ 

            let personalInformation = await GET_SESSION('PERSONAL_INFORMATION');
            let farmProfile = await GET_SESSION('FARM_PROFILE');
     

            
            let personalInformationClean = {};

            personalInformation.map((val,index)=>{        
                Object.keys(val).map(key=>{
                  personalInformationClean[key] = val[key]
                });
            });

          
            let fullName = `${personalInformationClean.firstName} ${personalInformationClean.hasOwnProperty('middleName') ? personalInformationClean.middleName && personalInformationClean.middleName   : ''} ${personalInformationClean.surName} ${personalInformationClean.extensionName && personalInformationClean.extensionName} `;
            let referenceNumber = personalInformationClean.referenceNumber;

            setState((prevState)=>({...prevState,fullName:fullName}));
            setState((prevState)=>({...prevState,referenceNumber:referenceNumber}));
            setState((prevState)=>({...prevState,personalInformation:personalInformationClean}));
            setState((prevState)=>({...prevState,farmParcel:farmProfile.parcel}));
         
        },[])
   


 


      const handleChangePhoto = async (event)=>{
        let image = event.target.files[0];
            
        let filePromise = new Promise((resolve,reject)=>{
            let reader = new FileReader();
            reader.readAsDataURL(image)
            

            reader.onload = () => {
                

                resolve({fileName : image.name,base64:reader.result,mime:image.name.split('.')[1]})
            
            }
                    
        });
        let filePromiseClean = await filePromise;
        setState( (prevState)=>({...prevState,profileImage:URL.createObjectURL(image),applicantImage:filePromiseClean }))
      }
          
    
  
      const handleOwnershipUploading = async (index,value)=>{
            
        let getOwnershipFiles = state.ownershipFiles;   
        
        
    
        
        let encodedFiles = Promise.all( value.map(async (fileValue)=>{
            
            let filePromise = new Promise((resolve,reject)=>{
                let reader = new FileReader();
                reader.readAsDataURL(fileValue)
                

                reader.onload = () => {
                    

                    resolve({fileName : fileValue.name,base64:reader.result,mime:fileValue.name.split('.')[1]})
                
                }
                        
            });
            
            return  await filePromise;
                               
        }));

        
      
        getOwnershipFiles.push({farmNumber:state.farmParcel[index].farmNumber,files:await encodedFiles});
        
        
        
        setState((prevState)=>({...prevState,ownershipFiles:getOwnershipFiles}))

      }


      const handleRSBSAFormUploading = async  (value)=>{

        let getRsbsaFormFiles = state.rsbsaFormFiles;
        
        
        let encodedFiles = Promise.all( value.map(async (fileValue)=>{
            
            let filePromise = new Promise((resolve,reject)=>{
                let reader = new FileReader();
                reader.readAsDataURL(fileValue)
          
                reader.onload = () => {
                    

                    resolve({fileName : fileValue.name,base64:reader.result,mime:fileValue.name.split('.')[1]})
                
                }

            
            
            });
            
            return await filePromise;
                               
        }));



        getRsbsaFormFiles.push({files:await encodedFiles});

        setState((prevState)=>({...prevState,rsbsaFormFiles:getRsbsaFormFiles}))
      } 

      const handleOtherAttachmentUploading = async (value)=>{
        let getOtherAttachmentFiles = state.otherAttachmentFiles;
        
        let encodedFiles = Promise.all( value.map(async (fileValue)=>{
            
            let filePromise = new Promise((resolve,reject)=>{
                let reader = new FileReader();
                reader.readAsDataURL(fileValue)
          
                reader.onload = () => {
                    

                    resolve({fileName : fileValue.name,base64:reader.result,mime:fileValue.name.split('.')[1]})
                
                }

            
            
            });
            
            return await filePromise;
                               
        }));

        getOtherAttachmentFiles.push({files: await encodedFiles});

        setState((prevState)=>({...prevState,otherAttachmentFiles:getOtherAttachmentFiles}))
      } 
      

    // SUBMIT FORM 3
    const handleSubmit =  (event) => {
        
       
        
      
  
  
        let payload = { 
            applicantImage:state.applicantImage,
            ownershipFiles:state.ownershipFiles,
            rsbsaFormFiles:state.rsbsaFormFiles,
            otherAttachmentFiles:state.otherAttachmentFiles,                        
          };
          
          
          
        // VALIDATION
        if(payload.applicantImage  && payload.ownershipFiles.length > 0 && payload.rsbsaFormFiles.length > 0 ){

                  
            Swal.fire({
                title: 'Do you want to upload this files?',
                showDenyButton: true,            
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
            
                    stepForm3Action(payload,setState,props)
                    
                } 
            });

        }else{

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please complete the required Attachments',      
              })
        
    
        }

     };


      

      return(
  
          <Grid>
  
            <ValidatorForm onSubmit={handleSubmit}  onError={()=>null} id="step-3-form"  >            
                <SimpleCard title={"Uploading"}>              
                <Grid container  mx={2} marginY={2}>
                    <Grid item xs={2} mx={2}>
                    {
                        state.personalInformation.gender == 1 ?
                        <div>
                            <Fade>
                           
                                <img src={state.profileImage ? state.profileImage   : `/assets/images/farmer/male-farmer.png` } style={styles.farmerImage}/>
                                <Button variant="contained" component="label" size="large"   style={{width:'100%'}}>
                                    <Icon>
                                        file_upload_outlined                                        
                                    </Icon>
                                    Upload
                                    <input hidden accept="image/*"  type="file" onChange={handleChangePhoto} />
                                </Button>  
                            </Fade>
                        </div>
                        :
                        <div >
                            <Fade >
                                
                            <img src={state.profileImage ? state.profileImage   : `/assets/images/farmer/female-farmer.png` } style={styles.farmerImage}/>
                                <Button variant="contained" component="label" size="large"   style={{width:'100%'}}>
                                    <Icon>
                                        file_upload_outlined                                        
                                    </Icon>
                                    Upload
                                    <input hidden accept="image/*"  type="file" onChange={handleChangePhoto} required />
                                </Button>          
                            </Fade>
                        </div> 
                    }             
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant={"subtitle1"}>
                            Full Name:  <Typography variant={"h6"} fontFamily="monospace" fontSize={24}>{state.fullName}</Typography>
                        </Typography>
                        <Typography variant={"subtitle1"}>
                            Control Number: <Typography variant={"h6"} fontFamily="monospace" fontSize={24}> {state.referenceNumber}</Typography> 
                        </Typography>
                    </Grid>
                </Grid> 

                    <Grid container  lg={100} marginY={2}>
                        <Grid item lg={14} >
                            <Divider flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}/>                          
                        </Grid>
                    </Grid>           
                </SimpleCard>      
                <br></br>
                <SimpleCard title={"Farm Profile Uploading"}>
                    {state.farmParcel.length > 0 ? 


                        state.farmParcel.map((item,index)=>(
                         <TableContainer >
                            <Table  aria-label="simple table" style={{ border: '0px solid #ddd'}}>
                                <TableHead>
                                    <TableRow    leRow style={styles.tableHeader} >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>

                                        <TableCell>
                                            &nbsp;
                                        </TableCell>

                                        <TableCell>  
                                            &nbsp;
                                        </TableCell>                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                            Parcel Number:
                                        </TableCell>
                                        <TableCell>
                                        <Typography fontFamily="monospace"  fontSize={18} fontWeight="bold">{item.farmNumber}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Region:
                                        </TableCell>
                                        <TableCell>
                                        <Typography fontFamily="monospace"  fontSize={18} fontWeight="bold">{state.personalInformation.address1.label}</Typography>
                                        </TableCell>
                                    </TableRow>



                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                            Province:
                                        </TableCell>
                                        <TableCell>
                                        <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">{item.farmLandDescription.province.label}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Municipality:
                                        </TableCell>
                                        <TableCell>
                                        <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">{item.farmLandDescription.municipality.label}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Barangay:
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">{item.farmLandDescription.barangay.label}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Total Farm Area:
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">{Number(item.farmLandDescription?.totalFarmArea).toFixed(4)}</Typography>
                                        </TableCell>
                                    </TableRow>


                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Ownership:
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">
                                                    {state.typeoOfOwnershipChoices.filter((ownershipChoice,index)=> (index+1) == item.farmLandDescription.typeOfOwnership )[0]}


                                        </Typography>
                                        </TableCell>
                                    </TableRow>


                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           ARB:
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontFamily="monospace" fontSize={18} fontWeight="bold">{item.farmLandDescription.ARB == 1 ? 'Yes' : 'No'}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow  >
                                        <TableCell>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell>
                                           Ownership Document<span style={{color:colors.danger}}>*</span>:
                                        </TableCell>
                                        <TableCell>
                                            <DropzoneArea
                                                acceptedFiles={['.pdf','.jpeg','.jpg','.png']}
                                                onDrop={(value)=>handleOwnershipUploading(index,value)}
                                                initialFiles={[]}
                                            />  
                                        </TableCell>
                                    </TableRow>




                                


                                </TableBody>
                            </Table>
                        </TableContainer>
                        ))

                        :
                        <Grid container  lg={100} marginX={2} >
                            <Grid item lg={14} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            No Farm Parcel Added
                            </Grid>
                        </Grid>

                    }

                    <Grid container  lg={100} marginY={2}>
                        <Grid item lg={14} >
                            <Divider flexItem  sx={{ borderRightWidth: 4 ,borderColor: colors.darkTint,borderRadius:50}}/>                          
                        </Grid>
                    </Grid>    
                </SimpleCard>

                <br></br>
                <SimpleCard title="Other Attachments">
                <TableContainer >
                    <Table  aria-label="simple table" style={{ border: '0px solid #ddd'}}>
                        <TableHead>
                            <TableRow    leRow style={styles.tableHeader} >
                                <TableCell>
                                    &nbsp;
                                </TableCell>

                                <TableCell>
                                    &nbsp;
                                </TableCell>

                                                                     
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow  >
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>RSBSA Form <span style={{color:colors.danger}}>*</span></b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <DropzoneArea
                                        dropzoneText="Drag and drop your RSBSA Form or click"                                             
                                        acceptedFiles={['.pdf','.jpeg','.jpg','.png']}
                                        onChange={handleRSBSAFormUploading}
                                    />  
                                </TableCell>
                            </TableRow>

                            <TableRow  >
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>More Attachments  <span style={{color:colors.danger}}>*</span></b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <DropzoneArea
                                        dropzoneText="Drag and drop your Other Attachments or click"                                             
                                        acceptedFiles={['.pdf','.jpeg','.jpg','.png']}
                                        onChange={handleOtherAttachmentUploading}
                                    />  
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                </TableContainer>
                </SimpleCard>
                <Button type="submit" variant="outlined" id="step-3-submit-button" style={{display:'none'}} >Submit</Button>
            </ValidatorForm>
        </Grid>
      )
  }