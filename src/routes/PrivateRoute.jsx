import React from 'react';
import useAuth from '../assets/hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user,loading } = useAuth();
    const location = useLocation();
    
    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }

    if(user){
        return children;
    }

    return <Navigate  to='/login' state={{from : location}} replace ></Navigate>
   
};

export default PrivateRoute;