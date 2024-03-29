<template>
  <div class="write">
    <section class="head">
      <div class="area">
        <span>标题：</span
        ><el-input v-model="title" placeholder="文章标题"></el-input>
      </div>
      <div class="area">
        <span>标签</span>
        <el-select v-model="selectTags" multiple="" placeholder="选择标签">
          <el-option v-for="item in tagList" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-input
          style="width: 100px; margin-left: 30px"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          style="margin-left: 10px; height: 40px"
          type="primary"
          @click="showInput"
          >+ 增加标签</el-button
        >
      </div>
      <div class="area">
        <span>简介：</span>
        <el-input
          type="textarea"
          placeholder="文章简介"
          v-model="desc"
        ></el-input>
      </div>
      <div class="area">
        <span>分类</span>

        <el-select v-model="classify" placeholder="选择文章分类">
          <el-option v-for="item in articleClassify" :key="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="area">
        <span>封面</span>

        <el-upload
          class="upload-demo"
          list-type="picture"
          :action="uploadBase"
          :before-upload="beforeAvatarUpload"
          :data="photoInfo"
          :file-list="fileList"
          :on-success="success"
        >
          <el-button size="small" type="primary">上传封面</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过2M
          </div>
        </el-upload>
      </div>
    </section>
    <quill-editor v-model="content" :options="editorOption"> </quill-editor>
    <div class="submit-article">
      <el-button type="info" @click="cancel" :loading="loading"
        >取消修改</el-button
      >
      <el-button type="primary" @click="submitArticle" :loading="loading">{{
        submitText
      }}</el-button>
    </div>
    <div class="preview" v-show="content">
      <h2 class="preview-title">预览</h2>
      <div class="article-text" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import http from "@/http";
import config from "@/config";

export default {
  props: {
    article: Object,
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      selectTags: this.article.tags,
      tagList: [],
      uploadBase: "/api/photo/uploadPhoto",
      fileList: [
        {
          name: this.article.cover,
          url: config.cdn + "/" + this.article.cover,
        },
      ],
      oldArticle: this.article,
      title: this.article.title,
      cover: this.article.cover,
      desc: this.article.desc,
      content: this.article.html,
      classify: this.article.classify,
      articleClassify: ["技术文章", "生活随笔", "转载记录", "其他"],
      submitText: "提交修改",
      loading: false,
      photoInfo: {
        photoType: "article",
        photoClassify: "cover",
      },
      editorOption: {
        placeholder: "请输入内容",
      },
    };
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tagList.indexOf(inputValue) === -1 &&
          this.tagList.push(inputValue);
        this.selectTags.indexOf(inputValue) === -1 &&
          this.selectTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    getTagList() {
      http.getTagList().then((res) => {
        this.tagList = res.data.data.map((x) => x.name);
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("只能上传 jpg/png 格式的图片文件!");
      }
      if (!isLt2M) {
        this.$message.error("上传的文件大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    success(res) {
      this.$message({
        type: res.type,
        message: res.message,
      });
      this.cover = res.message;
    },
    submitArticle() {
      this.loading = true;
      this.submitText = "提交中";
      http
        .updateArticle({
          article_id: this.oldArticle.id,
          content: {
            title: this.title,
            desc: this.desc,
            classify: this.classify,
            cover: this.cover,
            html: this.content,
            tags: this.selectTags,
          },
        })
        .then((data) => {
          this.$message({
            type: "success",
            message: data.data.message,
          });
          const result = {
            index: this.oldArticle.index,
            content: {
              ...this.oldArticle,
              title: this.title,
              desc: this.desc,
              cover: this.cover,
              classify: this.classify,
              html: this.content,
              tags: this.selectTags,
            },
          };
          this.$emit("change", result);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  created() {
    this.getTagList();
  },
};
</script>

<style>
.quill-editor .ql-container {
  height: 500px;
}
</style>

<style lang="scss" scoped>
@import "@/assets/common/variable.scss";
section.head {
  .area {
    display: flex;
    margin-bottom: 20px;
    & > span {
      width: 50px;
    }
  }
}
.preview {
  margin-top: 50px;
  padding: 20px;
  background: #fff;
  .preview-title {
    padding-bottom: 20px;
    border-bottom: 1px solid $light;
  }
}
.submit-article {
  margin: 20px 0;
}
</style>
