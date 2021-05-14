<style>
.changePassword_form {
  padding: 0 200px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="changeForm" ref="changeForm" label-width="100px">
        <el-form-item label="昵称">
          <el-input placeholder v-model="changeForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input placeholder v-model="changeForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="更改头像">
          <el-upload
            action="http://localhost:8080/admin/upload"
            list-type="picture-card"
            name="files"
            ref="uploadfile"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :class="{ hide: hideUpload }"
            :file-list="faceImageFile"
            :limit="1"
          >
            <span>添加图片</span>
          </el-upload>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="change">确认修改</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="previewPath" alt />
    </el-dialog>
  </div>
</template>
<script>
import { getItem } from '../../../utils/storage'
export default {
  created() {
    this.id = getItem('ZF_USER').id
    console.log(this.id)
    this.getUser()
  },
  data() {
    return {
      hideUpload: false,
      id: null,
      changeForm: {
        id: this.id,
        contact: '',
        nickName: '',
        faceImage: ''
      },
      //  保存预览图片的url地址
      previewPath: '',
      // 控制预览图片对话框的显示和隐藏
      previewVisible: false,
      faceImageFile: []
    }
  },
  methods: {
    async getUser() {
      const { data: res } = await this.$http.get('user/selectById', { params: { id: this.id + '' } })
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.changeForm = res.data
    },
    handlePreview(file) {
      // 当用户点击图片进行预览时执行，处理图片预览
      // 形参file就是用户预览的那个文件
      this.previewPath = file.url
      // 显示预览图片对话框
      this.previewVisible = true
    },
    handleRemove() {
      this.changeForm.faceImage = ''
      this.hideUpload = this.changeForm.faceImage != ''
    },
    handleSuccess(response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      this.changeForm.faceImage = response.data
      console.log(this.changeForm)
    },
    handleChange() {
      this.hideUpload = this.changeForm.faceImage != ''
    },
    async change() {
      const { data: res } = await this.$http.post('user/updateById', this.qs.stringify(this.changeForm))
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$refs.uploadfile.clearFiles()
      this.changeForm.faceImage = ''
      this.hideUpload = this.changeForm.faceImage != ''
      this.$bus.$emit('avatarchange')
      return this.$message.success('修改成功')
    }
  }
}
</script>
