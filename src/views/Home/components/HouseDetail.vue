<style lang="less" scoped>
.root {
  padding-top: 50px;
}
.header {
  margin: 50px;
  .title {
    font-size: 30px;
  }
  span {
    color: #aebfd5;
  }
}
.swiper /deep/ .el-breadcrumb {
  padding-left: 50px;
  .el-breadcrumb__inner {
    font-size: 15px;
  }
  .el-breadcrumb__separator {
    font-size: 15px;
  }
}

.house-info {
  display: flex;
  padding: 0 100px;
  margin-top: 100px;
  .house-image {
    width: 660px;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .show-price {
    width: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 50px;
    border-bottom: 1px solid #000;
    .price {
      font-size: 40px;
      font-weight: bold;
      color: #ffc601;
      padding-bottom: 5px;
    }
    .unit {
      margin-left: 1px;
      font-size: 14px;
      color: #ffc601;
    }
    .type {
      color: #c9c9c9;
      font-size: 14px;
      padding-right: 10px;
    }
  }
  .show-info {
    margin-left: 50px;
    margin-top: 20px;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    span {
      margin-left: 10px;
    }
  }
  .show-other {
    display: flex;
    margin-left: 50px;
    justify-content: space-around;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    .item {
      text-align: center;
    }
    p {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      padding-bottom: 7px;
    }
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .dosomething {
    margin-left: 50px;
    margin-top: 50px;
  }
}
.room-options .el-breadcrumb__inner {
  font-size: 30px;
}
.room-options-item {
  width: 740px;
  height: 241px;
  .item {
    float: left;
    display: flex;
    width: 80px;
    height: 117px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 100%;
      height: 100px;
    }
    span {
      color: #d9d9d9;
    }
  }
}

.el-carousel {
  padding: 0 100px;
}

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

.tags {
  margin: 20px;
  margin-left: 50px;
  .el-tag {
    margin: 5px;
  }
}
.desc p {
  text-align: center;
}

.comments {
  padding: 0 50px;
}
.addcomment {
  padding: 0 50px;
}
.toLogin {
  height: 60px;
  padding: 0 50px;
  span {
    color: turquoise;
  }
}
</style>
<template>
  <div class="root">
    <div class="header">
      <div class="title">{{houseDetail.title || '无标题'}}</div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>房屋详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="swiper">
      <el-carousel height="600px">
        <el-carousel-item v-for="item in banner" :key="item">
          <img :src="`http://localhost:8080/img/${item}`" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="house-info">
      <div class="house-image">
        <img :src="`http://localhost:8080/img/${houseDetail.coverPath}`" alt />
      </div>
      <div class="house-desc">
        <div class="show-price">
          <span class="price">{{houseDetail.priceNum}}</span>
          <span class="unit">元/月</span>
          <span class="type">{{houseDetail.rentTypeId}}</span>
        </div>
        <div class="show-info">
          <div>
            小区名称：
            <span>{{houseDetail.areaId}}</span>
          </div>
          <div>
            联系电话：
            <span>13022500400</span>
          </div>
        </div>
        <div class="show-other">
          <div class="item">
            <p>{{houseDetail.roomTypeId}}</p>
            <span>规模</span>
          </div>
          <div class="item">
            <p>{{houseDetail.size}}平米</p>
            <span>建筑面积</span>
          </div>
          <div class="item">
            <p>{{houseDetail.orientedId}}</p>
            <span>朝向</span>
          </div>
          <div class="item">
            <p>{{houseDetail.floorId}}</p>
            <span>楼层</span>
          </div>
        </div>
        <div class="dosomething">
          <el-button type="primary">现在预定</el-button>
          <el-button :type="isCollected ? 'warning' : 'primary'" @click="isCollected = !isCollected">{{isCollected ? '取消收藏' : '收藏'}}</el-button>
        </div>
      </div>
    </div>
    <div class="tags">
      <el-tag v-for="item in tag" :key="item">{{tagMap[item]}}</el-tag>
    </div>
    <div class="room-options">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>详细描述</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="desc">
        <p>{{houseDetail.detail}}</p>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>房屋配置</el-breadcrumb-item>
      </el-breadcrumb>
      <ul class="room-options-item">
        <li class="item" v-for="item in device" :key="item">
          <!-- <img src="../../../assets/fonts/床.svg" alt /> -->
          <img :src="require('@/assets/fonts/'+deviceMap[item]+'.svg')" alt />
          <span>{{deviceMap[item]}}</span>
        </li>
      </ul>
      <div class="comments">
        <span>评论列表</span>
        <template v-for="item in comments">
          <CommentItem :key="item.id" :comment="item"></CommentItem>
        </template>
      </div>
      <div class="addcomment" v-if="user">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="comment"></el-input>
        <el-button @click="addComment">发表评论</el-button>
      </div>
      <div class="toLogin" v-else>
        <p>
          <span @click="$router.push('login')">登录</span>
          可以发表评论
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import houseDetailRequest from '../../../api/house/houseDetailRequest'
import getCommentsRequest from '../../../api/house/getComments'
import addCommentRequest from '../../../api/house/addComment'
import CommentItem from './CommentItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    CommentItem
  },
  data() {
    return {
      isCollected: false,
      // user: this.$store.state.user,有bug
      id: this.$route.params.id,
      banner: [],
      houseDetail: {},
      deviceMap: {
        0: '电视',
        1: '冰箱',
        2: '洗衣机',
        3: '沙发',
        4: '热水器',
        5: '抽油烟机',
        6: '消毒柜',
        7: '宽带',
        8: '微波炉',
        9: '天然气',
        10: '床',
        11: '桌椅',
        12: '衣柜',
        13: '空调'
      },
      device: [],
      tagMap: {
        0: '集中供暖',
        1: '随时看房',
        2: '精装',
        3: '独立卫生间',
        4: '双卫生间',
        5: '押一付一',
        6: '独立阳台',
        7: '月租',
        8: '限女生',
        9: '限男生',
        10: '天然气'
      },
      tag: [],
      comments: [],
      cusers: [],
      comment: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    async getHouseDetail() {
      const { data: res } = await houseDetailRequest({
        id: this.id
      })
      this.houseDetail = res.data
      let deviceStr = res.data.devicesId
      this.device = deviceStr.split('|')
      this.banner = res.data.picturePath.split('|')
      this.tag = res.data.characteristicsId.split('|')
    },
    async getComment() {
      const { data: res } = await getCommentsRequest({
        houseId: this.id,
        page: 1,
        limit: 5
      })
      this.comments = res.data.comments
      this.cusers = res.data.users
    },
    async addComment() {
      const { data: res } = await addCommentRequest({
        userId: this.user.id,
        houseId: this.id,
        content: this.comment
      })
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.getComment()
        this.comment = ''
      }
    }
  },
  created() {
    this.getHouseDetail()
    this.getComment()
  },
  mounted() {
    this.$bus.$on('refresh', _ => {
      this.getComment()
    })
  }
}
</script>

