<template>
  <div class="login">
    <div class="login-box">
      <h2>后台管理系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="add-info">
          <el-checkbox class="remember">记住密码</el-checkbox>
        </div>
        <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
    <p>© 2019 yancx.cn</p>
    <vue-particles color="#dedede" :particlesNumber="20" :particleSize="20" :lineOpacity="0" hoverMode="repulse" class="particles">
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('ms_username', this.ruleForm.username)
          this.$router.push('/home')
        } else {
          console.log('error submit!!')
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
  background: $black;
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
  background-color: rgba(255,255,255,.2);
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
