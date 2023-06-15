import React from 'react'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

const theme = createTheme();
export default function Login() {
    const[email, setEmail]=useState('')
    const[password, setPassword]=useState("")
    const[emailError, setEmailError] = useState('')
    const[passwordError, setPasswordError] = useState('')
    const navigate=useNavigate()
    
  async function handleSubmitLogin(e){
        e.preventDefault()
        if(email.length === 0){
          setEmailError("Email is required")
          return
        }
        else if(!email ){
          setEmailError("Email doesn't match")
          return
        }
        else if(password.length === 0 ){
          setPasswordError("Password is required")
          return
        }
        try{
            const response= await fetch("http://localhost:5000/user/login",{
                method:"POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers:{
                    "Content-type":"application/json; charset=UTF-8"
                }
            })
            const data = await response.json()
            console.log(data, "data")
            localStorage.setItem('token', data.jwt);
            const token = localStorage.getItem('token')
           const decodedToken = decodeToken(token);
            if (decodedToken.role === 'admin') {
              navigate('/admin');
            }
        } catch(err){
            console.log(err)
        }
        setEmail('')
        setPassword("")
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
   <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          </Box>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{ mt: 1}}>
        <TextField
         margin="normal"
         required
         fullWidth
         id="email"
         label="Email Address"
         name="email"
         autoComplete="email"
         autoFocus
         onChange={(e)=>setEmail(e.target.value)}
         />
         {emailError && (
          <Typography variant="body2" color="error" sx={{ mt: -1, mb: 1 }}>
            {emailError}
          </Typography>
        )}
        <TextField
         margin="normal"
         required
         fullWidth
         id="password"
         label="password"
         name="password"
         type="password"
         autoComplete="current-password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        />
        {passwordError && (
              <Typography variant="body2" color="error" sx={{ mt: -1, mb: 1 }}>
                {passwordError} 
              </Typography>
            )}
    <Stack spacing={2} direction="row">
      <Button 
      variant="contained"
      type="submit"
      fullWidth
      sx={{ mt: 3, mb: 2 }}>
        Sign In
        </Button>
    </Stack>
    </Box>
    <Grid container >
        <Grid item xs>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
        </Grid>
        <Grid item xs={-1}>
        <Link href="#" variant="body2" onClick={()=>navigate('/register')}>
        Don't have an account? Sign Up
        </Link>
        </Grid>
        </Grid>
    </Container>
    </ThemeProvider>
  )
}