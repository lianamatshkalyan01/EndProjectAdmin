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

export default function AppRoutes(){
    return(
        <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/categories' element={<Category />} />
            <Route path='/createcategory' element={<CreateCategory />} />
            <Route path="/deletecategory/:id" element={<DeleteCategory />} />
            <Route path="/updatecategory/:id" element={<EditCategory />} />
            <Route path='/undercategories' element={<UnderCategory />} />
            <Route path='/createundercategories' element={<CreateUnderCategory />} />
            <Route path='/updateundercategory/:id' element={<EditUnderCategory />} />
            <Route path="/deleteundercategory/:id" element={<DeleteUnderCategory />} />
            <Route path="/products" element={<Product />} />
            <Route path="/deleteproduct/:id" element={<DeleteProduct />} />
            <Route path='/createproduct' element={<CreateProduct />} />
            <Route path="/updateproduct/:id" element={<EditProduct />} />
        </Routes>
        </div>
    )
}
