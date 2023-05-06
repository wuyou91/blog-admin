<template>
  <div class="login">
    <div class="login-box">
      <h2>注册新用户</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="0px"
        class="demo-loginForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="loginForm.passwordRepeat"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')"
            >注册</el-button
          >
        </div>
        <div class="login-btn">
          <el-button @click="$router.replace('/')">返回</el-button>
        </div>
      </el-form>
    </div>
    <p>© {{ year }} yancx.cn</p>
  </div>
</template>

<script>
import http from "@/http";
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      loginForm: {
        name: "",
        password: "",
        passwordRepeat: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.loginForm.password === this.loginForm.passwordRepeat) {
            this.login(this.loginForm);
          } else {
            this.$notify.error({
              title: "错误",
              message: "两次输入的密码不一致",
              offset: 100,
            });
            return false;
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名和密码",
            offset: 100,
          });
          return false;
        }
      });
    },
    async login(userData) {
      const res = await http.register(userData);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.$router.push("/");
      } else {
        this.$message.error(res.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/common/variable.scss";
.login {
  position: relative;
  background: url("http://blog.cdn.yancx.cn/image/login_bg.jpg") center
    no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  color: $black;
  & > p {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: $light;
    font-size: 14px;
  }
}
.login-box {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 400px;
  height: 390px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px 20px;
  margin-top: -175px;
  margin-left: -200px;
  color: #3a3a3a;
  background-color: #fff;
  z-index: 1;
  h2 {
    text-align: center;
  }
  .add-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 14px;
    line-height: 20px;
    .remember {
      color: #fff;
    }
  }
}
.login-btn {
  margin-bottom: 10px;
  button {
    width: 100%;
  }
}
</style>
