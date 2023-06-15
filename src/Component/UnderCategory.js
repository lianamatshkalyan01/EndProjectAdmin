import { Container, TableBody, TableCell,tableCellClasses, TableContainer, TableHead, TableRow, Button, Stack } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: "center", 
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center", 
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function UnderCategory() {
    const navigate=useNavigate()
    const [undercategories, setUnderCategories] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/under/undercategories')
        .then(res=>res.json())
        .then(data=>setUnderCategories(data))
    })

  return (
    <div>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            marginTop: "20px",
          }}
        >
          <Button>
            <Link to="/createundercategories">New UnderCategory</Link>{" "}
          </Button>
        </Stack>
         <TableContainer component={Paper}>
       <Table sx={{ minWidth: 700 }} aria-label="customized table">
         <TableHead>
              <TableRow>
             <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category Name</StyledTableCell>
                 <StyledTableCell align="right">Options</StyledTableCell>
               </TableRow>
           </TableHead>
           <TableBody>
              {undercategories.map((undercategories) => (
            <StyledTableRow key={undercategories.name}>
              <StyledTableCell component="th" scope="row">
                {undercategories.name}
              </StyledTableCell>
              <StyledTableCell align="right">{undercategories.Category?.name}</StyledTableCell>
              <StyledTableCell align="right">
                    <Link to={`/updateundercategory/${undercategories.id}`}>
                        <EditIcon />
                    </Link>
                    <Link to={`/deleteundercategory/${undercategories.id}`}>
                        <DeleteOutlineIcon />
                    </Link>
                    </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={() => navigate('/admin')}>Back</Button>
   </Container>
   </div>
  );
}

export default UnderCategory

