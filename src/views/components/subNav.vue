<template>
    <div class="sub-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    
</template>

<style lang="scss" scoped>
.sub-nav{
    margin-bottom: 20px;
}
</style>

