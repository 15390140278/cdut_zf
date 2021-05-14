<style lang="less">
.el-breadcrumb {
  padding: 10px;
  font-size: 30px !important;
}

// 改变表头最小高度
.el-main {
  line-height: 20px !important;
}

// 表格对齐
.el-table th.gutter {
  display: table-cell !important;
}

.el-table .cell {
  text-align: center !important;
}

.btns {
  display: flex;
  justify-content: center;
}
.input-with-select {
  width: 200px;
}
.btns {
  margin-left: 10px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>所有注册用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="width: 1000px">
      <el-row>
        <el-col :span="4">
          <el-button
            size="mini"
            type="primary"
            @click="addDialogVisible = true"
          >
            添加用户
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-input
            size="mini"
            clearable
            placeholder="输入用户id"
            v-model="queryId.id"
            @clear="getUserlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser()"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%"
      >
        <el-table-column
          prop="userName"
          label="用户名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式"
          width="150"
        ></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div class="btns">
              <el-button
                @click="showEditDialog(scope.row)"
                type="primary"
                size="mini"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteUser(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[3, 5, 8]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-form
        :model="addUserForm"
        ref="addUserFormRef"
        label-width="100px"
        :rules="addUserFormRules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="addUserForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="addUserForm.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @closed="editDialogClosed"
    >
      <el-form :rules="editFormrules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input placeholder="请输入" v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userName">
          <el-input placeholder="请输入" v-model="editForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input placeholder="请输入" v-model="editForm.contact"></el-input>
        </el-form-item>
        <el-form>
          <el-form-item label="用户头像" prop="imageFile">
            <el-upload
              :class="{ hide: hideUpload }"
              action="http://localhost:8080/admin/upload"
              list-type="picture-card"
              name="files"
              ref="uploadfiles"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :on-change="handleChange"
            >
              <span>添加图片</span>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 预览图片对话框 -->
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import tools from '../tools.js'
export default {
  created () {
    this.getUserlist()
  },
  data () {
    return {
      hideUpload: false,
      limitCount: 1,
      queryId: {
        id: ''
      },
      tableData: [],
      editDialogVisible: false,
      addDialogVisible: false,
      addImageDialogVisible: false,
      //  保存预览图片的url地址
      previewPath: '',
      // 控制预览图片对话框的显示和隐藏
      previewVisible: false,
      currentPage: 1,
      pageSize: 3,
      addUserForm: {
        useName: '',
        password: ''
      },
      addUserFormRules: {
        userName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      editForm: {},
      editFormrules: {
        nickName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserlist () {
      const { data: res } = await this.$http.get('admin/selectAllUser')
      if (res.code !== 200) {
        return this.$message.error('获取用户信息失败')
      }
      this.tableData = res.data
    },
    async showEditDialog (row) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('admin/selectUserById', { params: { id: row.id } })
      if (res.code !== 200) return this.$message.error(res.msg)
      console.log(res);
      this.editForm = res.data
      console.log(this.editForm);
    },
    async deleteUser (val) {
      // 没有取消就是要删除，发送请求完成删除
      const { data: res } = await this.$http.post('admin/deleteUserById', this.qs.stringify({ id: val }))

      if (res.code !== 200) {
        return this.$message.error('删除参数数据失败')
      }
      this.$message.success('删除成功')
      this.getUserlist()
    },
    handleSizeChange (newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange (newPage) {
      this.currentPage = newPage
    },
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        let reqdata = tools.paramsToFormData(this.addUserForm)
        console.log(reqdata);
        const { data: res } = await this.$http.post('admin/addUser', reqdata)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('添加新用户成功')
        console.log(res);
        this.getUserlist()
        this.addDialogVisible = false
      })
    },
    addDialogClosed () {
      this.$refs.addUserFormRef.resetFields()
    },
    async searchUser () {
      const { data: res } = await this.$http.get('admin/selectUserById', { params: this.queryId })
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success('查询成功')
      console.log(res.data);
      this.tableData = []
      this.tableData.push(res.data)
      console.log(this.tableData);
    },
    async editUser () {
      const { data: res } = await this.$http.post('admin/updateUser', this.qs.stringify(this.editForm))
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success('修改成功')
      this.getUserlist()
      this.editDialogVisible = false
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
      this.$refs.uploadfiles.clearFiles();
      this.editForm.faceImage = '';
      this.hideUpload = this.editForm.faceImage != '';
    },
    // 图片上传
    handlePreview (file) {
      // 当用户点击图片进行预览时执行，处理图片预览
      // 形参file就是用户预览的那个文件
      this.previewPath = file.url
      // 显示预览图片对话框
      this.previewVisible = true
      console.log(file);
    },

    handleRemove () {
      this.editForm.faceImage = '';
      this.hideUpload = this.editForm.faceImage != '';
    },
    handleSuccess (response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      console.log(this.editForm);
      this.editForm.faceImage = response.data
    },
    handleChange () {
      this.hideUpload = this.editForm.faceImage != '';
    }
  }
}
</script>
