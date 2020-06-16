<template>
  <view>
    <view class="title">推荐mv</view>
    <view class="list">
      <view class="item" v-for="item in list" :key="item.id" @click="gofun(item.id)">
          <view class="img">
              <view class="icon">
              <view><i class="iconfont icon-bofang1">{{item.playCount |newplay}}</i></view>
              <view><i class="iconfont icon-59">{{item.duration|timedata}}</i></view>
              </view>
              <image mode="widthFix" :src="item.cover"></image>
          </view>
          <view class="info">
              <view class="desc">{{item.artists[0].name}}</view>
              <view class="time">{{item.artists[0].alias}}</view>
              <view class="username">{{item.name}}</view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    id: Number
  },
  data() {
    return {
      list: []  //推荐mv
    };
  },
  methods: {
    // 获取推荐mv事件
    async getlist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/simi/mv",
        data: { mvid: this.id }
      });
      console.log("mv详情", res[1].data.mvs);
      this.list=res[1].data.mvs
    },
    // 跳转到mv详情页
    gofun(id){
      uni.navigateTo({
        url:`/pages/mvinfo/index?id=${id}`
      })
    }
  },
  created() {
    console.log("id", this.id);
    this.getlist();
  }
};
</script>

<style lang="scss">
.title{
    color:#fff;
    font-weight: 600;
    font-size: 40rpx;
}
.list{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10rpx;
    .item{
        margin: 10px 0;
        display:flex ;
        justify-content:flex-start;
        .img{
            width: 250rpx;
            position: relative;
            image{
                width: 100%;
            }
            .icon{
                width: 100%;
                position: absolute;
                bottom: 10rpx;
                left: 0;
                padding: 10rpx;
                display: flex;
                justify-content: space-between;
                .iconfont{
                color: #ccc;
                font-size: 18rpx;
                font-weight: 600;
                }
            }
        }
        .info{
            margin: 0 10rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: #ccc;
            font-size: 20rpx;
        }
    }
}
</style>
