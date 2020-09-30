<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="/course">全部</a>
                </li>
                <li v-for="(firstSubject, index) in subjectNestedList" :key="index" :class="{active: oneIndex==index}">
                  <a :title="firstSubject.title" href="javascript:void(0);" @click.prevent="searchOne(firstSubject.id, index)">{{firstSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(secondSubject, index) in subSubjectList" :key="index" :class="{active: twoIndex==index}">
                  <a :title="secondSubject.title" href="javascript:void(0);" @click="searchTwo(secondSubject.id, index)">{{secondSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">{{!data.current ? 0 : data.current}}</i>/
              <i class="c-666 f-fM">{{!data.pages ? 0 : data.pages}}</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="关注度" href="javascript:void(0);" @click="searchBuyCountSort()">关注度
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreateSort()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPriceSort()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-else>
            <ul class="of" id="bna">
              <li v-for="course in data.items" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-green" v-else>
                      <i class="c-fff fsize12 f-fA">￥{{course.price}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">{{course.viewCount}}人浏览</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1 > data.pages ? data.pages : data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'
export default {
  data() {
    return {
      page:1,
      data:[],  //课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  
  created () {
    //初始化数据
    this.initCourse()
    this.initSubject()
  },

  methods: {
    //初始化课程列表
    initCourse(){
      courseApi.getPageQueryCourseList(1,8,this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },

    //初始化一级分类
    initSubject(){
      courseApi.findAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.items
        })
    },

    //查询课程
    gotoPage(page){
      courseApi.getPageQueryCourseList(page,8,this.searchObj)
      .then(response => {
        this.data = response.data.data
      })
    },

    //根据一级分类进行查询
    searchOne(id, index){
      this.oneIndex = index
      this.twoIndex = -1 //重置二级分类选中状态
      
      this.searchObj.subjectId = ''
      this.subSubjectList = [];

      this.searchObj.subjectParentId = id
      this.gotoPage(1) //查询数据
      
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if(this.subjectNestedList[i].id === id){
          this.subSubjectList = this.subjectNestedList[i].children
        }
      }
    },

    //根据二级分类进行查询
    searchTwo(id, index){
      this.twoIndex = index //二级分类为选中状态
      this.searchObj.subjectId = id
      this.gotoPage(1) //查询数据
    },

    //根据关注度进行排序
    searchBuyCountSort() {
      this.buyCountSort = '1'
      this.gmtCreateSort = ''
      this.priceSort = ''

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort

      //查询数据
      this.gotoPage(this.page)
    },

    //根据时间进行排序
    searchGmtCreateSort() {
      this.buyCountSort = ''
      this.gmtCreateSort = '1'
      this.priceSort = ''

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort

      //查询数据
      this.gotoPage(this.page)
    },

    //根据价格进行排序
    searchPriceSort() {
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = '1'

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = this.priceSort

      //查询数据
      this.gotoPage(this.page)
    }
  }
};
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>