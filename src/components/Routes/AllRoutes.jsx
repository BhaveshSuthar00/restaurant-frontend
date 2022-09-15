import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from '../AdminPages/Auth'
import Main from '../AdminPages/Main'
import UserPage from '../AdminPages/UserPage'
import Checker from '../Checker/Checker'
import PageNotFound from '../Extra/PageNotFound'
import UnAuthorized from '../Extra/UnAuthorized'
import Login from '../Login/Login'
import SignupCard from '../Login/Signup'
import Navbar from '../Navbar/Navbar'
import Restaurant from '../restaurant/Restaurant'
import SingleRestro from '../singleRestaurant/SingleRestro'

const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Checker element={<Restaurant />} />}  />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignupCard />} />
                <Route path='restaurant' element={<Checker element={<Restaurant />} />} />
                <Route path='/restaurant/:id' element={<Checker element={<SingleRestro />} />} />
                <Route path='admin' element={<Auth element={<Main />} />} />
                <Route path='users' element={<Auth element={<UserPage />} />} />
                <Route path='unauthorized' element={ <UnAuthorized /> } />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default AllRoutes