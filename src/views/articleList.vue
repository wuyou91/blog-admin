 <template>
  <div class="article-list">
    <el-table :data="tableData" style="width: 100%" stripe >
      <el-table-column prop="id" label="文章编号" width="180" align="center"></el-table-column>
      <el-table-column prop="date_string" label="创建日期" width="180" align="center"></el-table-column>
      <el-table-column prop="clicks" label="点击量" width="180" align="center"></el-table-column>
      <el-table-column prop="stars" label="标心量" width="180" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
      <el-table-column prop="classify" label="分类" width="180" align="center"></el-table-column>
      <el-table-column prop="desc" label="简介" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="编辑" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="handleDeleteArticle(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total= total @current-change = "handleCurrentChange"></el-pagination>
    </div>
    <div class="edit" v-if="edit">
      <edit :article = article @cancel ="cancel" @change= "changeArticle"></edit>
    </div>
  </div>
 </template>

<script>
import http from '@/http'
import edit from './components/edit.vue'
export default {
  components: {
    edit
  },
  data () {
    return {
      tableData: [],
      total: 0,
      limit: 10,
      edit:false,
      article:{}
    }
  },
  created() {
    this.getData(1,this.limit)
  },
  methods: {
    handleEdit(index){
      const articleiId = this.tableData[index].id
      http.getArticle(articleiId).then((res) => {
        this.article = res.data.data
        this.article.index = index
        this.edit = true
      })
    },
    changeArticle(data){
      this.$set(this.tableData,data.index,data.content)
      this.edit = false
    },
    cancel(){
      this.edit = false
    },
    handleCurrentChange(val){
      this.getData(val,this.limit)
    },
    handleDeleteArticle(index){
      const articleiId = this.tableData[index].id
      const articleTitle = this.tableData[index].title
      this.$confirm(`你确定将ID为${articleiId}，标题为《${articleTitle}》的文章放入回收站吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = {
          article_id: articleiId,
          content: {deleted:true}
        }
        const res = await http.updateArticle(data)
        if(res.data.status==1){
          this.$message({
            type: 'success',
            message: '已成功将文章放入回收站'
          })
          this.tableData.splice(index,1)
        }else{
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    async getData(page,limit){
      const data = {page,limit}
      const res = await http.getArticleList(data)
      this.tableData = res.data.data
      this.total = res.data.total
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
.edit{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  overflow-y: auto;
  background: #fff;
  z-index: 1;
}
</style>
