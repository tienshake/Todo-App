import { loginFailed, loginStart, loginSuccess } from './authSlice';
import { getTodoStart, getTodoSuccess, getTodoFailed } from './todoSlice';
import { getUser, loginUser, getAllItem } from '../services';
import { checkRes } from '../util/checkRes';
import Cookies from 'js-cookie';
import { CONSTANTS } from '../constant';

const loginUserAction = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await loginUser(user);
        if (checkRes(res, CONSTANTS.STATUS202)) {
            const resUser = await getUser(res.data.token);
            if (checkRes(resUser, CONSTANTS.STATUS200)) {
                const sendData = { ...resUser.data.result[0], accessToken: res.data.token };
                dispatch(loginSuccess(sendData));
                navigate('/');
                Cookies.set('user', JSON.stringify(sendData));
            }
        }
    } catch (error) {
        dispatch(loginFailed());
    }
};

const getTodoAction = async (token, dispatch) => {
    dispatch(getTodoStart());
    try {
        const res = await getAllItem(token);
        if (checkRes(res, CONSTANTS.STATUS200)) {
            dispatch(getTodoSuccess(res.data.result));
        }
    } catch (error) {
        dispatch(getTodoFailed());
    }
};

export { loginUserAction, getTodoAction };
