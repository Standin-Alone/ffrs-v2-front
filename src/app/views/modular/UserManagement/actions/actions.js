
import { GET } from "global/axios";
import getBaseUrl from "global/config";

export const loadData = (parameter,state,setState)=>{ 
    
    GET(`/ffrs/users`).then((response)=>{
        console.log(response.data.data);
        setState({...state,data:response.data.data})
    }).catch((error)=>{
        console.log(error) 
    });

}
