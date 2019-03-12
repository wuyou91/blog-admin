<template>
  <div class="login">
    <div class="login-box">
      <h2>后台管理系统</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-loginForm">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <div class="add-info">
          <el-checkbox class="remember">记住密码</el-checkbox>
        </div>
        <div class="login-btn">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </div>
      </el-form>
    </div>
    <p>© 2019 yancx.cn</p>
    <vue-particles
      color="#dedede"
      :particlesNumber="15"
      :particleSize="20"
      :lineOpacity="0"
      :moveSpeed="2"
      hoverMode="repulse"
      class="particles">
    </vue-particles>
  </div>
</template>

<script>
import http from '@/http'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await http.login({
            name: this.loginForm.username,
            password: this.loginForm.password
          })
          if(res.data.status == 1){
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.message)
          }
        } else {
          this.$notify.console.error({
            title: '错误',
            message: '请输入正确的用户名和密码',
            offset: 100
          });
          return false
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/common/variable.scss";
.login{
  position: relative;
  background: url(../assets/login_bg.jpg) center no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  color: $black;
  .particles{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &>p{
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: $light;
    font-size: 14px;
  }
}
.login-box{
  position: absolute;
  top: 45%;
  left:50%;
  width: 400px;
  height: 350px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px 20px;
  margin-top: -175px;
  margin-left: -200px;
  color: #fff;
  background-color: rgba(255,255,255,.3);
  z-index: 1;
  h2{
    text-align: center;
  }
  .add-info{
    display: flex;
    justify-content:space-between;
    margin-bottom: 30px;
    font-size: 14px;
    line-height: 20px;
    .remember{
      color: #fff;
    }
  }
}
.login-btn{
  button{
    width: 100%;
  }
}
</style>
