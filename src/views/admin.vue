<template>
  <div class="admin">
    <sub-nav></sub-nav>
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
              <div class="card-title">文章统计</div>
              <div>
                <span>总数</span><span style="color:#409EFF">{{blogInfo.articleCount}}</span>
              </div>
              <div>
                <span>正常展示</span><span style="color:#409EFF">{{blogInfo.articleCount - blogInfo.deletedArticle}}</span>
              </div>
              <div>
                <span>回收站</span><span style="color:#409EFF">{{blogInfo.deletedArticle}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="card-gap">
              <div class="card-title">访客统计</div>
              <div>历史访客<span style="color:#67C23A">{{blogInfo.visitorCount}}</span></div>
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
import http from '@/http'
import subNav from './components/subNav.vue'
export default {
  components: {
    subNav
  },
  data() {
    return {
      imgBase: config.cdn  + '/image/',
      blogInfo: {}
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  created(){
    http.blogInfo().then((res) => {
      this.blogInfo = res.data.data
    },(err) => {
      this.$message.error(err.response.data);
      if(err.response.status ===403){
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.admin-contain{
  width: 100%;
  img{
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .admin-info{
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
}
.card-title{
  font-size: 22px;
  margin-bottom: 10px;
}
</style>
