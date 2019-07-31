import axios from 'axios';
import { message } from 'antd';

const server = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api',
    timeout: 10000
})

server.interceptors.request.use(
    (config) => {
        return config;
    },
    error => {
        message.info(error);
        return Promise.reject(error);
    }
)

server.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        message.info(error);
        return Promise.reject(error);
    }
)

export default server;