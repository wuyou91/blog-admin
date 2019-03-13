 <template>
  <div class="article-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <loading v-if="showLowding"></loading>
  </div>
 </template>

<script>
import loading from './components/loading'
export default {
  components:{
    loading
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
