<template>
  <div>
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from './AppHeader/Header'
import AppNavbar from './AppNavbar/Navbar'
import AppMain from './AppMain/Main'
export default {
  components: {
    AppHeader,
    AppNavbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
/* 头部区域 */
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 50px;
  background-color: #2d3a4b;
}
.navbar {
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-y: auto; 
  width: 230px;
  background-color: #545c64;
}
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  bottom: 0;
  right: 0;
  padding: 10px;
  overflow-y: auto; 
}
</style>