import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteProduct() {
    const navigate=useNavigate()
    const {id}=useParams()
    const submitDeleteProduct= (id) => async(e)=>{
        const token = localStorage.getItem('token')
        e.preventDefault()
        try{
            const response = fetch(`http://localhost:5000/prod/delete/${id}`,{
                method: "DELETE",
                body: JSON.stringify({
                    id
                }),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization":token
                }
            })
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <Box component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '41ch' },
        marginTop:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
      }}
      noValidate
      autoComplete="off">
        <Button variant="outlined" onClick={submitDeleteProduct(id)}>Delete</Button>
        <Button onClick={()=>navigate('/products')}>Back</Button>
        </Box>
    </div>
  )
}