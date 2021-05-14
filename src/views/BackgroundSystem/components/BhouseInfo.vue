<style lang="less">
.el-breadcrumb {
  padding: 30px;
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
.detail-tag {
  margin-left: 5px;
}
.detail-span {
  padding-top: 10px;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>所有房源信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="3">
            <el-button type="primary" size="mini" @click="getHouseList"
            >显示所有房屋</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="checkHouse" size="mini">
            显示待审核的房屋
          </el-button>
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
          fixed
          prop="id"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="房屋信息"
          width="200"
        ></el-table-column>
        <el-table-column label="几室" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.roomTypeId === '0'">套一</span>
            <span v-else-if="scope.row.roomTypeId === '1'">套二</span>
            <span v-else-if="scope.row.roomTypeId === '2'">套三</span>
            <span v-else>套四</span>
          </template>
        </el-table-column>
        <el-table-column label="地区" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.areaId === '0'">东苑</span>
            <span v-else-if="scope.row.areaId === '1'">南苑</span>
            <span v-else>北苑</span>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="面积" width="50"></el-table-column>
        <el-table-column prop="floorId" label="楼层" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.floorId === '0'">低楼层</span>
            <span v-else-if="scope.row.floorId === '1'">中楼层</span>
            <span v-else>高楼层</span>
          </template>
        </el-table-column>
        <el-table-column label="出租方式" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.rentTypeId === '0'">整租</span>
            <span v-else>合租</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="priceNum"
          label="价格"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="userId"
          label="联系人"
          width="80"
        ></el-table-column>
        <el-table-column label="朝向" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.orientedId === '0'">朝东</span>
            <span v-else-if="scope.row.orientedId === '1'">朝南</span>
            <span v-else-if="scope.row.orientedId === '2'">朝西</span>
            <span v-else>朝北</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="创建日期"
          width="80"
        ></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 0">下架</span>
            <span v-else-if="scope.row.state === 1">审核中</span>
            <span v-else>上架</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300px">
          <template slot-scope="scope">
            <div class="btns">
              <el-button
               type="warning"
               size="mini"
               v-if="scope.row.state===0"
                @click="showEditDialog(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                @click="houseInfo(scope.row)"
                type="primary"
                size="mini"
                >详情</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteHouse(scope.row.id)"
                >删除</el-button
              >
              <el-button round
                @click="saleHouse(scope.row)"
                type="info"
                size="mini"
                v-if="scope.row.state===0||scope.row.state===1"
              >
                审核同意</el-button
              >
              <el-button round
                @click="cancelSale(scope.row)"
                type="info"
                size="mini"
                v-if="scope.row.state===1||scope.row.state===2"
              >
                审核拒绝</el-button
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
          :page-sizes="[1, 3, 5, 8]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 查看房屋详情 -->
    <el-dialog
      title="房屋详情"
      :visible.sync="detailDialogVisible"
      width="50%"
    >
      <div class="detail-span">
        设施：<el-tag class="detail-tag" v-for="item in deviceData" :key="item" type="primary" effect="plain" >{{item}}</el-tag>
      </div >
      
      <div class="detail-span">
        特点：<el-tag class="detail-tag" v-for="item in characteristicsData" :key="item" type="danger" effect="plain" >{{item}}</el-tag>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑房屋 -->
    <el-dialog
      title="编辑房屋"
      :visible.sync="editDialogVisible"
      width="80%"
      @closed="editDialogClosed"
    >
      <el-form 
        :model="editForm" 
        :rules="editFormrules" 
        ref="editFormRef" 
        label-width="100px"
      >
        <el-form-item label="房屋标题" prop="title">
          <el-input
            placeholder="请输入房屋标题"
            v-model="editForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="areaId">
          <el-select v-model="editForm.areaId" placeholder="请选择" >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> </el-form-item
        ><el-form-item label="房屋类型" prop="roomTypeId">
          <el-select v-model="editForm.roomTypeId" placeholder="请选择">
            <el-option
              v-for="item in roomTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋楼层" prop="floorId">
          <el-select v-model="editForm.floorId" placeholder="请选择">
            <el-option
              v-for="item in floorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出租方式" prop="rentTypeId">
          <el-select v-model="editForm.rentTypeId" placeholder="请选择">
            <el-option
              v-for="item in rentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋朝向" prop="orientedId">
          <el-select v-model="editForm.orientedId" placeholder="请选择">
            <el-option
              v-for="item in orentedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备" prop="devicesId">
          <el-checkbox-group v-model="editForm.devicesId">
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
          <el-checkbox-group v-model="editForm.characteristicsId">
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
            v-model="editForm.priceNum"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHouse()">提交</el-button>
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
    this.getHouseList()
  },
  data () {
    return {
      tableData: [],
      houseInfoTable: [],
      detailDialogVisible: false,
      pageSize: 3,
      currentPage: 1,
      query: '',
      deviceData: [],
      characteristicsData: [],
      editDialogVisible: false,
      editForm: {
        title: '',
        userId: '',
        roomTypeId: '',
        floorId: '',
        rentTypeId: '',
        orientedId: '',
        coverPath: '',
        picturePath: [],
        devicesId: [],
        characteristicsId: [],
        priceNum: '',
        areaId: ''
      },
      editFormrules: {
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
      stateOptions: [
        {
          value: '0',
          label: '未上架'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '已上架'
        }
      ],
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
        }, {
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
        }, {
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
        }, {
          value: '1',
          label: '审核状态'
        },
        {
          value: '2',
          label: '上架状态'
        }],
      previewPath: '',
      // 控制预览图片对话框的显示和隐藏
      previewVisible: false,
      uploadDisabled: false,
      hideUpload: false,
      hideUpload1: false,
      limitCount: 9,

    }
  },
  methods: {
    async getHouseList () {
      const { data: res } = await this.$http.get('admin/selectAllHouse')
      if (res.code !== 200) return this.$message.error('获取房屋信息失败！')
      console.log(res);
      this.tableData = res.data
    },
    handleSizeChange (newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange (newPage) {
      this.currentPage = newPage
    },
    // 删除房屋信息
    async deleteHouse (val) {
      console.log(val);
      const confirmResult = await this.$confirm(
        '请问是否要删除该用户', '提示',
        {
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      // 没有取消就是要删除，发送请求完成删除
      const { data: res } = await this.$http.post('admin/deleteHouseById', this.qs.stringify({ id: val }))
      console.log(res);

      if (res.code !== 200) {
        return this.$message.error('删除参数数据失败')
      }
      this.$message.success('删除成功')
      this.getHouseList()
    },
    async checkHouse () {
      const { data: res } = await this.$http.get('admin/selectCheckHouse')
      if (res.code !== 200) return this.$message.error('获取房屋信息失败！')
      console.log(res);
      this.$message.success('获取房屋信息成功')
      console.log(res.data);
      this.tableData = res.data
      console.log(this.tableData);
    },
    async saleHouse (row) {
      const { data: res } = await this.$http.post('admin/saleHouse', this.qs.stringify({ id: row.id }))
      if (res.code !== 200) {
        return this.$message.error('房屋上架失败')
      }
      this.$message.success('房屋上架成功')
      this.getHouseList()
    },
    async cancelSale (row) {
      const { data: res } = await this.$http.post('admin/cancelSale', this.qs.stringify({ id: row.id }))
      if (res.code !== 200) {
        return this.$message.error('房屋下架失败')
      }
      this.$message.success('房屋下架成功')
      this.getHouseList()
    },
    async houseInfo (row) {
      this.detailDialogVisible = true
      const { data: res } = await this.$http.get('admin/selectHouseById', { params: { id: row.id } })
      if (res.code !== 200) {
        return this.$message.error('查询失败')
      }
      this.$router.push(`/housedetail/${row.id}`)
      let arr = (res.data.devicesId).split("|")
      arr.forEach((item, index) => {
        switch (item) {
          case '0':
            arr[index] = '电视';
            break;
          case '1':
            arr[index] = '冰箱';
            break;
          case '2':
            arr[index] = '洗衣机';
            break;
          case '3':
            arr[index] = '沙发';
            break;
          case '4':
            arr[index] = '热水器';
            break;
          case '5':
            arr[index] = '抽油烟机';
            break;
          case '6':
            arr[index] = '消毒柜';
            break;
          case '7':
            arr[index] = '宽带';
            break;
          case '8':
            arr[index] = '微波炉';
            break;
          case '9':
            arr[index] = '天然气';
            break;
          case '10':
            arr[index] = '床';
            break;
          case '11':
            arr[index] = '桌椅';
            break;
          case '12':
            arr[index] = '衣柜';
            break;
          case '13':
            arr[index] = '空调';
            break;
        }
      })
      this.deviceData = arr

      let cha = (res.data.characteristicsId).split("|")
      cha.forEach((item, index) => {
        switch (item) {
          case '0':
            cha[index] = '集中供暖';
            break;
          case '1':
            cha[index] = '随时看房';
            break;
          case '2':
            cha[index] = '精装';
            break;
          case '3':
            cha[index] = '独立卫生间';
            break;
          case '4':
            cha[index] = '双卫生间';
            break;
          case '5':
            cha[index] = '押一付一';
            break;
          case '6':
            cha[index] = '独立阳台';
            break;
          case '7':
            cha[index] = '月租';
            break;
          case '8':
            cha[index] = '限女生';
            break;
          case '9':
            cha[index] = '限男生';
            break;
          case '10':
            cha[index] = '新上';
            break;
        }
      })
      this.characteristicsData = cha
    },
    async showEditDialog (row) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('admin/selectHouseById', { params: { id: row.id } })
      if (res.code !== 200) {
        return this.$message.error('查询失败')
      }
      this.editForm = res.data
      this.editForm.picturePath = []
      let arr = (res.data.devicesId).split("|")
      arr.forEach((item, index) => {
        switch (item) {
          case '0':
            arr[index] = '电视';
            break;
          case '1':
            arr[index] = '冰箱';
            break;
          case '2':
            arr[index] = '洗衣机';
            break;
          case '3':
            arr[index] = '沙发';
            break;
          case '4':
            arr[index] = '热水器';
            break;
          case '5':
            arr[index] = '抽油烟机';
            break;
          case '6':
            arr[index] = '消毒柜';
            break;
          case '7':
            arr[index] = '宽带';
            break;
          case '8':
            arr[index] = '微波炉';
            break;
          case '9':
            arr[index] = '天然气';
            break;
          case '10':
            arr[index] = '床';
            break;
          case '11':
            arr[index] = '桌椅';
            break;
          case '12':
            arr[index] = '衣柜';
            break;
          case '13':
            arr[index] = '空调';
            break;
        }
      })
      this.editForm.devicesId = arr

      let cha = (res.data.characteristicsId).split("|")
      cha.forEach((item, index) => {
        switch (item) {
          case '0':
            cha[index] = '集中供暖';
            break;
          case '1':
            cha[index] = '随时看房';
            break;
          case '2':
            cha[index] = '精装';
            break;
          case '3':
            cha[index] = '独立卫生间';
            break;
          case '4':
            cha[index] = '双卫生间';
            break;
          case '5':
            cha[index] = '押一付一';
            break;
          case '6':
            cha[index] = '独立阳台';
            break;
          case '7':
            cha[index] = '月租';
            break;
          case '8':
            cha[index] = '限女生';
            break;
          case '9':
            cha[index] = '限男生';
            break;
          case '10':
            cha[index] = '新上';
            break;
        }
      })
      this.editForm.characteristicsId = cha
    },
    async editHouse () {
      switch (this.editForm.areaId) {
        case '东苑':
          this.editForm.areaId = '0'
          break;
        case '南苑':
          this.editForm.areaId = '1'
          break;
        case '北苑':
          this.editForm.areaId = '2'
          break;
      }
      switch (this.editForm.roomTypeId) {
        case '套一':
          this.editForm.roomTypeId = '0'
          break;
        case '套二':
          this.editForm.roomTypeId = '1'
          break;
        case '套三':
          this.editForm.roomTypeId = '2'
          break;
        case '套四':
          this.editForm.roomTypeId = '3'
          break;
      }
      switch (this.editForm.orientedId) {
        case '东':
          this.editForm.orientedId = '0'
          break;
        case '南':
          this.editForm.orientedId = '1'
          break;
        case '西':
          this.editForm.orientedId = '2'
          break;
        case '北':
          this.editForm.orientedId = '3'
          break;
      }
      switch (this.editForm.rentTypeId) {
        case '合租':
          this.editForm.rentTypeId = '1'
          break;
        case '整租':
          this.editForm.rentTypeId = '0'
          break;
      }
      switch (this.editForm.floorId) {
        case '低楼层':
          this.editForm.floorId = '0'
          break;
        case '中楼层':
          this.editForm.floorId = '1'
          break;
        case '高楼层':
          this.editForm.floorId = '2'
          break;
      }
      let arr = this.editForm.devicesId
      arr.forEach((item, index) => {
        switch (item) {
          case '电视':
            arr[index] = '0';
            break;
          case '冰箱':
            arr[index] = '1';
            break;
          case '洗衣机':
            arr[index] = '2';
            break;
          case '沙发':
            arr[index] = '3';
            break;
          case '热水器':
            arr[index] = '4';
            break;
          case '抽油烟机':
            arr[index] = '5';
            break;
          case '消毒柜':
            arr[index] = '6';
            break;
          case '宽带':
            arr[index] = '7';
            break;
          case '微波炉':
            arr[index] = '8';
            break;
          case '天然气':
            arr[index] = '9';
            break;
          case '床':
            arr[index] = '10';
            break;
          case '桌椅':
            arr[index] = '11';
            break;
          case '衣柜':
            arr[index] = '12';
            break;
          case '空调':
            arr[index] = '13';
            break;
        }
      })
      this.editForm.devicesId = arr.join('|')

      let cha = this.editForm.characteristicsId
      cha.forEach((item, index) => {
        switch (item) {
          case '集中供暖':
            cha[index] = '0';
            break;
          case '随时看房':
            cha[index] = '1';
            break;
          case '精装':
            cha[index] = '2';
            break;
          case '独立卫生间':
            cha[index] = '3';
            break;
          case '双卫生间':
            cha[index] = '4';
            break;
          case '押一付一':
            cha[index] = '5';
            break;
          case '独立阳台':
            cha[index] = '6';
            break;
          case '月租':
            cha[index] = '7';
            break;
          case '限女生':
            cha[index] = '8';
            break;
          case '限男生':
            cha[index] = '9';
            break;
          case '新上':
            cha[index] = '10';
            break;
        }
      })
      this.editForm.characteristicsId = cha.join('|')
      this.editForm.picturePath = this.editForm.picturePath.join('|')
      delete this.editForm.updateTime

      function urlEncode (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
          paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
          for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
          }
        }
        return paramStr;
      }
      console.log(this.editForm);
      let str = urlEncode(this.editForm).substring(1)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          this.editDialogClosed()
          return this.$message.error('必填项未填')
        }
        const { data: res } = await this.$http.post('admin/updateHouse?' + str)
        this.editForm.devicesId = []
        this.editForm.characteristicsId = []
        console.log(this.editForm);
        if (res.code !== 200) {
          console.log(res.msg);
          console.log(this.editForm);
          this.resetForm()
          this.editForm.devicesId = []
          this.editForm.characteristicsId = []
          console.log(this.editForm);
          return this.$message.error('房屋修改失败')
        }
        this.$message.success('房屋修改成功')
        this.editDialogVisible = false
        this.editForm.devicesId = []
        this.editForm.characteristicsId = []
        this.getHouseList()
        this.resetForm()
      })
    },
    resetForm () {
      this.$refs.editFormRef.resetFields()
      this.$refs.uploadfiles.clearFiles();
      this.$refs.uploadfile.clearFiles();
      this.editForm.coverPath = ''
      this.editForm.picturePath = []
      this.hideUpload = this.editForm.coverPath != '';
      this.hideUpload1 = this.editForm.picturePath.length === this.limitCount;
    },
    handleSuccess (response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      this.editForm.coverPath = response.data
    },
    handleSuccess1 (response) {
      // 当上传成功时触发执行
      // 形参response就是上传成功之后服务器返回的结果
      // 将服务器返回的临时路径保存到addForm表单的pics数组中
      this.editForm.picturePath.push(response.data)
    },
    // 图片上传
    handleRemove () {
      this.editForm.coverPath = '';
      this.hideUpload = this.editForm.coverPath != '';
    },
    handleRemove1 (file) {
      const index = this.editForm.picturePath.findIndex(item => item === file.name)
      // 移除索引对应的图片
      this.editForm.picturePath.splice(index, 1)
      this.hideUpload1 = this.editForm.picturePath.length === this.limitCount;
    },
    handlePreview (file) {
      this.previewPath = file.url
      // 显示预览图片对话框
      this.previewVisible = true
    },
    handleChange () {
      this.hideUpload = this.editForm.coverPath != '';
    },
    handleChange1 () {
      this.hideUpload1 = this.editForm.picturePath.length === this.limitCount;
    },
    editDialogClosed () {
      this.resetForm()
    }
  },
}

</script>
