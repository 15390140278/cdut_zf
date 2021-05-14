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

.register_container .el-menu--horizontal .el-menu {
  height: 50px !important;
  background-color: #372d33 !important;
  color: #ffffff !important;
}

.register_container {
  background: #2b4b6b url('../../assets/background.png') no-repeat;
  height: 100%;
}

.register_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.register_form {
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
  <div class="register_container">
    <el-menu mode="horizontal">
      <el-menu-item @click="$router.push('home')">返回首页</el-menu-item>
    </el-menu>
    <div class="register_box">
      <el-form :model="registerForm" class="register_form" ref="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.password">
          <el-input placeholder="请输入密码" v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password" :rules="rules.password">
          <el-input placeholder="请再次输入密码" v-model="registerForm.repassword" show-password></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button>重置</el-button>
          <span class="toRegister" @click="goLogin">已有账号？去登录</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import registerRequest from '@/api/user/registerRequest.js'

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: ''
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
    async register() {
      this.$refs.registerForm.validate(async valid => {
        if (!valid) return

        if (this.registerForm.password !== this.registerForm.repassword) {
          return this.$message.error('密码不一致')
        }

        const data = {
          userName: this.registerForm.username,
          password: this.registerForm.password
        }
        const { data: res } = await registerRequest(data)
        console.log(res)
        if (res.code === 200) {
          return this.$message.success(res.msg)
        } else {
          return this.$message.error(res.msg)
        }
      })
    },

    goLogin() {
      this.$router.push('login')
    }
  }
}
</script>
