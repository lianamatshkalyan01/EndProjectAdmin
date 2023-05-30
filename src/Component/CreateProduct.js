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
  const[composition, setComposition]=useState('')
  const[side_effect, setSide_effect]=useState('')
  const[instruction, setInstruction]=useState('')
  const[storage_condition, setStorage_condition]=useState('')
  const[image, setImage]=useState(null)
  const[undercategory_id, setUnderCategoryId]=useState("")
  const[undercategories, setUnderCategories] = useState([])
  const[err, setErr]=useState("")
                   

  async function submitCreateProduct(e){
    e.preventDefault()
    const token = localStorage.getItem('token')
    // if(name.trim() === "" || price.trim() === "" || type.trim() === "" || pack_quantity.trim() === "" || dosage.trim() === "" || composition.trim() === "" || side_effect.trim() === "" || instruction.trim() === "" || storage_condition.trim() === "" || image.trim() === "" || undercategory_id === ""){
    //   setErr("Fill all fields")
    //   return
    // }
    try{
      const response = await fetch('http://localhost:5000/prod/new', {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          type,
          pack_quantity,
          dosage,
          composition,
          side_effect,
          instruction,
          storage_condition,
          image,
          undercategory_id
        }),
        headers:{
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":token
      }
      })
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
    setComposition('')
    setSide_effect('')
    setInstruction('')
    setStorage_condition('')
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
        <TextField id='name' required label="Name" onChange={(e)=>setName(e.target.value)}></TextField>
        <TextField id='price' required label="Price" onChange={(e)=>setPrice(e.target.value)}></TextField>
        <TextField id='type ' required label="Type" onChange={(e)=>setType(e.target.value)}></TextField>
        <TextField id='pack_quantity' required label="Pack_quantity" onChange={(e)=>setPack_quantity(e.target.value)}></TextField>
        <TextField id='dosage' required label="Dosage" onChange={(e)=>setDosage(e.target.value)}></TextField>
        <TextField id='composition' required label="Composition" onChange={(e)=>setComposition(e.target.value)}></TextField>
        <TextField id='side_effect' required label="Side_effect" onChange={(e)=>setSide_effect(e.target.value)}></TextField>
        <TextField id='instruction' required label="Instruction" onChange={(e)=>setInstruction(e.target.value)}></TextField>
        <TextField id='storage_condition' required label="Storage_condition" onChange={(e)=>setStorage_condition(e.target.value)}></TextField>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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