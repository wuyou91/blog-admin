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
import {mapState} from 'vuex'

export default {
  components: {
    topHead,
    sideBar
  },
  comments: {
    ...mapState(['adminInfo'])
  },
  created() {
    this.$store.dispatch('getAdminInfo')
  }
}
</script>

<style lang="scss" scoped>

</style>

