<template>
  <div class="wrap">
    <top-head @Collapse="trsCollapse"></top-head>
    <side-bar :collapse="isCollapse"></side-bar>
    <div class="main" :class="{'main-collapse':isCollapse}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import topHead from './components/topHead'
import sideBar from './components/sideBar'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    topHead,
    sideBar
  },
  methods: {
    trsCollapse(data){
      this.isCollapse = data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/common/variable.scss';
.main{
   position: absolute;
   top: 60px;
   left: 200px;
   right: 0;
   bottom: 0;
   overflow-y: scroll;
   padding: 40px;
   background-color: $background;
   transition: left .3s ease-in-out;
}
.main-collapse{
  left:65px;
}
</style>

