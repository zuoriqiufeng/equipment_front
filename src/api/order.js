import request from '@/utils/request'

const api_name = `admin/princi`
export default {
    // 获取借用记录列表
    getOrderList(page, limit, queryInfo) {
        return request ({
            url: `${api_name}/list/${page}/${limit}`,
            method: 'get',
            param: queryInfo
        })
    },
    // 删除借用记录
    removeById(id) {
        return request ({
            url: `${api_name}/remove/${id}`,
            method:'delete'
        })
    }
}