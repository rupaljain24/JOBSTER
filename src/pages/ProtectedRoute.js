//when we click on logout button the user shoulds navigate to the landing page
// & doesnot have access to the dashboard urls 

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user}=useSelector((store)=>store.user)
    if(!user){
        return <Navigate to='/landing'/>
    }
  return children;
  
}

export default ProtectedRoute