<style lang="less">
.home {
  position: relative;
  height: 2000px;
}
.home .el-menu {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100% !important;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  .el-menu-item {
    color: #fff;
  }
}

.el-menu--horizontal > .el-menu-item {
  height: 50px !important;
  background-color: #372d33 !important;
  color: #ffffff !important;
}
</style>
<template>
  <div class="home">
    <el-menu mode="horizontal">
      <el-menu-item v-if="!isLogin" @click="login">登录-注册</el-menu-item>
      <el-menu-item v-else @click="profile">个人中心</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
import { getItem } from '../../utils/storage'

export default {
  data() {
    return {
      isLogin: getItem('ZF_USER')
    }
  },
  created() {},
  methods: {
    login() {
      this.$router.push('login')
    },
    profile() {
      this.$router.push('profile')
    }
  }
}
</script>
