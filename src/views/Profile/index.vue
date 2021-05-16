<style lang="less" scoped>
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
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // line-height: 200px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100% !important;
  background-color: #545c64;
  text-align: center;
  .tac .el-row {
    height: 100% !important;
  }
}
.el-aside .el-menuitem {
  width: 249px;
  margin-left: 20px;
}
.el-main {
  position: relative;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
<template>
  <el-container class="home-container">
    <el-header>
      <span>用户个人中心</span>
      <div class="user-info">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="avatar" :src="avatar" />
            {{ username }}，欢迎回来
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="0" @click="goHome">
                <span slot="title"> <i class="el-icon-menu"></i>返回主页 </span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <span> <i class="el-icon-menu"></i>房源信息管理 </span>
                </template>
                <el-menu-item @click="goRentInfo" index="1-1">
                  <i class="el-icon-menu"></i>我的房子
                </el-menu-item>
                <el-menu-item @click="publishHouseInfo" index="1-2">
                  <i class="el-icon-menu"></i>提交发布租房申请
                </el-menu-item>
                <el-menu-item @click="goCollection" index="1-3">
                  <i class="el-icon-menu"></i>我的收藏
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span> <i class="el-icon-menu"></i>用户信息管理 </span>
                </template>
                <el-menu-item @click="changePassword" index="2-1">
                  <i class="el-icon-menu"></i>修改我的密码
                </el-menu-item>
                <el-menu-item @click="changeProfile" index="2-2">
                  <i class="el-icon-menu"></i>修改我的个人信息
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
import { getItem, removeItem } from '@/utils/storage.js'
export default {
  inject: ['reload'],
  created () {
    if (!this.$store.state.user) {
      this.$router.push('login')
    }
    this.getUser()
    // console.log(this.username)
    // console.log(this.avatar)
  },
  mounted () {
    this.$bus.$on('avatarchange', _ => {
      this.reload()
    })
  },
  data () {
    return {
      username: '',
      avatar: 'http://localhost:8080/img/'
    }
  },
  methods: {
    async getUser () {
      let id = getItem('ZF_USER').id
      const { data: res } = await this.$http.get('user/selectById', { params: { id: id } })
      if (res.code !== 200) return this.$message.error('获取用户数据失败')
      console.log(res.data)
      this.username = res.data.userName
      // this.avatar += res.data.faceImage + '?' + new Date().getTime()
      this.avatar += res.data.faceImage
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$router.push('changepassword')
      } else if (command === 'b') {
        removeItem('ZF_USER')
        this.$router.push('home')
      }
    },
    goHome () {
      this.$router.push('home')
    },
    goRentInfo () {
      this.$router.push('rentinfo')
    },
    goRentOtherInfo () {
      this.$router.push('rentotherinfo')
    },
    changePassword () {
      this.$router.push('changepassword')
    },
    changeProfile () {
      this.$router.push('changeprofile')
    },
    publishHouseInfo () {
      this.$router.push('publishhouseinfo')
    },
    myPublishedInfo () {
      this.$router.push('mypublishedinfo')
    },
    goCollection () {
      this.$router.push('mycollection')
    }
  }
}
</script>