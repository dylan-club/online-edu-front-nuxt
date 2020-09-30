import request from '@/utils/request'

export default{

    //组合查询课程带分页
    getPageQueryCourseList(current, limit, courseQuery) {
        return request({
            url: `/serviceEdu/courseFront/getPageQueryCourseList/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },

    //查询课程分类
    findAllSubject() {
        return request({
            url: `/serviceEdu/subject/findAllSubject`,
            method: 'get',
        })
    },
    
    //查询课程详情
    getCourseInfo(courseId) {
        return request({
            url: `/serviceEdu/courseFront/getCourseInfo/${courseId}`,
            method: 'get',
        })
    }
}