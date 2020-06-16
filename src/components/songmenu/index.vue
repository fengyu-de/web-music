<template>
  <view>
    <view class="songmenu">
        <view class="item" v-for="item in list" :key="item.id" @click="gosonglist(item.id)">
          <i class="iconfont icon-bofang "></i>
            <image mode="widthFix" :src="item.picUrl"></image>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    index:Number
  },
  data() {
    return {
      list: [] //歌单推荐数据
    };
  },
  mounted() {
    this.getlist(); //获取歌单数据
  },
  methods: {
    // 获取推荐歌单数据
    async getlist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/personalized",
        data:{ limit: 4 }
      });
      this.list = res[1].data.result;
      console.log(res[1].data.result);
    },
    // 跳转到歌单详情页
    gosonglist(id){
      uni.navigateTo({
        url:`/pages/songlist/index?id=${id}`,
        
      })
    }
  }
};
</script>

<style lang="scss">
.songmenu {
    border-top: 1px solid #666;
    padding-top:10rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item{
    position: relative;
      padding:0 10rpx ;
      width: 50%;
  }
  .icon-bofang{
    font-size: 100rpx;
    color: #ccc;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
}

</style>
