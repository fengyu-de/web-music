<template>
  <view>
    <view class="nav">
      <view class="item">音乐标题</view>
      <view class="item">歌手</view>
      <view class="item">专辑</view>
      <view class="item">时长</view>
    </view>
    <scroll-view class="list" scroll-y>
        <view @click="geturl(item.id,index)" class="item_box" v-for="(item,index) in list" :key="item.id">
            <view class="item">
                <i class="iconfont icon-bofang1" ></i>
                <image mode="widthFix" :src="item.al.picUrl"></image>
            </view>
            <view class="item">{{item.ar[0].name}}</view>
            <view class="item">{{item.al.name}}</view>
            <view class="item">{{item.dt |timedata}}</view>
        </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  data(){
      return{
     bgAudioMannager:null //音乐播放实例
      }
  },
  mounted() {
    console.log(this.list);
    this.bgAudioMannager=uni.getBackgroundAudioManager();
  },
  watch: {
    list(newval) {
      this.list = newval;
      console.log(this.list);
    }
  },
  methods:{
    //   获取音乐url地址事件
    async  geturl(id,index){
        let res=await  uni.request({
              url:"https://autumnfish.cn/song/url",
              data:{id}
          })
          console.log(res[1].data.data[0].url)
          this.play(res[1].data.data[0].url,index)
      },
    // 播放歌曲事件
    play(url,index){
    this.bgAudioMannager.title = `${this.list[index].al.name}`
    this. bgAudioMannager.singer = `${this.list[index].ar[0].name}`;
    this.bgAudioMannager.coverImgUrl = `${this.list[index].al.picUrl}`;
    this.bgAudioMannager.src=url
    }
  }
};
</script>

<style lang="scss">
.nav {
  margin-top: 8rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #2a5caa;
  .item {
    flex: 1;
    padding: 10rpx;
    text-align: center;
  }
}
.list{
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 235px);
    .item_box{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ccc;
       padding-bottom: 5rpx;
        .item{
            position: relative;
            flex: 1;
            text-align: center;
            color: #72777b;
            font-size: 25rpx;
        .icon-bofang1{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            color: #fff;
            font-size: 50rpx;
        }
            image{
                margin-top: 10rpx;
                width: 50%;
            }
        }
    }
}

</style>
