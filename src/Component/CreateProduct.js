import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function CreateProduct() {
  const navigate = useNavigate()
  const[name, setName]=useState('')
  const[price, setPrice]=useState('')
  const[type, setType]=useState('')
  const[pack_quantity, setPack_quantity]=useState('')
  const[dosage, setDosage]=useState('')
  const[image, setImage]=useState(null)
  const[undercategory_id, setUnderCategoryId]=useState("")
  const[undercategories, setUnderCategories] = useState([])
  const[err, setErr]=useState("")
                   
  async function submitCreateProduct(e){
    e.preventDefault()
    const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
        formData.append('img', image[0]);
    }
    try{
      const response = await fetch('http://localhost:5000/prod/new', {
        method: "POST",
        body: formData,
        headers:{
        "Authorization":token
      }
      });
     if(!response.ok){
        setErr("Not Found")
     }
    } catch(err){
        console.log(err)
    }
    setName('')
    setPrice('')
    setType('')
    setPack_quantity('')
    setDosage('')
    setImage('')
    setUnderCategoryId('')
  }

  useEffect(()=>{
    fetch("http://localhost:5000/under/undercategories")
    .then(res =>res.json())
    .then(data=>setUnderCategories(data))
  },[])
  
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
        <TextField id='name' required label="Name" onChange={(e)=>setName(e.target.value)}>Name</TextField>
        <TextField id='price' required label="Price" onChange={(e)=>setPrice(e.target.value)}>Price</TextField>
        <TextField id='type ' required label="Type" onChange={(e)=>setType(e.target.value)}>Type</TextField>
        <TextField id='pack_quantity' required label="Pack_quantity" onChange={(e)=>setPack_quantity(e.target.value)}>Pack_quantity</TextField>
        <TextField id='dosage' required label="Dosage" onChange={(e)=>setDosage(e.target.value)}>Dosage</TextField>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">UnderCategory</InputLabel>
        <Select  
        labelId="demo-simple-select-label"
        value={undercategory_id}
        id="demo-simple-select"
        label="UnderCategory"
        onChange={(e)=>setUnderCategoryId(e.target.value)}>
          {undercategories.map((undercategory)=>(
            <MenuItem value={undercategory.id} key={undercategory.id}>
              {undercategory.name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <Button variant="outlined" onClick={submitCreateProduct}>Create</Button>
        <Typography component="p" color="red">
          {err ? err : null }
        </Typography>
        <Button onClick={()=>navigate('/products')}>Back</Button>
      </Box>
    </div>
  )
}
