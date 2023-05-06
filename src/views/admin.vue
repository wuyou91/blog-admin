<template>
  <div class="admin">
    <sub-nav></sub-nav>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="admin-contain">
            <img :src="imgBase + adminInfo.avatar" alt="avatar" />
            <div class="admin-info">
              <p class="admin-name">管理员名称：{{ adminInfo.name }}</p>
              <p class="admin-name">管理员编号：{{ adminInfo.id }}</p>
              <p class="admin-name">管理员级别：{{ adminInfo.desc }}</p>
              <p class="admin-name">
                创建时间：{{
                  adminInfo.create_time.slice(0, 19).replace(/T/, " ")
                }}
              </p>
              <p class="admin-name">
                上次登录：{{ adminInfo.last_login_time }}
              </p>
            </div>
            <el-button type="primary" @click="showToast"
              >获取历史图片</el-button
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row type="flex" :gutter="20" justify="space-between">
          <el-col :span="12">
            <el-card shadow="hover" class="card-gap">
              <div class="card-title">文章统计</div>
              <div>
                <span>总数</span
                ><span style="color: #409eff">{{ blogInfo.articleCount }}</span>
              </div>
              <div>
                <span>正常展示</span
                ><span style="color: #409eff">{{
                  blogInfo.articleCount - blogInfo.deletedArticle
                }}</span>
              </div>
              <div>
                <span>回收站</span
                ><span style="color: #409eff">{{
                  blogInfo.deletedArticle
                }}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="card-gap">
              <div class="card-title">访客统计</div>
              <div>
                历史访客<span style="color: #67c23a">{{
                  blogInfo.visitorCount
                }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from "@/config";
import { mapState } from "vuex";
import http from "@/http";
import subNav from "./components/subNav.vue";
export default {
  components: {
    subNav,
  },
  data() {
    return {
      imgBase: config.cdn,
      blogInfo: {},
    };
  },
  computed: {
    ...mapState(["adminInfo"]),
  },
  methods: {
    showToast() {
      this.$prompt("请输入类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.putHistoryPhotos(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    putHistoryPhotos(type) {
      http
        .getHistoryPhoto({ type })
        .then((res) => {
          console.log(res);
          this.$message({
            type: res.data.type,
            message: res.data.message,
          });
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
  },
  created() {
    http.blogInfo().then(
      (res) => {
        this.blogInfo = res.data.data;
      },
      (err) => {
        this.$message.error(err.response.data);
        if (err.response.status === 403) {
          this.$router.push("/");
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.admin-contain {
  width: 100%;
  img {
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .admin-info {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
}
.card-title {
  font-size: 22px;
  margin-bottom: 10px;
}
</style>
