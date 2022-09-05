import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://todosample.azurewebsites.net';

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export default axiosClient;
