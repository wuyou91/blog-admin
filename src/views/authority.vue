 <template>
  <div class="authority">
    <sub-nav></sub-nav>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column label="头像" width="180" align="center">
        <template slot-scope="scope">
          <img class="avatar" :src="imgBase + scope.row.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="grade"
        label="级别"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="注册时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="last_login_time"
        label="最后登陆时间"
        align="center"
      ></el-table-column>
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
import config from "@/config";
import subNav from "./components/subNav.vue";

export default {
  data() {
    return {
      showLowding: true,
      tableData: [],
      total: 0,
      limit: 10,
      imgBase: config.cdn,
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
    handleClick(arg) {
      console.log(arg);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getData(val, this.limit);
    },
    getData(page, limit) {
      const data = { page, limit };
      http.getAdminList(data).then(
        (res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.showLowding = false;
        },
        (err) => {
          this.$message.error(err.response.data);
          if (err.response.status === 403) {
            this.$router.push("/");
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.authority {
  position: relative;
}
.avatar {
  display: block;
  width: 50px;
  border-radius: 50%;
  margin: 0 auto;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
