import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const isLogged = () => {
    const token = Cookies.get('JWT');

    if (token === 'loggedout') return false;

    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (!decodedToken) return false;

    const now = Date.now() / 1000;
    if (decodedToken.exp < now) {
        return false;
    } else {
        return true;
    }
};

export const tokenData = () => {
    const token = Cookies.get('JWT');

    if (token === 'loggedout') return false;

    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (!decodedToken) return false;

    const now = Date.now() / 1000;
    if (decodedToken.exp < now) {
        return false;
    } else {
        return decodedToken;
    }
};
