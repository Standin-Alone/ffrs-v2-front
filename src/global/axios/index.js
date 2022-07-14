import axios from "axios";
import getBaseUrl from "global/config";

const POST = async (
    url,
    data
)=>{
    
    const result = await axios.post(`${getBaseUrl().ACCESS_POINT}${url}`,data);
    return result;
}   


const GET = async (
url    
)=>{
    const result = await axios.get(`${getBaseUrl().ACCESS_POINT}${url}`);
    console.warn(result);
    return result;
}   


export {POST,GET};