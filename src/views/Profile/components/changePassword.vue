<style>
.changePassword-form {
  padding: 40px 100px 0px 100px;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="changePasswordForm" class="changePassword-form" ref="changePasswordRef" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword" :rules="rules.oldPassword">
          <el-input placeholder="请输入密码" v-model="changePasswordForm.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :rules="rules.newPassword">
          <el-input placeholder="请输入密码" v-model="changePasswordForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword" :rules="rules.rePassword">
          <el-input placeholder="请再次输入密码" v-model="rePassword" show-password></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="changePassword">确认修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import tools from '../../BackgroundSystem/tools.js'
import { getItem, removeItem } from '../../../utils/storage.js'
export default {
  data() {
    // // 自定义表单验证
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.changePasswordForm.newPassword) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: ''
      },
      rePassword: '',
      rules: {
        //验证密码是否合法
        oldPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
        // repassword: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { validator: validatePass, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    async changePassword() {
      this.$refs.changePasswordRef.validate(async valid => {
        if (!valid) return
        if (this.rePassword !== this.changePasswordForm.newPassword) return this.$message.error('密码不一致')
        const { data: res } = await this.$http.post(
          `user/updatePassword?id=${getItem('ZF_USER').id}`,
          this.qs.stringify(this.changePasswordForm)
        )
        if (res.code !== 200) {
          return this.$message.error('修改密码失败')
        }

        this.$message.success('修改密码成功,请重新登录')
        this.$router.push('login')
        removeItem('ZF_USER')
      })
    },
    resetForm() {
      this.$refs.changePasswordRef.resetFields()
    }
  }
}
</script>
