import axios from "axios";
import {Message} from "element-ui";

axios.interceptors.response.use(success => {
    let status = success.status;
    if (status && status === 200 && success.data.status === 500) {
        Message.error({message: success.data.msg})
        return;
    }
    if(success.data.msg) {
        Message.success({message: success.data.msg})
    }
    return success.data;
}, error => {
    let status = error.response.status;
    if (status === 504 || status === 404) {
        Message.error({message: "服务器被吃了!"})
    } else if (status === 403) {
        Message.error({message: "权限不足!"})
    } else if (status === 401) {
        Message.error({message: "尚未登陆!"})
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: "未知错误!"})
        }
    }
    return;
})

let base = "";

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [
            function(data) {
                let ret = '';
                for (const i in data) {
                    ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                }
                return ret;
            }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}


export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}



