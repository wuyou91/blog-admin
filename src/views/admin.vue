<template>
  <div class="admin">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
            用户主页
        </el-card>
      </el-col>
      <el-col :span="18">
        第二列
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style lang="scss" scoped>
  .main{
    background: red;
  }
</style>
