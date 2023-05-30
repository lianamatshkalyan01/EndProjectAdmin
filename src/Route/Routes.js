import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Category from '../Component/Category'
import CreateCategory from '../Component/CreateCategory'
import DeleteCategory from '../Component/DeleteCategory'
import EditCategory from '../Component/EditCategory'
import UnderCategory from '../Component/UnderCategory'
import CreateUnderCategory from '../Component/CreateUnderCategory'
import EditUnderCategory from '../Component/EditUnderCategory'
import DeleteUnderCategory from '../Component/DeleteUnderCategory'
import Product from '../Component/Products'
import DeleteProduct from '../Component/DeleteProduct'
import CreateProduct from '../Component/CreateProduct'
import EditProduct from '../Component/EditProduct'
import Admin from '../Pages/AdminPage'
import Layout from '../Layouts/Layouts'
import ProtectedRoute from './ProtectedRoute'
import { decodeToken } from "react-jwt";

export default function AppRoutes(){
    const token =localStorage.getItem('token')
    const decodedToken = decodeToken(token);
    return(
        <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route element={<Layout/>}> 
            <Route path='/categories' element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path='/createcategory' element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
            <Route path="/deletecategory/:id" element={<ProtectedRoute><DeleteCategory /></ProtectedRoute>} />
            <Route path="/updatecategory/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
            <Route path='/undercategories' element={<ProtectedRoute><UnderCategory /></ProtectedRoute>} />
            <Route path='/createundercategories' element={<ProtectedRoute><CreateUnderCategory /></ProtectedRoute>} />
            <Route path='/updateundercategory/:id' element={<ProtectedRoute><EditUnderCategory /></ProtectedRoute>} />
            <Route path="/deleteundercategory/:id" element={<ProtectedRoute><DeleteUnderCategory /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path="/deleteproduct/:id" element={<ProtectedRoute><DeleteProduct /></ProtectedRoute>} />
            <Route path='/createproduct' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
            <Route path="/updateproduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            </Route>
        </Routes>
        </div>
    )
}
