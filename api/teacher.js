import request from '@/utils/request'

export default{
    getTeacherFrontList(page, limit) {
        return request({
            url: `/serviceEdu/teacherFront/getTeacherFrontList/${page}/${limit}`,
            method: 'get'
        })
    },

    getTeacherInfo(teacherId) {
        return request({
            url: `/serviceEdu/teacherFront/getTeacherInfo/${teacherId}`,
            method: 'get'
        })
    }
}