import { Container, TableBody, TableCell,tableCellClasses, TableContainer, TableHead, TableRow, Stack, Button } from '@mui/material'
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

export default function Product() {
    const[products, setProduct] = useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        fetch("http://localhost:5000/prod/products")
        .then((res)=> res.json())
        .then(data=>setProduct(data))
    },[])

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
            <Link to="/createproduct">New Product</Link>{" "}
          </Button>
        </Stack>
        <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                             <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Pack_quantity</StyledTableCell>
                            <StyledTableCell align="right">Dosage</StyledTableCell>
                            <StyledTableCell align="right">UnderCategory Name</StyledTableCell>
                            <StyledTableCell align="right">Image</StyledTableCell>
                            <StyledTableCell align="right">Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                 <TableBody>
                 {products.map((products) => (
            <StyledTableRow key={products.id}>
              <StyledTableCell component="th" scope="row">
                {products.name}
              </StyledTableCell>
              <StyledTableCell align="right">{products.price}</StyledTableCell>
              <StyledTableCell align="right">{products.type}</StyledTableCell>
              <StyledTableCell align="right">{products.pack_quantity}</StyledTableCell>
              <StyledTableCell align="right">{products.dosage}</StyledTableCell>
                <StyledTableCell align="right">{products.UnderCategory?.name}</StyledTableCell>
                <StyledTableCell align="right">
                    <img src={`http://localhost:5000/${products?.img}`} alt="Product" style={{ width: "100px", height: "100px" }} />
                </StyledTableCell>
                <StyledTableCell align="right">
                <Link to={`/updateproduct/${products.id}`}>
                        <EditIcon />
                </Link>
                <Link to={`/deleteproduct/${products.id}`}>
                        <DeleteOutlineIcon />
                </Link>
                </StyledTableCell>
                    </StyledTableRow>
                         ))}
                     </TableBody>
                    </Table>
                </TableContainer>
                    <Button onClick={()=>navigate('/admin')}>Back</Button>
            </Container>
            </div>
  );
}


    
        