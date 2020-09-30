import request from '@/utils/request'

export default{
    getVideoPlayAuth(videoSourceId) {
        return request({
            url: `/eduVod/aliyunVod/getVideoPlayAuth/${videoSourceId}`,
            method: 'get'
        })
    }
}