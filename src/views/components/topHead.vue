<template>
  <div class="header">
    <div class="title" @click="changeCollapse">
      <div class="collapse-btn">
        <i class="el-icon-menu"></i>
      </div>
      <div class="text">后台管理中心</div>
    </div>
    <div class="info">
      <div class="full-screen" @click="handleFullScreen">
        <el-tooltip class="item" effect="dark" :content="fullscreen?'取消全屏':'全屏'" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="msg-num">
        <el-tooltip effect="dark" :content="msgnum?`有${msgnum}条未读消息`:`消息中心`" placement="bottom">
          <router-link to="/home/message">
              <i class="el-icon-bell"></i>
          </router-link>
        </el-tooltip>
        <span v-show="msgnum"></span></div>
      <div class="user-info">
        <router-link to="/home/userinfo"><img :src="adminInfo.avatar"></router-link>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{adminInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="http://www.yancx.cn"><el-dropdown-item>关于作者</el-dropdown-item></a>
            <a href="https://github.com/wuyou91"><el-dropdown-item>查看github</el-dropdown-item></a>
            <el-dropdown-item divided command="signOut">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      collapse: false,
      msgnum: 3,
      fullscreen: false
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // 全屏事件
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
    },
    // 用户下拉菜单相关事件
    handleCommand (command) {
      if (command === 'signOut') {
        localStorage.removeItem('ms_username')
        this.$router.push('/')
      }
    },
    changeCollapse () {
      this.collapse = !this.collapse
      this.$emit('Collapse', this.collapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #282244;
  padding: 10px 50px 10px 22px;
  overflow: hidden;
}
.title{
  float: left;
  overflow: hidden;
  font-size: 22px;
  line-height: 30px;
  margin-top: 5px;
  cursor: pointer;
}
.title div{
  float: left;
}
.title .text{
  margin-left: 10px;
  font-weight: 600;
}
.info{
  display: flex;
  float: right;
  font-size: 24px;
  line-height: 40px;
  color: #fff;
}
.info>div{
  cursor: pointer;
  margin-left: 20px;
}
.info .full-screen{
  transform: rotate(45deg);
}
.info .msg-num{
  position: relative;
}
.info .msg-num span{
  position: absolute;
  top: 5px;
  right: -2px;
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
}
.info .user-info img{
  border-radius: 50%;
  width: 40px;
}
.info .user-info .el-dropdown{
  right: -5px;
  top: -15px;
  color: #fff;
  cursor: pointer;
}
</style>
