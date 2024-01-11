import { Navigate, Outlet } from 'react-router-dom';
import { isLogged } from '../services/auth';

const AuthGuard = () => {
    if (!isLogged()) {
        return <Outlet />;
    } else {
        return <Navigate to="/profile" />;
    }
};

export default AuthGuard;
