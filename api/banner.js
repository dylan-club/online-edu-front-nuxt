import request from '@/utils/request'

export default{
    getList() {
        return request({
            url: `/serviceCms/bannerFront/findAllBanner`,
            method: 'get'
        })
    }
}