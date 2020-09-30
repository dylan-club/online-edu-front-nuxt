import request from '@/utils/request'

export default{
    getCommentList(courseId,current, limit) {
        return request({
            url: `/serviceEdu/comment/pageComment/${courseId}/${current}/${limit}`,
            method: 'get'
        })
    },

    addComment(comment) {
        return request({
            url: `/serviceEdu/comment/auth/addComment`,
            method: 'post',
            data: comment
        })
    }
}