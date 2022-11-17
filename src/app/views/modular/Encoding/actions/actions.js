
import { SET_SESSION } from "global/async_storage";
import { GET,POST} from "global/axios";
import getBaseUrl from "global/config";
import { confirmAlert } from 'react-confirm-alert'; 




export const loadRegions = (state,setState)=>{ 
    
    GET(`/ffrs/get-regions`).then((response)=>{
 
        setState({...state,regions:response.data.data.map((item)=>({label:item.REG_NAME,id:item.REG_CODE})).sort(),        
        })

        
    }).catch((error)=>{
        console.log(error) 
    });

}


export const loadProvinces = (payload,state,setState)=>{ 
    let value = payload.value;
    GET(`/ffrs/get-provinces/${payload.regionCode.id}`).then((response)=>{
    
        setState((prevState)=>({...prevState,
            // address2:null,
            // address3:null,
            provinces:response.data.data.map((item)=>({label:item.PROV_NAME,id:item.PROV_CODE})),
            ...value            
        }))
        
    }).catch((error)=>{
        console.log(error) 
    });

}


export const loadMunicipality = (payload,state,setState)=>{ 
    

    GET(`/ffrs/get-municipalities/${payload.regionCode.id}/${payload.provinceCode.id}`).then((response)=>{
            
        let value = payload.value;
      
        setState({...state,
                municipalities:response.data.data.map((item)=>({label:item.MUN_NAME,id:item.MUN_CODE})),
                ...value
            })
     
    }).catch((error)=>{
        console.log(error) 
    });

}


export const loadBarangay = (payload,state,setState)=>{ 
    

    GET(`/ffrs/get-barangay/${payload.regionCode.id}/${payload.provinceCode.id}/${payload.municipalityCode.id}`).then((response)=>{
            
        let value = payload.value;
        
        setState({...state,
                barangays:response.data.data.map((item)=>({label:item.BGY_NAME,id:item.BGY_CODE})),
                ...value
            })
        
    }).catch((error)=>{
        console.log(error) 
    });

}

export const loadCrops = (state,setState)=>{     
    GET(`/ffrs/get-crops`).then( (response)=>{                
        setState((prevState)=>({...prevState,
            crops: response.data.data.map((item)=>({label:item.CROPNAME,id:item.CROP_ID,CLASS:item.CLASSIFICATION})),         
        }))
    }).catch((error)=>{
        console.log(error) 
    });    
    return true
}


export const loadPobs = (state,setState)=>{ 
    GET(`/ffrs/get-pobs`).then((response)=>{                            
        
        setState((prevState)=>({...prevState,
                pobs:response.data.data.map((item)=>({label:item.POB,id:item.GEO_CODE,pobMunicipality:item.MUN_NAME,pobProvince:item.PROV_NAME})),               
            }))        
    }).catch((error)=>{
        console.warn(error) 
    });
}


export const checkDuplication = (value,setState)=>{ 
    setState((prevState)=>({...prevState,findingDuplicates:true}));
    let payload = {
        controlNumber:value
    }
    POST(`/ffrs/check-possible-duplicates`,payload).then( (response)=>{
   
        if(response.data.status == true){            
            setState((prevState)=>({...prevState,duplications:response.data.data,findingDuplicates:false}));
        }else{
            setState((prevState)=>({...prevState,duplications:[],findingDuplicates:false}));
          
        }
        
    }).catch((error)=>{        
        setState((prevState)=>({...prevState,findingDuplicates:false}));
    });
    
}


export const step1FormAction = (personalInformation,state)=>{ 
        
    SET_SESSION('PERSONAL_INFORMATION',personalInformation)
    
}




export const step2FormAction = (rsbsaFormInfo,setState,props)=>{ 

    try{    
        
        POST(`/ffrs/encode`,rsbsaFormInfo.data).then((response)=>{
            
            if(response.data.status == true){
                
                SET_SESSION('FARM_PROFILE',rsbsaFormInfo.farmProfile);
                props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setState((prevState)=>({...prevState,isOpen:false}))
            }else{  
                // close modal;                
                setState((prevState)=>({...prevState,isOpen:false}))
            }
            
        }).catch((error)=>{
            console.log(error) 
        });

    }catch(error){
        
    }
}



export const stepForm3Action = (uploadedFiles,setState,props)=>{ 

    try{    
        
        POST(`/ffrs/upload-files`,uploadedFiles).then((response)=>{
            
            if(response.data.status == true){
                
                props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setState((prevState)=>({...prevState,isOpen:false}))
            }else{  
                // close modal;                
                setState((prevState)=>({...prevState,isOpen:false}))
            }
            
        }).catch((error)=>{
            console.log(error) 
        });

    }catch(error){
        console.warn(error)
    }
}



