import { ValidatorForm } from "react-material-ui-form-validator";
import { checkDuplication } from "../../../actions/actions";

export const cropsSizeValidation = (state,cropSizeRef)=>{
    // CROP SIZE VALIDATION
    ValidatorForm.addValidationRule("cropSizeValidation", (value,event) => {
              
        let totalFarmArea = state.parcel[cropSizeRef.current.props.parcelindex]?.farmLandDescription?.totalFarmArea;
     
        
        if (value > totalFarmArea)return false;

        return true          
      });

}


export const personalInformationValidation = (setState)=>{
    
    ValidatorForm.addValidationRule("letterDashOnly", (value) => {    
      
      console.warn(`RSBSA`,value);
        if (!/^[a-zA-Z- ]*$/i.test(value))return false;
        return true          
    });

    ValidatorForm.addValidationRule("numberOnly", (value) => {    
      
      
        if (!/^[0-9]$/i.test(value.replaceAll('-', '')))return false;
        return true          
    });


    ValidatorForm.addValidationRule("checkDuplication", (value) => {    

        checkDuplication(value,setState);
        

        
        return true          
    });



}




export const farmerProfileValidation = (state)=>{
    
    ValidatorForm.addValidationRule("cropsChecker", (value) => {    
        
        console.warn(value);


        if(state.parcel.map((parcelVal)=>{
                parcelVal.some((parcelInfo) => parcelInfo.crop.id  == value.id)
            }).length > 0){
              return false;
          }

        
        
        return true          
    });
   

}

