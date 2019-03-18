<template>
  <div class="admin">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
            <div class="admin-contain">
              <img :src="imgBase + adminInfo.avatar" alt="avatar">
              <div class="admin-info">
                <p class="admin-name">管理名称：{{adminInfo.name}}</p>
                <p class="admin-name">管理账号：{{adminInfo.id}}</p>
                <p class="admin-name">管理级别：{{adminInfo.desc}}</p>
                <p class="admin-name">创建时间：{{adminInfo.create_time}}</p>
                <p class="admin-name">上次登录：{{adminInfo.create_time}}</p>
              </div>
            </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row type="flex" :gutter="20" justify="space-between">
          <el-col :span="12">
            <el-card shadow="hover" class="card-gap">
              今日访客<span class="visitor-count" style="color:#409EFF">111</span>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="card-gap">
              历史访客<span class="visitor-count" style="color:#67C23A">222</span>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from '@/config'
import{ mapState } from 'vuex'
export default {
  data() {
    return {
      imgBase: config.API_BASE  + '/images/'
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  mounted(){
    console.log(this.adminInfo.desc)
  }
}
</script>

<style lang="scss" scoped>
.admin-contain{
  width: 100%;
  display: flex;
  justify-content: space-between;
  img{
    width: 150px;
    height: 150px;
  }
  .admin-info{
    margin-left: 20px;
    flex-grow:1;
  }

}
</style>
