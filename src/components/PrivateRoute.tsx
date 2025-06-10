import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router"

import { PrivateRouteProps } from "../types/userDataTypes"

function PrivateRoute({ requiredRole }: PrivateRouteProps) {
    
    // Get user info from Redux store
    const { userToken, userInfo } = useSelector((state: RootState) => state.auth);
    
    // If no token, redirect to login
    if (!userToken) {
        return <Navigate to="/login" />;
    }
    
    // If role is required and user doesn't have it, redirect to home
    if (requiredRole && userInfo?.role !== requiredRole) {
        return <Navigate to="/home" />;
    }
    
    // If all checks pass, render the protected content
    return <Outlet />;
}

export default PrivateRoute