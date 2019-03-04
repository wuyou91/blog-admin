<template>
  <div class="wrap">
    <el-container>
      <el-header>
        <div class="header-title"><i class="el-icon-menu"></i>后台管理中心</div>
        <div class="tool-list">
          <div class="full-screen" @click="handleFullScreen">
            <el-tooltip class="item" effect="dark" :content="fullscreen?'取消全屏':'全屏'" placement="bottom">
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>
          <div class="user-info">
            <router-link to="/home/userinfo"><img id="user-img" src="@/assets/common/user.jpg"></router-link>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a href="http://www.yancx.cn"><el-dropdown-item>关于作者</el-dropdown-item></a>
                <a href="https://github.com/wuyou91"><el-dropdown-item>查看github</el-dropdown-item></a>
                <el-dropdown-item divided command="signOut">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      fullscreen: false,
      userName: 'admin'
    }
  },
  methods: {
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/common/variable.scss";
  .el-header{
    background-color: $blue;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .header-title{
      font-size: 22px;
      font-weight: 600;
      i{
        margin-right: 10px;
      }
    }
  }
  .tool-list{
    display: flex;
    font-size: 32px;
    line-height: 60px;
    &>div{
      margin-right: 20px;
    }
    .full-screen{
      cursor: pointer;
      transform: rotate(45deg);
    }
    .user-info{
      overflow: hidden;
      #user-img{
        width: 40px;
        margin-top: 10px;
        display: block;
        margin-right: 5px;
        float: left;
        border-radius: 50%;
      }
      .el-dropdown{
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        top: -8px;
      }
    }
  }
  .el-aside{
    background-color: #423064;
    height: 100%;
  }
</style>

