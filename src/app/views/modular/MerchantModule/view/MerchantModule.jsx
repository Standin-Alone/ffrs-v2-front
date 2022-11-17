
import {

  styled,
  Box
} from "@mui/material";
import { Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import {  CircularProgress,Button,Icon,Skeleton} from '@mui/material'

import { Outlet } from 'react-router-dom';
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));


const MerchantModule = () => {
 
  const [state, setState] = useState({
     

  });





  return (

    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Material", path: "/users" }, { name: "Form" }]} />
    </Box>

    <Stack spacing={3}>
     
        
        
    </Stack>
  </Container>
     

  );
};

export default MerchantModule;
