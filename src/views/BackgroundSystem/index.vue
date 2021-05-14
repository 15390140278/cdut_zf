<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100% !important;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #23262e;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  span {
    color: #fff;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
  color: #333;
  text-align: center;
  .el-menu {
    border-right: 0px;
    height: 100%;
  }
}

.el-main {
  height: 100%;
  position: relative;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-menu-item-group__title {
  padding: 0px !important;
}
</style>
<template>
  <el-container class="home-container">
    <el-header>
      <span>后台管理系统</span>
      <div class="user-info">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            超级管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :default-active="activePath"
              :unique-opened="true"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户信息管理</span>
                </template>
                <el-menu-item @click="allUser" index="1-1">
                  <span>
                    <i class="el-icon-menu"></i>查看所有用户
                  </span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>房源信息管理</span>
                </template>
                <el-menu-item @click="houseInfo" index="2-1">
                  <span>
                    <i class="el-icon-menu"></i>所有房源信息
                  </span>
                </el-menu-item>
                <el-menu-item @click="addHouseInfo" index="2-2">
                  <span>
                    <i class="el-icon-menu"></i>添加房源信息
                  </span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { removeItem } from '../../utils/storage'
export default {
  created() {
    if (!this.$store.state.admin) {
      this.$router.push('login')
    }
    // console.log(this.activePath)
  },
  data() {
    return {
      activePath: '0'
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'b') {
        removeItem('ZF_ADMIN')
        this.$router.push('login')
      }
    },
    goHome() {
      this.$router.push('home')
    },
    allUser() {
      this.$router.push('buser')
    },
    changePassword() {
      this.activePath = '1-2'
      this.$router.push('bchangepassword')
    },
    houseInfo() {
      this.$router.push('bhouseinfo')
    },
    addHouseInfo() {
      this.$router.push('baddhouseinfo')
    }
  }
}
</script>