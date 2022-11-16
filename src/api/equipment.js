import request from '@/utils/request'

const api_name = `admin/equip`
export default {
    // 获取设备列表
    getEquipmentList(page, limit, queryInfo) {
        return request ({
            url: `${api_name}/list/${page}/${limit}`,
            method: 'get',
            params: queryInfo
        })
    },
    // 根据id 删除设备
    removeByid(id) {
        return request ({
            url :`${api_name}/${id}`,
            method: 'delete'
        })
    },
    // 更新设备信息
    updateEquipInfo(equipment) {
        return request({
            url:`${api_name}/update/`,
            method: `post`,
            data: equipment
        })
    },
    // 添加设备
    addEquipment(equipment) {
        return request({
            url:`${api_name}/save`,
            method:`post`,
            data:equipment
        })
    },
 

}