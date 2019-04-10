<template>
<div class="upload-photos">
    <sub-nav></sub-nav>
    <div class="classify">
        <el-select v-model="photoInfo.photoClassify" placeholder="选择图片分类">
            <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item"
                :value="item"
                >
            </el-option>
        </el-select>
    </div>
    <el-upload
        class="upload-demo"
        ref="upload"
        :action= "uploadBase"
        multiple
        list-type="picture"
        :before-upload = "beforeAvatarUpload"
        :on-success = "success"
        :auto-upload="false"
        :data = "photoInfo"
        >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
    </el-upload>
</div>
</template>

<script>
import config from '@/config'
import subNav from './components/subNav.vue'

export default {
    components: {
        subNav
    },
    data() {
        return {
            uploadBase: config.API_BASE + '/photo/uploadPhoto',
            options: ['人像', '风光', '人文', '随拍', '其他'],
            photoInfo:{
                photoType: "photo",
                photoClassify: "人像"
            },
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/png"||file.type ==="image/jpeg"||file.type ==="image/gif";
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
            this.$message.error('只能上传 jpg/png/gif 格式的图片文件!');
            }
            if (!isLt2M) {
            this.$message.error('上传的文件大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        success(res) {
            this.$message({
                type: res.type,
                message: res.message
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/common/variable.scss';
.classify{
    margin-bottom: 20px;
}
</style>
