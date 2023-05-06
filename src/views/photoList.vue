 <template>
  <div class="photo-list">
    <sub-nav></sub-nav>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :selectable="(row, index) => row.type === 'photo'"
      >
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>

      <el-table-column label="缩略图" width="180" align="center">
        <template slot-scope="scope">
          <img
            class="avatar"
            :src="
              imgBase +
              scope.row.name +
              '?imageMogr2/auto-orient/thumbnail/200x/blur/1x0/quality/80|imageslim'
            "
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="hash"
        label="HASH"
        width="260"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="upload_date"
        label="上传时间"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="bucket"
        label="bucket"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="用途"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="classify"
        label="分类"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="size"
        label="大小(M)"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="width"
        label="宽(px)"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="height"
        label="高(px)"
        width="150"
        align="center"
      ></el-table-column>
    </el-table>
    <el-dropdown @command="handleCommand" style="margin-top: 20px">
      <el-button type="primary">
        选择分类<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="人像">人像</el-dropdown-item>
        <el-dropdown-item command="风光">风光</el-dropdown-item>
        <el-dropdown-item command="人文">人文</el-dropdown-item>
        <el-dropdown-item command="随拍">随拍</el-dropdown-item>
        <el-dropdown-item command="其他">其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/http";
import config from "@/config";
import subNav from "./components/subNav.vue";

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 15,
      imgBase: config.cdn,
      multipleSelection: [],
    };
  },
  created() {
    this.getData();
  },
  components: {
    subNav,
  },
  methods: {
    handleClick(arg) {
      console.log(arg);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCommand(command) {
      if (!this.multipleSelection.length) {
        return this.$message("请选择要修改的图片记录！");
      }
      http
        .changePhotoClassify({
          classify: command,
          photosId: this.multipleSelection.map((x) => x._id).join(),
        })
        .then((res) => {
          this.getData();
          this.$message({
            type: res.data.type,
            message: res.data.message,
          });
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData(page, pageSize) {
      http
        .getPhotoList({
          page: this.page,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
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
  height: 50px;
  margin: 0 auto;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
