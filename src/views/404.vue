<template>
  <div class="no-page">
    <div class="content">
      <p>404</p>
      <el-button @click="gohome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "404",
  methods: {
    gohome() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style lang="scss" scoped>
.no-page {
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    p {
      font-size: 150px;
    }
  }
}
</style>