<template>
  <div class="wrap">
    <top-head></top-head>
    <div class="main">
      <side-bar></side-bar>
      <router-view/>
    </div>
  </div>
</template>

<script>
import topHead from './components/topHead'
import sideBar from './components/sideBar'

export default {
  components: {
    topHead,
    sideBar
  }
}
</script>

<style lang="scss" scoped>

</style>

