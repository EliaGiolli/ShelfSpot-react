import { 
    createBrowserRouter, 
    Navigate, 
    redirect 
} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Homepage from '../pages/Homepage';
import SearchBook from '../pages/SearchBookDiv';
import Contacts from '../pages/Contacts';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';
import { userRole } from '../types/userDataTypes';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to='login' replace/> },
            {
                path: 'login',
                element: <Login />,
                loader: async () => {
                    const isLoggedIn = localStorage.getItem('token'); // Check auth token
                    if (isLoggedIn) {
                        return redirect('/'); // Redirect to home if authenticated
                    }
                    return null; // Allow login page to render
                }
            },
            {
                path: 'register',
                element: <Register />,
                loader: async () => {
                    const isRegistered = localStorage.getItem('token');
                    if (isRegistered) {
                        return redirect('/');
                    }
                    return null;
                }
            },
            {
                path: '/logout',
                loader: async () => {
                    localStorage.removeItem('token');
                    return redirect('/login');
                }
            }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'home',
                element: <Homepage />,
                index: true
            },
            {
                path: 'books',
                element: <PrivateRoute requiredRole={userRole.Member} />,
                children: [
                    {
                        index: true,
                        element: <SearchBook />
                    },
                    {
                        path: 'contacts',
                        element: <Contacts />
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])