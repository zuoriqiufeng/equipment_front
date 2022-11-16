import request from '@/utils/request'

const api_name = 'admin/user'
export default {

    // 用户登录
    login(loginForm) {
        return request ({
            url: `${api_name}/login`,
            method: 'post',
            data: loginForm
        })
    },
    // 获取用户列表
    getUserList(page, limit, queryInfo) {
        return request({
            url:`${api_name}/${page}/${limit}`,
            method:'get',
            params: queryInfo
        })
    },
    // 锁定用户
    lock(id, status) {
        return request({
            url:`${api_name}/lockUser/${id}/${status}`,
            method:'get',
        })
    },
    // 删除用户
    removeUserById(id) {
        return request({
            url:`${api_name}/delete/${id}`,
            method:'get',
        })
    },
    // 更新用户信息
    updateUserInfo(formData) {
        return request ({
            url: `${api_name}/updateInfo`,
            method: 'post',
            data: formData
        })
    },
    getLoginParam() {
        return request({
            url: `${api_name}/weixin/getLoginParam`,
            method: 'get',
        })
    }

}