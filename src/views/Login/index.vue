<style lang="less" scoped>
.el-menu {
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

.login_container .el-menu--horizontal .el-menu {
  height: 50px !important;
  background-color: #372d33 !important;
  color: #ffffff !important;
}

.login_container {
  background: #2b4b6b url('../../assets/background.png') no-repeat;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  .toRegister {
    font-size: 8px;
    position: absolute;
    left: 5px;
    bottom: 5px;
    color: #409eff;
  }
}
</style>
<template>
  <div class="login_container">
    <el-menu mode="horizontal">
      <el-menu-item @click="$router.push('home')">返回首页</el-menu-item>
    </el-menu>
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt />
      </div>
      <el-form :model="loginForm" class="login_form" ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
          <span class="toRegister" @click="goRegister">没有账号？去注册</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import loginRequest from '@/api/user/loginRequest.js'
import { setItem } from '../../utils/storage.js'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return

        const adminData = {
          adminName: this.loginForm.username,
          password: this.loginForm.password
        }

        const data = {
          userName: this.loginForm.username,
          password: this.loginForm.password
        }
        if (this.loginForm.username === 'admin') {
          const { data: res } = await loginRequest(adminData)
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$router.push('backgroundsystem')
            this.$store.commit('setAdminLoginStatus', res.data)
          } else {
            this.$message.error(res.msg)
          }
          return
        }
        const { data: res } = await loginRequest(data)

        console.log(res)

        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$router.push('home')
          this.$store.commit('setLoginStatus', res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reset() {
      this.$refs.loginForm.resetFields()
    },
    goRegister() {
      this.$router.push('register')
    }
  }
}
</script>
