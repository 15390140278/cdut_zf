<style lang="less" scoped>
.publish_form {
  padding: 0 400px 0 0;
}

.el-select {
  width: 100%;
}

.el-input--medium {
  padding: 0;
}

.el-input--medium .el-input__inner {
  width: 700px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>发布房源信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :model="publishForm"
        class="publish_form"
        ref="publishFormRef"
        label-width="100px"
        :rules="publishFromRules"
      >
        <el-form-item label="房屋标题" prop="title">
          <el-input
            placeholder="请输入房屋标题"
            v-model="publishForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input
            placeholder="用户ID"
            v-model="publishForm.userId"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="areaId">
          <el-select v-model="publishForm.areaId" placeholder="请选择">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋类型" prop="roomTypeId">
          <el-select v-model="publishForm.roomTypeId" placeholder="请选择">
            <el-option
              v-for="item in roomTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋楼层" prop="floorId">
          <el-select v-model="publishForm.floorId" placeholder="请选择">
            <el-option
              v-for="item in floorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出租方式" prop="rentTypeId">
          <el-select v-model="publishForm.rentTypeId" placeholder="请选择">
            <el-option
              v-for="item in rentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋朝向" prop="orientedId">
          <el-select v-model="publishForm.orientedId" placeholder="请选择">
            <el-option
              v-for="item in orentedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备" prop="devicesId">
          <el-checkbox-group v-model="publishForm.devicesId">
            <el-checkbox label="电视"></el-checkbox>
            <el-checkbox label="冰箱"></el-checkbox>
            <el-checkbox label="洗衣机"></el-checkbox>
            <el-checkbox label="沙发"></el-checkbox>
            <el-checkbox label="热水器"></el-checkbox>
            <el-checkbox label="抽油烟机"></el-checkbox>
            <el-checkbox label="消毒柜"></el-checkbox>
            <el-checkbox label="宽带"></el-checkbox>
            <el-checkbox label="微波炉"></el-checkbox>
            <el-checkbox label="天然气"></el-checkbox>
            <el-checkbox label="床"></el-checkbox>
            <el-checkbox label="桌椅"></el-checkbox>
            <el-checkbox label="衣柜"></el-checkbox>
            <el-checkbox label="空调"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特点" prop="characteristicsId">
          <el-checkbox-group v-model="publishForm.characteristicsId">
            <el-checkbox label="集中供暖"></el-checkbox>
            <el-checkbox label="随时看房"></el-checkbox>
            <el-checkbox label="精装"></el-checkbox>
            <el-checkbox label="独立卫生间"></el-checkbox>
            <el-checkbox label="双卫生间"></el-checkbox>
            <el-checkbox label="押一付一"></el-checkbox>
            <el-checkbox label="独立阳台"></el-checkbox>
            <el-checkbox label="月租"></el-checkbox>
            <el-checkbox label="限男生"></el-checkbox>
            <el-checkbox label="新上"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="租房价格" prop="priceNum">
          <el-input
            placeholder="请输入价格"
            v-model="publishForm.priceNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="size">
          <el-input
            placeholder="请输入价格"
            v-model="publishForm.size"
          ></el-input>
        </el-form-item>
        <el-form-item label="房屋详情" prop="detail">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="publishForm.detail"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverPath">
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
            :limit="1"
          >
            <span>添加图片</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="详细图片" prop="picturePath">
          <el-upload
            action="http://localhost:8080/admin/upload"
            list-type="picture-card"
            name="files"
            ref="uploadfiles"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1"
            :on-change="handleChange1"
            :class="{ hide: hideUpload1 }"
            :limit="9"
          >
            <span>添加图片</span>
            <span>只能添加九张</span>
          </el-upload>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="addHouse">发布</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-card>
    <!-- 预览图片对话框 -->
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="previewPath" alt />
    </el-dialog>
  </div>
</template>
<script>
import tools from '../tools.js'
export default {
  data () {
    return {
      publishForm: {
        title: '',
        userId: '',
        areaId: '',
        roomTypeId: '',
        orientedId: '',
        priceNum: '',
        floorId: '',
        rentTypeId: '',
        coverPath: '',
        picturePath: [],
        devicesId: [],
        characteristicsId: [],
        detail: '',
        size: ''
      },
      roomTypeOptions: [
        {
          value: '0',
          label: '套一'
        },
        {
          value: '1',
          label: '套二'
        },
        {
          value: '2',
          label: '套三'
        },
        {
          value: '3',
          label: '套四'
        }
      ],
      devicesOptions: [
        {
          value: '0',
          label: '电视'
        },
        {
          value: '1',
          label: '冰箱'
        },
        {
          value: '2',
          label: '洗衣机'
        },
        {
          value: '3',
          label: '沙发'
        },
        {
          value: '4',
          label: '热水器'
        },
        {
          value: '5',
          label: '抽油烟机'
        },
        {
          value: '6',
          label: '消毒柜'
        },
        {
          value: '7',
          label: '宽带'
        },
        {
          value: '8',
          label: '微波炉'
        },
        {
          value: '9',
          label: '天然气'
        },
        {
          value: '10',
          label: '床'
        },
        {
          value: '11',
          label: '桌椅'
        },
        {
          value: '12',
          label: '衣柜'
        },
        {
          value: '13',
          label: '空调'
        }
      ],
      characteristicsOptions: [
        {
          value: '0',
          label: '集中供暖'
        },
        {
          value: '1',
          label: '随时看房'
        },
        {
          value: '2',
          label: '精装'
        },
        {
          value: '3',
          label: '独立卫生间'
        },
        {
          value: '4',
          label: '双卫生间'
        },
        {
          value: '5',
          label: '押一付一'
        },
        {
          value: '6',
          label: '独立阳台'
        },
        {
          value: '7',
          label: '月租'
        },
        {
          value: '8',
          label: '限女生'
        },
        {
          value: '9',
          label: '限男生'
        },
        {
          value: '10',
          label: '天然气'
        }
      ],
      areaOptions: [
        {
          value: '0',
          label: '东苑'
        },
        {
          value: '1',
          label: '南苑'
        },
        {
          value: '2',
          label: '北苑'
        }
      ],
      rentTypeOptions: [
        {
          value: '0',
          label: '整租'
        },
        {
          value: '1',
          label: '合租'
        }
      ],
      orentedOptions: [
        {
          value: '0',
          label: '东'
        },
        {
          value: '1',
          label: '南'
        },
        {
          value: '2',
          label: '西'
        },
        {
          value: '3',
          label: '北'
        }
      ],
      floorOptions: [
        {
          value: '0',
          label: '低楼层'
        },
        {
          value: '1',
          label: '中楼层'
        },
        {
          value: '2',
          label: '高楼层'
        }
      ],
      stateOptions: [
        {
          value: '0',
          label: '下架状态'
        },
        {
          value: '1',
          label: '审核状态'
        },
        {
          value: '2',
          label: '上架状态'
        }
      ],
      publishFromRules: {
        userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        areaId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        roomTypeId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        orientedId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        priceNum: [{ required: true, message: '不能为空', trigger: 'blur' }],
        floorId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        rentTypeId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        size: [{ required: true, message: '不能为空', trigger: 'blur' }],
        detail: [{ required: true, message: '不能为空', trigger: 'blur' }],
        coverPath: [{ required: true, message: '不能为空', trigger: 'blur' }],
        picturePath: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      //  保存预览图片的url地址
      previewPath: '',
      // 控制预览图片对话框的显示和隐藏
      previewVisible: false,
      uploadDisabled: false,
      hideUpload: false,
      hideUpload1: false,
      limitCount: 9
    }
  },
  methods: {
    addHouse () {
      this.$refs.publishFormRef.validate(async valid => {
        if (!valid) return this.$message.error('必填项未填')
        switch (this.publishForm.areaId) {
          case '东苑':
            this.publishForm.areaId = '0'
            break
          case '南苑':
            this.publishForm.areaId = '1'
            break
          case '北苑':
            this.publishForm.areaId = '2'
            break
        }
        switch (this.publishForm.roomTypeId) {
          case '套一':
            this.publishForm.roomTypeId = '0'
            break
          case '套二':
            this.publishForm.roomTypeId = '1'
            break
          case '套三':
            this.publishForm.roomTypeId = '2'
            break
          case '套四':
            this.publishForm.roomTypeId = '3'
            break
        }
        switch (this.publishForm.orientedId) {
          case '东':
            this.publishForm.orientedId = '0'
            break
          case '南':
            this.publishForm.orientedId = '1'
            break
          case '西':
            this.publishForm.orientedId = '2'
            break
          case '北':
            this.publishForm.orientedId = '3'
            break
        }
        switch (this.publishForm.rentTypeId) {
          case '合租':
            this.publishForm.rentTypeId = '1'
            break
          case '整租':
            this.publishForm.rentTypeId = '0'
            break
        }
        switch (this.publishForm.floorId) {
          case '低楼层':
            this.publishForm.floorId = '0'
            break
          case '中楼层':
            this.publishForm.floorId = '1'
            break
          case '高楼层':
            this.publishForm.floorId = '2'
            break
        }
        let arr = this.publishForm.devicesId
        arr.forEach((item, index) => {
          switch (item) {
            case '电视':
              arr[index] = '0'
              break
            case '冰箱':
              arr[index] = '1'
              break
            case '洗衣机':
              arr[index] = '2'
              break
            case '沙发':
              arr[index] = '3'
              break
            case '热水器':
              arr[index] = '4'
              break
            case '抽油烟机':
              arr[index] = '5'
              break
            case '消毒柜':
              arr[index] = '6'
              break
            case '宽带':
              arr[index] = '7'
              break
            case '微波炉':
              arr[index] = '8'
              break
            case '天然气':
              arr[index] = '9'
              break
            case '床':
              arr[index] = '10'
              break
            case '桌椅':
              arr[index] = '11'
              break
            case '衣柜':
              arr[index] = '12'
              break
            case '空调':
              arr[index] = '13'
              break
          }
        })
        this.publishForm.devicesId = arr.join('|')

        let cha = this.publishForm.characteristicsId
        cha.forEach((item, index) => {
          switch (item) {
            case '集中供暖':
              cha[index] = '0'
              break
            case '随时看房':
              cha[index] = '1'
              break
            case '精装':
              cha[index] = '2'
              break
            case '独立卫生间':
              cha[index] = '3'
              break
            case '双卫生间':
              cha[index] = '4'
              break
            case '押一付一':
              cha[index] = '5'
              break
            case '独立阳台':
              cha[index] = '6'
              break
            case '月租':
              cha[index] = '7'
              break
            case '限女生':
              cha[index] = '8'
              break
            case '限男生':
              cha[index] = '9'
              break
            case '新上':
              cha[index] = '10'
              break
          }
        })
        this.publishForm.characteristicsId = cha.join('|')
        this.publishForm.picturePath = this.publishForm.picturePath.join('|')
        console.log(this.publishForm)
        // 判断用户id是否正确
        const { data: res1 } = await this.$http.get('admin/selectUserById', { params: { id: this.publishForm.userId } })
        if (res1.data === null) {
          this.publishForm.devicesId = []
          this.publishForm.characteristicsId = []
          this.resetForm()
          return this.$message.error('该用户不存在')
        }
        const { data: res } = await this.$http.post('admin/addHouse', this.qs.stringify(this.publishForm))
        if (res.code !== 200) {
          this.resetForm()
          return this.$message.error('房屋添加失败')
        }
        this.$message.success('房屋添加成功')
        this.publishForm.devicesId = []
        this.publishForm.characteristicsId = []
        this.resetForm()
      })
    },
    resetForm () {
      this.$refs.publishFormRef.resetFields()
      this.$refs.uploadfiles.clearFiles()
      this.$refs.uploadfile.clearFiles()
      this.publishForm.coverPath = ''
      this.publishForm.picturePath = []
      this.hideUpload = this.publishForm.coverPath != ''
      this.hideUpload1 = this.publishForm.picturePath.length === this.limitCount
    },
    handleSuccess (response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      this.publishForm.coverPath = response.data
    },
    handleSuccess1 (response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      this.publishForm.picturePath.push(response.data)
    },
    // 图片上传
    handleRemove () {
      this.publishForm.coverPath = ''
      this.hideUpload = this.publishForm.coverPath != ''
    },
    handleRemove1 (file) {
      const index = this.publishForm.picturePath.findIndex(item => item === file.name)
      // 移除索引对应的图片
      this.publishForm.picturePath.splice(index, 1)
      this.hideUpload1 = this.publishForm.picturePath.length === this.limitCount
    },
    handlePreview (file) {
      this.previewPath = file.url
      // 显示预览图片对话框
      this.previewVisible = true
    },
    handleChange () {
      this.hideUpload = this.publishForm.coverPath != ''
    },
    handleChange1 () {
      this.hideUpload1 = this.publishForm.picturePath.length === this.limitCount
    }
  }
}
</script>
