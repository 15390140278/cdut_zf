<style lang="less">
.section {
  position: relative;
  margin: 10px auto;
  padding: 0 15px;
  box-sizing: border-box;
  .house-detail {
    width: 1140px;
    height: auto;
  }
  .house-detail ul li {
    width: 100%;
    height: 180px;
    position: relative;
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
  }
  .show-image {
    position: relative;
    float: left;
  }
  .show-details {
    width: 628px !important;
    float: left;
    margin-left: 31px;
    margin-top: -5px;
  }
  .house-title {
    position: relative;
    margin-top: -2px;
    width: auto;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .house-title a {
    float: left;
    max-width: 512px;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    text-decoration: none;
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }
  .house-about,
  .house-address {
    font-size: 14px;
    color: #1b1b1b !important;
    margin-top: 28px;
  }
  .flag-line {
    margin: 0px 10px;
  }
  .show-price {
    position: absolute;
    top: 42px;
    right: 0;
    float: right;
    color: #409eff;
    text-align: right;
  }
  .show-price .sale-price {
    position: relative;
    top: 2px;
    font-size: 40px;
    font-weight: bold;
    font-family: 'dinot-bold';
  }
  .show-price .sale-unit {
    margin-left: 1px;
    font-size: 14px;
  }
  .date {
    margin-top: 40px;
  }
}
</style>
<template>
  <div class="section">
    <div class="house_detail">
      <ul>
        <li>
          <a href="javascript:;" class="show-image">
            <img :src="`http://localhost:8080/img/${houseItem.coverPath}`" width="240px" height="180px" />
          </a>
          <div class="show-details">
            <p class="house-title">
              <a href="javascript:;" @click="$router.push(`housedetail/${houseItem.id}`)">{{houseItem.title || '无标题'}}</a>
            </p>
            <p class="house-about">
              <i class="el-icon-s-home" />
              <span>{{houseItem.roomTypeId}}</span>
              <span class="flag-line">|</span>
              <span>
                {{houseItem.size}} m
                <sup>2</sup>
              </span>
              <span class="flag-line">|</span>
              <!-- <span>普通装修</span> -->
              <!-- <span class="flag-line">|</span> -->
              <span>{{houseItem.floorId}}</span>
              <span class="flag-line">|</span>
              <span>{{houseItem.rentTypeId}}</span>
            </p>
            <p class="house-address clearfix">
              <i class="el-icon-location-information" />
              <span class="whole-line">
                <span>{{houseItem.areaId}}</span>
              </span>
            </p>
            <div class="show-price">
              <span class="sale-price">{{houseItem.priceNum}}</span>
              <span class="sale-unit">元/月</span>
            </div>
            <div class="date">
              <span>发布时间：</span>
              <span>{{houseItem.updateTime}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    houseItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  activated() {},
  methods: {}
}
</script>
