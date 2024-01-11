import { Navigate, Outlet } from 'react-router-dom';
import { isLogged } from '../services/auth';

const Guard = () => {
    if (!isLogged()) {
        return <Outlet />;
    } else {
        return <Navigate to="/profile" />;
    }
};

export default Guard;
