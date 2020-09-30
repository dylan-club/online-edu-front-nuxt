import request from '@/utils/request'

export default {

    //用户登录
    login(loginForm) {
        return request({
            url: `/serviceUCenter/member/login`,
            method: 'post',
            data: loginForm
        })
    },

    //根据token值获取用户信息
    getLoginInfo() {
        return request({
            url: '/serviceUCenter/member/auth/getLoginInfo',
            method: 'get'
        })
    }    
}