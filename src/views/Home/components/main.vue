<style lang="less">
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
}

.list {
  display: flex;
  margin: 40px auto;
  padding: 0 40px;
  flex-direction: column;
  .title {
    width: 115px;
    height: 50px;
    background-color: #409eff;
    border-bottom: 1px solid #fff;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    h2 {
      font-weight: 400;
      span {
        color: #409eff;
        margin: 0 5px;
      }
    }
  }
}

.el-tab-pane {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
<template>
  <div class="main">
    <el-carousel height="680px">
      <el-carousel-item v-for="item in banner" :key="item">
        <img :src="require('@/assets/img/'+item+'.jpg')" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="list">
      <div class="title">全部房源</div>
      <h2>
        共找到
        <span>{{total}}</span>套出租房源
      </h2>
      <el-tabs v-model="activeName">
        <span>地区</span>
        <el-select v-model="areaId" placeholder="地区">
          <el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span>朝向</span>
        <el-select v-model="orientedId" placeholder="朝向">
          <el-option v-for="item in oriented" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span>房屋类型</span>
        <el-select v-model="roomTypeId" placeholder="房屋类型">
          <el-option v-for="item in roomType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span>出租方式</span>
        <el-select v-model="rentTypeId" placeholder="出租方式">
          <el-option v-for="item in rentType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span>楼层</span>
        <el-select v-model="floorId" placeholder="楼层">
          <el-option v-for="item in floor" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-tab-pane label="默认排序" name="default">
          <house-item :houseItem="item" v-for="(item, index) in house" :key="index"></house-item>
        </el-tab-pane>
        <el-tab-pane label="价格升序" name="asc">
          <house-item :houseItem="item" v-for="(item, index) in house" :key="index"></house-item>
        </el-tab-pane>
        <el-tab-pane label="价格降序" name="desc">
          <house-item :houseItem="item" v-for="(item, index) in house" :key="index"></house-item>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
import HouseItem from './HouseItem'
// 默认查询
import selectHouseDefaultRequest from '../../../api/house/selectHouseDefaultRequest'
// 价格升序
import selectHouseAsc from '../../../api/house/selectHouseByPriceAscRequest'
// 价格降序
import selectHouseDesc from '../../../api/house/selectHouseByPriceDescRequest'

export default {
  components: {
    HouseItem
  },
  data() {
    return {
      banner: ['banner1', 'banner2', 'banner3', 'banner4'],
      activeName: 'default',
      area: [
        {
          value: null,
          label: '不限'
        },
        {
          value: 0,
          label: '东苑'
        },
        {
          value: 1,
          label: '南苑'
        },
        {
          value: 2,
          label: '北苑'
        }
      ],
      oriented: [
        {
          value: null,
          label: '不限'
        },
        {
          value: 0,
          label: '东'
        },
        {
          value: 1,
          label: '南'
        },
        {
          value: 2,
          label: '西'
        },
        {
          value: 3,
          label: '北'
        }
      ],
      roomType: [
        {
          value: null,
          label: '不限'
        },
        {
          value: 0,
          label: '套一'
        },
        {
          value: 1,
          label: '套二'
        },
        {
          value: 2,
          label: '套三'
        },
        {
          value: 3,
          label: '套四'
        }
      ],
      rentType: [
        {
          value: null,
          label: '不限'
        },
        {
          value: 0,
          label: '整租'
        },
        {
          value: 1,
          label: '合租'
        }
      ],
      floor: [
        {
          value: null,
          label: '不限'
        },
        {
          value: 0,
          label: '低楼层'
        },
        {
          value: 1,
          label: '中楼层'
        },
        {
          value: 2,
          label: '高楼层'
        }
      ],

      areaId: null,
      orientedId: null,
      roomTypeId: null,
      rentTypeId: null,
      floorId: null,

      params: {
        areaId: this.areaId,
        orientedId: this.orientedId,
        roomTypeId: this.roomTypeId,
        rentTypeId: this.rentTypeId,
        floorId: this.floorId
      },

      total: 0,
      page: 1,
      limit: 200,
      house: []
    }
  },
  activated() {},
  async created() {
    const { data: res } = await selectHouseDefaultRequest()
    console.log(res.data)
    this.total = res.data.length
    this.house = res.data
  },
  watch: {
    async areaId(val) {
      this.params.areaId = val
      const { data: res } = await selectHouseDefaultRequest(this.params)
      console.log(res.data)
      this.total = res.data.length
      this.house = res.data
    },
    async orientedId(val) {
      this.params.orientedId = val

      const { data: res } = await selectHouseDefaultRequest(this.params)
      console.log(res.data)
      this.total = res.data.length
      this.house = res.data
    },
    async roomTypeId(val) {
      this.params.roomTypeId = val

      const { data: res } = await selectHouseDefaultRequest(this.params)
      console.log(res.data)
      this.total = res.data.length
      this.house = res.data
    },
    async rentTypeId(val) {
      this.params.rentTypeId = val

      const { data: res } = await selectHouseDefaultRequest(this.params)
      console.log(res.data)
      this.total = res.data.length
      this.house = res.data
    },
    async floorId(val) {
      this.params.floorId = val

      const { data: res } = await selectHouseDefaultRequest(this.params)
      console.log(res.data)
      this.total = res.data.length
      this.house = res.data
    },
    async activeName(val) {
      if (val === 'default') {
        const { data: res } = await selectHouseDefaultRequest()
        console.log(res.data)
        this.total = res.data.length
        this.house = res.data
      } else if (val === 'asc') {
        const { data: res } = await selectHouseAsc(this.params)
        console.log(res)
        this.total = res.data.length
        this.house = res.data
      } else if (val === 'desc') {
        const { data: res } = await selectHouseDesc(this.params)
        console.log(res)
        this.total = res.data.length
        this.house = res.data
      }
    }
  },
  methods: {}
}
</script>
