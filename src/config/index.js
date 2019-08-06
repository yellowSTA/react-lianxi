import axios from '../http/request';
import api from '../api/index';
import { message } from 'antd';

global.$request = function(config = {}) {
    config.url = api[config.url];
    if(config.url) {
        return axios(config)
    } else {
        message.info('api/index.js中没有这个健值',10)
        Promise.resolve({code: 500,msg:'没有找到相应的api'})
    }
}

global.$get = function(url, params = {}) {
    if(api[url]) {
        return axios.get(api[url],{params})
    } else {
        message.info(`api/index.js中没有${url}这个健值`,10)
        return Promise.resolve({code: 500,msg:'没有找到相应的api'})
    }
}

global.$post = function(url, data = {}) {
    if(api[url]) {
        return axios.post(api[url],data)
    } else {
        message.info(`api/index.js中没有${url}这个健值`,10)
        return Promise.resolve({code: 500,msg:'没有找到相应的api'})
    }
}

global.$delete = function(url, data = {}) {
    if(api[url]) {
        return axios.delete(api[url],{params: data})
    } else {
        message.info(`api/index.js中没有${url}这个健值`,10)
        return Promise.resolve({code: 500,msg:'没有找到相应的api'})
    }
}