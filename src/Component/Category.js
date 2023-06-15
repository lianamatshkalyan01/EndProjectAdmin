import { Container, TableBody, TableCell, TableContainer, TableHead, tableCellClasses, TableRow, Button, Stack } from '@mui/material'
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

function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cat/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
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
          <Link to="/createCategory">New Category</Link>
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right" sx={{ fontWeight: 'bold', fontSize: '18px' }}>Name</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 'bold', fontSize: '18px' }}>Image</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 'bold', fontSize: '18px' }}>Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell align="right">{category.name}</StyledTableCell>
                <StyledTableCell align="right">
                <img
                    src={`http://localhost:5000/${category?.img}`}
                    alt="Category"
                   style={{ width: "100px", height: "100px" }}
                />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/updatecategory/${category.id}`}>
                    <EditIcon />
                  </Link>
                  <Link to={`/deletecategory/${category.id}`}>
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
  );
}

export default Category;






