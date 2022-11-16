import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8104',
    timeout: 15000 // 请求超时时间
})
// http request 拦截器
service.interceptors.request.use(
    config => {
        // token 先不处理，后续使用时在完善
        // 判断cookie中有没有cookie值
        if (cookie.get('token')) {
            // token的值放到headers里面中去
            config.headers['token'] = cookie.get('token')
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
service.interceptors.response.use(
    response => {
        // 状态码是208就弹出登录框
        if (response.data.code === 208) {
            loginEvent.$emit('loginDialogEvent')
            return
        } else {
            if (response.data.code !== 200) {
                Message({
                    message: response.data.message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(response.data)
            } else {
                return response.data
            }
        }
    },
    error => {
        return Promise.reject(error.response)
    })
export default service
