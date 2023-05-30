import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();


export default function Register() {
    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    const[emailError, setEmailError] = useState('')
    const[passwordError, setPasswordError] = useState('')
    const navigate=useNavigate()

    async function handleSubmitRegister(e){
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if(!email || email === null){
          setEmailError("Email is required")
          return
        }
        else if(!email.includes('@')){
          setEmailError("Email is missing '@' symbol")
          return
        }
        else if(!emailRegex.test(email)){
          setEmailError("invalid email")
          return
        }
        else if(!password || password === null){
          setPasswordError("Password is required")
          return
        }
        try{
            const response= await fetch("http://localhost:5000/register", {
                method:"POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers:{
                    "Content-type":"application/json; charset=UTF-8"
                }
            })
            const data= await response.json()
            console.log(data, 'data')
            navigate('/login')
        }catch(err){
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
          </Box>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmitRegister} noValidate sx={{ mt: 1}}>
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
         autoComplete="password"
         autoFocus
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
        Sign Up
        </Button>
    </Stack>
    </Box>
    <Grid container >
        <Grid item xs>
        <Link href="#" variant="body2" onClick={()=>navigate("/")}>
        Already have an account? Sign in
        </Link>
        </Grid>
        </Grid>
    </Container>
    </ThemeProvider>
  )
}
