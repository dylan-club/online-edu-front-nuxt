import request from '@/utils/request'

export default{
    //创建订单
    createOrder(courseId) {
        return request({
            url: `/serviceOrder/order/createOrder/${courseId}`,
            method: 'get'
        })
    },

    //查询订单
    findOrder(orderNo) {
        return request({
            url: `/serviceOrder/order/findOrder/${orderNo}`,
            method: 'get'
        })
    },

    //生成微信支付二维码
    createNative(orderNo) {
        return request({
            url: `/serviceOrder/payLog/createNative/${orderNo}`,
            method: 'get'
        })
    },

    //查询支付状态
    queryPayStatus(orderNo) {
        return request({
            url: `/serviceOrder/payLog/queryPayStatus/${orderNo}`,
            method: 'get'
        })
    }
}