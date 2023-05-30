import { Box, Button, TextField, Typography  } from '@mui/material'
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditUnderCategory() {
  const[undercategories,setUnderCategories]=useState({})
  const[err, setErr]=useState('')
  const navigate = useNavigate()
  const {id} = useParams()

  const submitUpdateUnderCategories = (id) => async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(undercategories.name.trim() === ""){
      setErr("Fill all fields")
      return
    }
    try{
      const response = await fetch(`http://localhost:5000/under/update/${id}`, {
        method:"PUT",
        body: JSON.stringify({
          name: undercategories.name
        }),
        headers:{
          "Content-type": "application/json; charset=UTF-8", 
          "Authorization":token
        }
      })
      if(!response.ok){
        setErr("Not Found")
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetch(`http://localhost:5000/cat/${id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUnderCategories(data)})
  },[])
  
  return (
    <div>
      {
        undercategories?.name !== undefined ?
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
        <TextField id='name' label="Name" variant="outlined" value={undercategories?.name} onChange={(e)=>setUnderCategories((prevState)=>({
          ...prevState,
          name: e.target.value
        }))}/>
        <Button variant="outlined" onClick={submitUpdateUnderCategories(id)}>Update</Button>
        <Typography component="p" color="red">
        {err ? err : null}
        </Typography>
        <Button onClick={()=>navigate('/undercategories')}>Back</Button>
      </Box> : <></>
      }
    </div>
  )
}

