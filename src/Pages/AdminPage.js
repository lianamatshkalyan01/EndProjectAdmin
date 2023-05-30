import React from 'react'
import { MenuItem, MenuList, Box, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import User from '../Component/User'


export default function Admin() {
  const navigate = useNavigate()
  const handleLogOut = () =>{
    localStorage.removeItem('token')
      navigate('/')
  }
  return (
    <div>
        <Box sx={{display: "flex",  background: "#D9E0E7" }}>
        <Box 
        sx={{
            width: 320,
            height: "88vh",
            maxWidth: "100%",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            borderRadius: "none",
            background: "white" 
          }}
          >
            <MenuList
            sx={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}
            >
            <Link to="/categories">
                <MenuItem > Categories</MenuItem>
            </Link>
            <Link to="/undercategories">
                <MenuItem > UnderCategories</MenuItem>
            </Link>
            <Link to="/products">
                <MenuItem >Products</MenuItem>
            </Link>
            <Button variant="contained" onClick={handleLogOut} >LogOut</Button>
            </MenuList>
          </Box>
          <Box sx={{marginLeft: '10%', marginTop: "50px" }}>
         
          
          </Box>
          <Box>
            <User />
          </Box>
          </Box>
    </div>
  )
}