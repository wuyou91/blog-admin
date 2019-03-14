 <template>
  <div class="article-list">
    <el-table :data="tableData" style="width: 100%" stripe >
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="180" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
      <el-table-column prop="desc" label="简介" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="编辑" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      tableData:[
      ]
    }
  },
  created() {
    this.getData(0,10)
  },
  components:{
    loading
  },
  methods: {
    handleClick(arg){
      console.log(arg)
    },
    async getData(page,limit){
      const data = {page,limit}
      const res = await http.getArticleList(data)
      this.tableData = res.data
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
