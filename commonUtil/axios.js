import axios from "axios"
import {
    encryption
} from "./aes.js"
import storageUtil from "./storageUtil.js"
import {
    tokenExpired
} from "./util.js"
export default function ajax(url = '', data = {}, type = 'GET') {
    // 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
    return new Promise(function (resolve, reject) {
        // （利用axios）异步执行ajax请求
        let promise // 这个内部的promise用来保存axios的返回值(promise对象)
        if (type === 'GET') {
            // 准备 url query 参数数据
            let dataStr = '' // 数据拼接字符串，将data连接到url
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + encryption(data[key]) + '&'
            })
            if (dataStr !== '') {
                //dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送 get 请求
            promise = axios.get(url, {
                headers: {
                    'Auth-header-token': token
                }
            })
        } else {
            // 发送 post 请求
            let param = {};
            if (!data) {
                data = {};
            }
            let token = storageUtil.getItem("token");
            //data.token = token;
            param.encode = encryption(data);
            promise = axios.post(url, param, {
                headers: {
                    'Auth-header-token': token
                }
            })
        }
        promise.then(response => {
            tokenExpired(url, response.data);
            // 成功回调resolve()
            resolve(response.data)

        }).catch(error => {
            // 失败回调reject()
            reject(error)
        })

    })
}