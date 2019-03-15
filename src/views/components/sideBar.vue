<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      router
      :collapse="collapse"
      background-color="#423064"
      text-color="#cceeff"
      active-text-color="#0099e6">
      <el-menu-item index="/home/admin">
        <i class="el-icon-document"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/home/articleList">
        <i class="el-icon-printer"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/home/write">
        <i class="el-icon-edit"></i>
        <span slot="title">添加文章</span>
      </el-menu-item>
      <el-menu-item index="/home/visitor">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">访客统计</span>
      </el-menu-item>
      <el-menu-item index="/home/authority">
        <i class="el-icon-setting"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'],
  computed: {
    onRoutes () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  position: absolute;
  left: 0;
  top: 60px;
  bottom:0;
}
.sidebar-el-menu:not(.el-menu--collapse){
  width: 200px;
}
.sidebar > ul {
  height:100%;
}
</style>
