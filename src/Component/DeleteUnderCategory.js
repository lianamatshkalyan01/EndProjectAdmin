import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteUnderCategory() {
    const[isDel, setIsDel] = useState(false)
    const {id}=useParams()
    const navigate = useNavigate()

    const submitDeleteUnderCategory = (id)=> async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        try{
            const response = await fetch(`http://localhost:5000/under/delete/${id}`, {
                method:"DELETE",
                body: JSON.stringify({
                    id
                }),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization":token
                }
            })
            const data = await response.json()
            console.log(data, 'data')
            setIsDel(true)
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
        <Button variant="outlined" onClick={submitDeleteUnderCategory(id)}>Delete</Button>
        <Button onClick={()=>navigate('/undercategories')}>Back</Button>
        </Box>
    </div>
  )
}