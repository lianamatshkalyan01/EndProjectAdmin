import { Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from 'react-router-dom';

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
            <TableContainer 
            component={Paper}
            sx={{ width: "120%", margin: "50px auto" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Pack_quantity</TableCell>
                            <TableCell align="center">Dosage</TableCell>
                            <TableCell align="center">Composition</TableCell>
                            <TableCell align="center">Side_effect</TableCell>
                            <TableCell align="center">Instruction</TableCell>
                            <TableCell align="center">storage_condition</TableCell>
                            <TableCell align="center">UnderCategory Name</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((products)=>(
                          <TableRow
                          key={products.id}
                          >
                              <TableCell align="center">{products.name}</TableCell>
                              <TableCell align="center">{products.price}</TableCell>
                              <TableCell align="center">{products.type}</TableCell>
                              <TableCell align="center">{products.pack_quantity}</TableCell>
                              <TableCell align="center">{products.dosage}</TableCell>
                              <TableCell align="center">{products.composition}</TableCell>
                              <TableCell align="center">{products.side_effect}</TableCell>
                              <TableCell align="center">{products.instruction}</TableCell>
                              <TableCell align="center">{products.storage_condition}</TableCell>
                              <TableCell align="center">{products.UnderCategory?.name}</TableCell>
                              <TableCell>
                                    <img src={`http://localhost:5000/${products?.img}`} alt="Product" style={{ width: "100px", height: "100px" }} />
                                </TableCell>
                              <TableCell align="center">
                                  <Link to={`/updateproduct/${products.id}`}>
                                      <EditIcon />
                                  </Link>
                                  <Link to={`/deleteproduct/${products.id}`}>
                              <DeleteOutlineIcon />
                              </Link>
                              </TableCell>
                          </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={()=>navigate('/admin')}>Back</Button>
        </Container>
    </div>
  )
}