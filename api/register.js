import request from '@/utils/request'

export default{
    sendMessage(phoneNumber) {
        return request({
            url: `/edumsm/servicemsm/sendMessage/${phoneNumber}`,
            method: 'get'
        })
    },

    register(reigsterForm) {
        return request({
            url: `/serviceUCenter/member/register`,
            method: 'post',
            data: reigsterForm
        })
    }
}