

const setSession =  function (
    name,
    data
){

    try {
          localStorage.setItem(name, JSON.stringify(data))

      
      } catch (e) {
        // saving error
        return e;
      }

    return true;
}   


const getSession =  function  (
name    
){
    try {

        const value =  localStorage.getItem(name);        
         
        return JSON.parse(value);
        
      } catch (e) {
        // saving error
        return e;
      }    
}   


export {setSession,getSession};