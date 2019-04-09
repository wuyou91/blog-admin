 <template>
  <div class="photo-list">
    <sub-nav></sub-nav>
    <el-table :data="tableData" style="width: 100%" stripe >
        <el-table-column label="缩略图" width="180" align="center">
            <template slot-scope="scope">
            <img class="avatar" :src="imgBase + scope.row.name + '?imageMogr2/auto-orient/thumbnail/200x/blur/1x0/quality/80|imageslim'" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="hash" label="HASH" width="260" align="center"></el-table-column>
        <el-table-column prop="upload_date" label="上传时间" width="300" align="center" ></el-table-column>
        <el-table-column prop="bucket" label="bucket" width="150" align="center"></el-table-column>
        <el-table-column prop="type" label="用途" width="150" align="center"></el-table-column>
        <el-table-column prop="classify" label="分类" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="size" label="大小(M)" width="150" align="center"></el-table-column>
        <el-table-column prop="width" label="宽(px)" width="150" align="center" ></el-table-column>
        <el-table-column prop="height" label="高(px)" width="150" align="center" ></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total= total @current-change = "handleCurrentChange"></el-pagination>
    </div>
  </div>
 </template>

<script>
import http from '@/http'
import config from '@/config'
import subNav from './components/subNav.vue'

export default {
  data () {
    return {
      tableData: [],
      total: 0,
      limit: 10,
      imgBase: config.cdn
    }
  },
  created() {
    this.getData(1,this.limit)
  },
  components:{
    subNav
  },
  methods: {
    handleClick(arg){
      console.log(arg)
    },
    handleCurrentChange(val){
      console.log(val)
      this.getData(val,this.limit)
    },
    getData(page,limit){
      const data = {page,limit}
      http.getPhotoList(data).then((res) => {
        this.tableData = res.data.data
        this.total = res.data.total
      },(err) => {
        this.$message.error(err.response.data);
      })
    } 
  }
}
</script>

<style lang="scss" scoped>
.authority{
  position: relative;
}
.avatar{
  display: block;
  height: 50px;
  margin: 0 auto;
}
.pagination{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
