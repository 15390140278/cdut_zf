<style lang="less" scoped>
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
.el-select {
  width: 100%;
}
</style>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
          width="120"
        ></el-table-column>
        <el-table-column
          label="几室"
          width="50"
          prop="roomTypeId"
        ></el-table-column>
        <el-table-column
          prop="areaId"
          label="地区"
          width="50"
        ></el-table-column>
        <el-table-column prop="size" label="面积" width="50"></el-table-column>
        <el-table-column
          prop="floorId"
          label="楼层"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="rentTypeId"
          label="出租方式"
          width="80"
        ></el-table-column>
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
        <el-table-column
          prop="rentTypeId"
          label="朝向"
          width="80"
        ></el-table-column>
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
                @click="houseInfo(scope.row)"
                type="primary"
                size="mini"
                >详情</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="removeCollection(scope.row.id)"
                >取消收藏</el-button
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
  </div>
</template>
<script>
import { getItem } from '@/utils/storage.js'
export default {
  created () {
    this.getHouseList()
  },
  data () {
    return {
      collectData: [],
      tableData: [],
      houseInfoTable: [],
      pageSize: 3,
      currentPage: 1,
      query: '',
    }
  },
  methods: {
    // 获取
    async getHouseList () {
      const { data: res } = await this.$http.get(`collect/getUserCollects?userId=${getItem('ZF_USER').id}`)
      if (res.code !== 200) return this.$message.error('获取房屋信息失败！')
      console.log(res)
      this.$message.success('获取房屋信息成功')
      this.tableData = res.data.houses
      this.collectData = res.data.collects
    },
    handleSizeChange (newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange (newPage) {
      this.currentPage = newPage
    },
    async removeCollection (val) {
      let [idArr] = this.collectData.filter(item => item.houseId === val)
      console.log(idArr.id);
      const confirmResult = await this.$confirm('请问是否要取消收藏', '提示', {
        confirmButtonText: '确认取消',
        cancelButtonText: '返回',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return
      }
      // 没有取消就是要删除，发送请求完成删除
      const { data: res } = await this.$http.get(`collect/removeCollect?id=${idArr.id}`)
      if (res.code !== 200) {
        return this.$message.error('取消收藏失败')
      }
      this.getHouseList()
    }
  }
}
</script>
