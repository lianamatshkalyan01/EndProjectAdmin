import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

export default function EditProduct() {
  const navigate=useNavigate()
  const {id}=useParams()
  const[undercategories, setUnderCategories] = useState([])
  const[products, setProducts]=useState({})
  const [image, setImage] = useState(null)
  const[err, setErr]=useState('')

  const submitUpdateProducts = (id)=>async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(products.name.trim() === "" || products.price.trim() === "" || products.type.trim() === "" || products.pack_quantity.trim() === "" || products.dosage.trim() === "" || products.image.trim() === "" || products.undercategory_id === ""){
        setErr("Fill all fields")
      return
    }
    try{
      const response= await fetch(`http://localhost:5000/prod/update/${id}`,{
        method:"PUT",
        body:JSON.stringify({
          name: products.name,
          price: products.price,
          type: products.type,
          pack_quantity: products.pack_quantity,
          image: products.image,
          undercategory_id: products.undercategory_id
        }),
        headers:{
          "Content-type": "application/json; charset=UTF-8", 
          "Authorization":token
        },
      })
     if(!response.ok){
      setErr("Not Found")
     }
      
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetch("http://localhost:5000/under/undercategories")
    .then(res =>res.json())
    .then(data=>setUnderCategories(data))
  },[])

  useEffect(()=>{
    fetch(`http://localhost:5000/prod/${id}`)
    .then(res =>res.json())
    .then (data=>{
      console.log(data)
      setProducts(data[0])
    })
  },[id])

  return (
    <div>
      {
        products.name !== undefined ?
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
<TextField id='name' label="name" value={products?.name} onChange={(e)=>setProducts((prevState)=>({
        ...prevState,
        name: e.target.value
}))} />
<TextField id='price' label="price" value={products?.price} onChange={(e)=>setProducts((prevState)=>({
  ...prevState,
  price: e.target.value
}))} />
<TextField id='type' label="type" value={products?.type} onChange={(e)=>setProducts((prevState)=>({
  ...prevState,
  type: e.target.value
}))} />

<TextField id='pack_quantity' label="pack_quantity" value={products?.pack_quantity} onChange={(e)=>setProducts((prevState)=>({
  ...prevState,
  pack_quantity: e.target.value
}))} />
<TextField id='dosage' label="dosage" value={products?.dosage} onChange={(e)=>setProducts((prevState)=>({
  ...prevState,
  dosage: e.target.value
}))} />
 <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
        />
<FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">UnderCategory</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        value={products?.undercategory_id}
        id="demo-simple-select"
        label="UnderCategory"
        onChange={(e)=>setProducts((prevState)=>({
          ...prevState,
          undercategory_id: e.target.value
  }))} >
          {undercategories.map((undercategory)=>(
            <MenuItem value={undercategory.id} key={undercategory.id}>
              {undercategory.name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>     
<Button variant="outlined" onClick={submitUpdateProducts(id)}> Update</Button>  
<Typography component="p" color='red'>
  {err ? err : null}
</Typography>
<Button onClick={()=>navigate('/products')}>Back</Button>
      </Box> : <></>
      }
    </div>
  )
}