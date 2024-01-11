import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Profile from './pages/profile/Profile';
import Task from './pages/task/Task';
import Tasks from './pages/tasks/Tasks';
import AuthGuard from './guards/Guard';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Tasks />,
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                    },
                    {
                        path: '/register',
                        element: <Register />,
                    },
                ],
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/task/:taskSlug',
                element: <Task />,
            },
            {
                path: '*',
                element: <Navigate to="/" />,
            },
        ],
    },
]);
