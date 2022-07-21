
import { SET_SESSION } from "global/async_storage";
import { GET,POST} from "global/axios";
import getBaseUrl from "global/config";





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
    
        setState({...state,
            address2:null,
            address3:null,
            provinces:response.data.data.map((item)=>({label:item.PROV_NAME,id:item.PROV_CODE})),
            ...value            
        })
        
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




export const step1FormAction = (personalInformation,state)=>{ 


    SET_SESSION('PERSONAL_INFORMATION',personalInformation)
    
}