import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router"

import { PrivateRouteProps } from "../types/userDataTypes"

function PrivateRoute({ requiredRole }: PrivateRouteProps) {
    // Get user info from Redux store
    const { userInfo } = useSelector((state: RootState) => state.auth);
    
    // If no user info, redirect to login
    if (!userInfo) {
        return <Navigate to="/login" />;
    }
    
    // If role is required and user doesn't have it, redirect to home
    if (requiredRole && userInfo?.role?.toLowerCase() !== requiredRole.toLowerCase()) {
        return <Navigate to="/home" />;
    }
    
    // If all checks pass, render the protected content
    return <Outlet />;
}

export default PrivateRoute