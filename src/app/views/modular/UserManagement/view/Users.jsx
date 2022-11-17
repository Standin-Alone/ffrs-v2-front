
import {

  styled,
  Box
} from "@mui/material";
import { Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { AddUserForm } from "./forms/AddUserForm";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import {  CircularProgress,Button,Icon,Skeleton} from '@mui/material'
import { loadData } from "../actions/actions";
import UserAddModal from "./modal/UserAddModal";
import { Outlet } from 'react-router-dom';
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));


const Users = () => {
 
  const [state, setState] = useState({
      data:[],
      columns:[{
        name:'rsbsa_no',
        label:'RSBSA Number'
      },{
        name:'first_name',
        label:'First Name'
      },{
        name:'middle_name',
        label:'Middle Name'
      },{
        name:'surname',
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

    return loadData(parameter,state,setState)

  },[]) 


  const handleOpenAddModal = ()=>{
      setState({...state,openAddModal:state.openAddModal ? false :true})
  }

  const {data,options} = state;

  return (

    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Material", path: "/users" }, { name: "Form" }]} />
    </Box>

    <Stack spacing={3}>
                
        <Button variant="contained" color="primary" style={{width:200}} onClick={handleOpenAddModal}>
          <Icon>add</Icon> Add User
        </Button>
    
        <UserAddModal 
            open={state.openAddModal} 
            onClose={()=>setState({...state,openAddModal:false})} 
            title="Add Modal"
        />

        {
          state.data.length > 0 ? 
          <MUIDataTable
          title={"Farmer List"}
          data={state.data}  
          columns={state.columns}                             
          />  
                     
          :
          <SimpleCard className="bg-primary">          
                
              <Box sx={{width:'100%'}}>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>
              <Skeleton height={50}/>

              
              </Box>
            {/* <div  style={{alignContent:'center',alignSelf:'center',justifyContent:'center',display:'flex'}} b>
              <CircularProgress className="progress" color="success" />
            </div> */}
          </SimpleCard>
        }
        
        
    </Stack>
  </Container>
     

  );
};

export default Users;
