<template>
  <div class="write">
    <section class="head">
      <el-input v-model="title" placeholder="文章标题"></el-input>
      <el-input type="textarea" placeholder="文章简介" v-model="desc"></el-input>
      <el-select v-model="classify" placeholder="选择文章分类">
        <el-option
          v-for="item in articleClassify"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
      <!-- <el-input v-model="tags" placeholder="文章标签"></el-input> -->
      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">上传封面</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload> -->
    </section>
    <quill-editor v-model="content" :options="editorOption">
    </quill-editor>
    <div class="submit-article">
      <el-button type="primary" @click="submitArticle" :loading = "loading">{{submitText}}</el-button>
    </div>
    <div class="preview" v-show="content">
      <h2 class="preview-title">预览</h2>
      <div class="preview-content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import http from '@/http'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      title:'',
      desc: '',
      content: '',
      classify: '',
      articleClassify: ['技术文章','生活随笔','转载记录','其他'],
      submitText: '提交文章',
      loading: false,
      editorOption: {
        placeholder: '请输入内容'
      }
    }
  },
  methods: {
    submitArticle(){
      this.loading = true
      this.submitText = '提交中'
      http.addArticle({
        title:this.title,
        desc:this.desc,
        classify:this.classify,
        html: this.content
      }).then((data)=>{
        this.$message({
          type: 'success',
          message: data.data.message
        })
        this.title = ''
        this.desc = ''
        this.classify = ''
        this.content = ''
        this.submitText = '提交文章'
        this.loading = false
      })
    }
  }
}
</script>

<style>
  .quill-editor .ql-container{
    height: 500px;
  }
</style>

<style lang="scss" scoped>
@import '@/assets/common/variable.scss';
section.head{
  &>div{
    margin-bottom: 20px;
  }
}
.preview{
  margin-top: 50px; 
  padding: 20px;
  background: #fff;
  .preview-title{
    padding-bottom: 20px;
    border-bottom: 1px solid $light;
  }
}
.submit-article{
  margin: 20px 0;
  display: flex;
  flex-direction:row-reverse; 
}
</style>
