<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      router
      :collapse="collapse"
      background-color="#423064"
      text-color="#cceeff"
      active-text-color="#0099e6"
    >
      <el-menu-item index="/admin">
        <i class="el-icon-document"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/articleList">
        <i class="el-icon-printer"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/write">
        <i class="el-icon-edit"></i>
        <span slot="title">添加文章</span>
      </el-menu-item>
      <el-menu-item index="/photoList">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">图片管理</span>
      </el-menu-item>
      <el-menu-item index="/uploadPhotos">
        <i class="el-icon-upload"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
      <el-menu-item index="/visitor">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">访客统计</span>
      </el-menu-item>
      <el-menu-item index="/authority">
        <i class="el-icon-setting"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
      <el-menu-item index="/recycle">
        <i class="el-icon-delete"></i>
        <span slot="title">回收站</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["collapse"],
  computed: {
    onRoutes() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
