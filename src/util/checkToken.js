import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const checkTokenExpirationMiddleware = () => {
    const getCookies = Cookies.get('user') ? Cookies.get('user') : null;
    if (getCookies) {
        const date = jwtDecode(JSON.parse(getCookies).accessToken);
        if (date.exp < Date.now() / 1000) {
            Cookies.remove('user');
        }
    }
};
