import React from 'react'
import { Navigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";

const ProtectedRoute = ({children})=>{
    const token =localStorage.getItem('token')
    const decodedToken = decodeToken(token);
    if(!token || decodedToken?.role === 'user'){
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoute