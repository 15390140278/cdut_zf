<style>
.changePassword_form {
  padding: 0 100px;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>修改管理员密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="changePasswordForm" class="changePassword_form" ref="changePasswordForm" label-width="100px">
      <el-form-item label="密码" prop="password" :rules="rules.password">
        <el-input placeholder="请输入密码" v-model="changePasswordForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="rules.password">
        <el-input placeholder="请输入密码" v-model="changePasswordForm.newpassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password" :rules="rules.password">
        <el-input placeholder="请再次输入密码" v-model="changePasswordForm.repassword" show-password></el-input>
      </el-form-item>
      <div class="btns">
        <el-button type="primary">确认修改</el-button>
        <el-button>重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changePasswordForm: {
        password: '',
        newpassword: '',
        repassword: ''
      },
      rules: {
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  activated() {}
}
</script>
