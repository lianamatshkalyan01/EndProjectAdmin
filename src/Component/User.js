import React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function User() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/user/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    })


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
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

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width:'120vh' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right" sx={{fontWeight:'bold', fontSize:'18px' }}>First Name</StyledTableCell>
                  <StyledTableCell align="right" sx={{fontWeight:'bold', fontSize:'18px' }}>Last Name</StyledTableCell>
                  <StyledTableCell align="right" sx={{fontWeight:'bold', fontSize:'18px' }}>Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
              
                    <StyledTableCell align="right">{user.first_name}</StyledTableCell>
                    <StyledTableCell align="right">{user.last_name}</StyledTableCell>
                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        );
      }

export default User


