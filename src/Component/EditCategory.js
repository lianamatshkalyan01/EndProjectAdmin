import { Box, Button, TextField, Typography  } from '@mui/material'
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditCategory() {
  const[categories,setCategories]=useState({})
  const[err, setErr]=useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()
  const submitUpdateCategories = (id) => async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(categories.name.trim() === ""){
      setErr("Fill all fields")
      return
    }
    try{
      const response = await fetch(`http://localhost:5000/cat/update/${id}`, {
        method:"PUT",
        body: JSON.stringify({
          name: categories.name
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
      setCategories(data)})
  },[])
  
  return (
    <div>
      {
        categories.name !== undefined ?
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
        <TextField id='name' label="Name" variant="outlined" value={categories?.name} onChange={(e)=>setCategories((prevState)=>({
          ...prevState,
          name: e.target.value
        }))}/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button variant="outlined" onClick={submitUpdateCategories(id)}>Update</Button>
        <Typography component="p" color="red">
        {err ? err : null}
        </Typography>
        <Button onClick={()=>navigate('/categories')}>Back</Button>
      </Box> : <></>
      }
    </div>
  )
}