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
import SearchBook from '../pages/SearchBook';
import Contacts from '../pages/Contacts';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';
import { userRole } from '../types/userDataTypes';
import { store } from '../store/store';

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
                    const state = store.getState();
                    if (state.auth.userInfo) {
                        return redirect('/home');
                    }
                    return null;
                }
            },
            {
                path: 'register',
                element: <Register />,
                loader: async () => {
                    const state = store.getState();
                    if (state.auth.userInfo) {
                        return redirect('/home');
                    }
                    return null;
                }
            },
            {
                path: '/logout',
                loader: async () => {
                    store.dispatch({ type: 'auth/logout' });
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
                //element: <PrivateRoute requiredRole={userRole.Member} />,
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