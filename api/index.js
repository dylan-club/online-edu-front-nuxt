import request from '@/utils/request'

export default{
    getList() {
        return request({
            url: `/serviceEdu/indexFront/index`,
            method: 'get'
        })
    }
}