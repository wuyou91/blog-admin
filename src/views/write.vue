<template>
  <div>
    <el-input v-model="title" placeholder="文章标题"></el-input>
    <el-input type="textarea" placeholder="文章简介" v-model="desc"></el-input>
    <el-input v-model="tags" placeholder="文章标签"></el-input>
    <el-upload
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
    </el-upload>
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <div class="submit-article">
      <el-button type="primary" @click="submitArticle">提交</el-button>
    </div>
    <div class="preview">
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
      tags: '',
      content: '',
      editorOption: {
        placeholder: '请输入内容'
      }
    }
  },
  methods: {
    submitArticle(){
      let tags = this.tags.split(',')
      http.addArticle({
        title:this.title,
        desc:this.desc,
        tags:tags,
        html: this.content
      }).then((data)=>{
        this.$message({
          type: 'success',
          message: '文章提交成功'
        })
        this.title = ''
        this.desc = ''
        this.tags = ''
        this.content = ''
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
}
</style>
