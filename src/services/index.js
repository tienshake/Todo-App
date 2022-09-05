import axiosClient from '../axios';

// const sendApi = (method, url, data, token) => {
//     return method(url, data ? data : '', {
//         headers: { Authorization: `Bearer ${token}` },
//     });
// };

const getAllItem = (token) => {
    return axiosClient.get('/api/todos/get-todos', { headers: { Authorization: `Bearer ${token}` } });
};

const createItem = (data, token) => {
    return axiosClient.post('/api/todos/create-todo', data, { headers: { Authorization: `Bearer ${token}` } });
};

const deleteItem = (id, token) => {
    return axiosClient.delete(`api/todos/delete-todo/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

const loginUser = (userLogin) => {
    return axiosClient.post('/api/user/Login', userLogin);
};

const editItem = (data, token) => {
    return axiosClient.put('/api/todos/update-todo', data, { headers: { Authorization: `Bearer ${token}` } });
};

const registerUser = (userRegister) => {
    return axiosClient.post('/api/user/Register', userRegister);
};

const getUser = (token) => {
    return axiosClient.get('/api/profile/get-user', { headers: { Authorization: `Bearer ${token}` } });
};

const editUser = (data, token) => {
    return axiosClient.put('/api/profile/update-user', data, { headers: { Authorization: `Bearer ${token}` } });
};

export { getAllItem, createItem, loginUser, deleteItem, editItem, registerUser, getUser, editUser };
