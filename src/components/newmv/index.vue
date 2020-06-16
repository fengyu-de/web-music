<template>
  <view>
      <view class="mv_box">
          <view class="item" v-for="item in list" :key="item.id">
          <view class="img" @click="gofn(item.id)">
            <i class="iconfont icon-bofang " ></i>
              <image mode="widthFix" :src="item.picUrl"></image>
              <view class="mvinfo">
                  <view class="time">{{item.duration | timedata}}</view>
                  <view class="play">
                      <i class="iconfont icon-icon_huabanfuben"> {{item.playCount | newplay}}</i>
                  </view>
              </view>
          </view>
          <view class="mvtitle">
             <text style="color:#d2553d"> {{item.artistName}}</text>
              <text style="color:#666">{{item.copywriter}}</text>
          </view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    props:{
        list:Array
    },
    methods:{
      // 跳转到mv详情页页面
      gofn(id){
        uni.navigateTo({
          url:`/pages/mvinfo/index?id=${id}`
        })
      }
    }
};
</script>

<style lang="scss">
.mv_box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  .item{
      width: 48%;
    .img{
        position: relative;
        .icon-bofang{
          font-size: 100rpx;
    color: #ccc;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);

        }
      .mvinfo{
          width: 100%;
          position: absolute;
          bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            padding: 0 10rpx;
          .time{
              font-size: 29rpx;
              color: #ccc;
              font-weight: 600;
          }
          .play{
              font-size: 18rpx;
              color: #ccc;
              font-weight: 600;
          }
      }  
    }  
  }
  .mvtitle{
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
  }  
}
</style>
