import { Box, TextField, Button, Typography } from '@mui/material'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateCategory() {
  const [name, setName]=useState('')
  const[err, setErr] = useState('')
  const [image, setImage] = useState(null)
  const navigate=useNavigate()
  async function submitCreateCategory(e){
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(name.trim() === ""){
      setErr("Fill all fields")
      return
    }
    try{
      const response = await fetch('http://localhost:5000/cat/new', {
        method: "POST",
        body: JSON.stringify({
          name
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
        <TextField id='name' required label="Name" onChange={(e)=>setName(e.target.value)}>Name</TextField>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button variant="outlined" onClick={submitCreateCategory} >Create</Button>
        <Typography component="p" color="red">
          {err ? err : null}
        </Typography>
        <Button onClick={()=>navigate('/categories')}>Back</Button>
      </Box>
    </div>
  )
}