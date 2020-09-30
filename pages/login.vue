<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="phoneNumber" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.phoneNumber"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8150/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from '@/api/login'

  export default {
    layout: 'sign',

    data () {
      return {
        user:{
          phoneNumber:'',
          password:''
        },
        loginInfo:{}
      }
    },

    methods: {
      submitLogin(){
        this.$refs['userForm'].validate((valid) => {
          //输入验证成功，发送登录请求
          if(valid){
            loginApi.login(this.user)
              .then(response => {
                //登录成功
                if(response.data.success) {
                  //将token存在cookie中
                  cookie.set('user_token', response.data.data.token, { domain: 'localhost' })

                  //根据token获取用户信息
                  loginApi.getLoginInfo()
                    .then(response => {
                      this.loginInfo = response.data.data.item

                      //将用户信息存入cookie
                      cookie.set('user_info', this.loginInfo, { domain: 'localhost' })

                      //跳转到首页
                      this.$router.push({path: '/'})
                      //不能使用window.location.href跳转，会导致nuxt重复渲染
                    })
                }
              })
          }
        })
      },

      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>