 <template>
  <div class="article-list">
    <el-table :data="tableData" style="width: 100%" stripe >
      <el-table-column prop="id" label="序列号" width="180" align="center"></el-table-column>
      <el-table-column prop="ip" label="访客ip" width="180" align="center"></el-table-column>
      <el-table-column prop="first_time" label="首次访问时间" width="180" align="center"></el-table-column>
      <el-table-column prop="last_time" label="最后访问时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="visit_count" label="访问总数" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total= total @current-change = "handleCurrentChange"></el-pagination>
    </div>
    <loading v-if="showLowding"></loading>
  </div>
 </template>

<script>
import loading from './components/loading'
import http from '@/http'
export default {
  data () {
    return {
      showLowding: true,
      tableData: [],
      total: 0,
      limit: 10
    }
  },
  created() {
    this.getData(1,this.limit)
  },
  components:{
    loading
  },
  methods: {
    handleClick(arg){
      console.log(arg)
    },
    handleCurrentChange(val){
      console.log(val)
      this.getData(val,this.limit)
    },
    async getData(page,limit){
      const data = {page,limit}
      const res = await http.getVisitor(data)
      this.tableData = res.data.data
      this.total = res.data.total
      this.showLowding = false
    } 
  }
}
</script>

<style lang="scss" scoped>
.article-list{
  position: relative;
}
.pagination{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
