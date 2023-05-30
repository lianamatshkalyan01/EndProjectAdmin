import { Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from 'react-router-dom';

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
            <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "50px auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{fontWeight:"bold", fontSize:"20px"}}>Name</TableCell>
                            <TableCell align="center">Category Name</TableCell>
                            <TableCell sx={{fontWeight:"bold", fontSize:"20px"}}>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {undercategories.map((underCategory)=>(
                            <TableRow
                            key={underCategory.id}
                            >
                                <TableCell>{underCategory.name}</TableCell>
                                <TableCell>{underCategory.Category?.name}</TableCell>
                                <TableCell>
                                <Link to={`/updateundercategory/${underCategory.id}`}>
                                        <EditIcon />
                                    </Link>
                                    <Link to={`/deleteundercategory/${underCategory.id}`}>
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

export default UnderCategory