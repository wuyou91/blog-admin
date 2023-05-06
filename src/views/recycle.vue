 <template>
  <div class="article-list">
    <sub-nav></sub-nav>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column
        prop="id"
        label="文章编号"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date_string"
        label="创建日期"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="clicks"
        label="点击量"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stars"
        label="标心量"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="400"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="classify"
        label="分类"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="编辑" align="center" width="250">
        <template slot-scope="scope">
          <el-button
            @click="handleRestore(scope.$index)"
            type="success"
            plain
            size="small"
            icon="el-icon-refresh"
            >还原</el-button
          >
          <el-button
            @click="handleDeleteArticle(scope.$index)"
            type="danger"
            plain
            size="small"
            icon="el-icon-delete"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <loading v-if="showLowding"></loading>
  </div>
</template>

<script>
import loading from "./components/loading";
import http from "@/http";
import subNav from "./components/subNav.vue";

export default {
  data() {
    return {
      showLowding: true,
      tableData: [],
      total: 0,
      limit: 10,
    };
  },
  created() {
    this.getData(1, this.limit);
  },
  components: {
    loading,
    subNav,
  },
  methods: {
    handleRestore(index) {
      const articleiId = this.tableData[index].id;
      const articleTitle = this.tableData[index].title;
      this.$confirm(
        `你确定要还原ID为${articleiId}，标题为《${articleTitle}》的文章吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const data = {
            id: articleiId,
          };
          const res = await http.recoveryArticle(data);
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "文章已还原",
            });
            this.tableData.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    handleCurrentChange(val) {
      this.getData(val, this.limit);
    },
    handleDeleteArticle(index) {
      const articleiId = this.tableData[index].id;
      const articleTitle = this.tableData[index].title;
      this.$confirm(
        `你确定彻底删除ID为${articleiId}，标题为《${articleTitle}》的文章吗？，删除后无法还原！`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const data = {
            id: articleiId,
            remove: 1,
          };
          const res = await http.deleteArticle(data);
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.tableData.splice(index, 1);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getData(page, limit) {
      const data = { page, limit, deleted: true };
      const res = await http.getArticleList(data);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.showLowding = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-list {
  position: relative;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
