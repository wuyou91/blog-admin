<template>
  <div class="login">
    <form class="login-box">
      <div class="input-box">
        <label for="user-name">账号</label>
        <input type="text" id="user-name">
      </div>
      <div class="input-box">
        <label for="password">密码</label>
        <input type="password" id="password">
      </div>
      <input class="submit" type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

<style lang="scss" scoped>
@import "@/assets/common/variable.scss";
  .login{
    position: relative;
    background: $black;
    width: 100%;
    height: 100vh;
    color: $black;
  }
  .login-box{
    position: absolute;
    box-sizing: border-box;
    padding: 30px 50px;
    width: 400px;
    height: 250px;
    top: 45%;
    left: 50%;
    margin-top:-125px; 
    margin-left: -200px;
    background: rgba($color: #fff, $alpha: 0.85);
    border-radius: 8px;
    .input-box{
      width: 100%;
      height: 24px;
      display: flex;
      margin-bottom: 20px;
      label{
        width: 50px;
        flex-grow: 0;
      }
      input{
        border: none;
        border-bottom: 1px solid $light;
        flex-grow: 1;
        transition: all .6s ease;
        font-size: 16px;
        padding: 5px;
        color: $deep;
        &:focus{
          outline: none;
          border-color:$blue; 
        }
      }
    }
    .submit{
      width: 100%;
      height: 40px;
      margin-top: 30px;
      background: $blue;
      color: #fff;
    }
  }
</style>

