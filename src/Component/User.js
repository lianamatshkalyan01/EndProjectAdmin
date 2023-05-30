import { Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate=useNavigate()
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/user/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
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
        </Stack>
            <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "50px auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{fontWeight:"bold", fontSize:"20px"}}>First Name</TableCell>
                            <TableCell sx={{fontWeight:"bold", fontSize:"20px"}}>Last Name</TableCell>
                            <TableCell sx={{fontWeight:"bold", fontSize:"20px"}}>E-Mail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user)=>(
                            <TableRow
                            key={user.id}
                            >
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>
  )
}

export default User