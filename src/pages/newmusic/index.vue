<template>
  <view>
    <view class="classify">
      <view :class="{'color':tag=='0'}" @click="fn('0')">全部</view>
      <view :class="{'color':tag=='7'}" @click="fn('7')">华语</view>
      <view :class="{'color':tag=='96'}" @click="fn('96')">欧美</view>
      <view :class="{'color':tag=='8'}" @click="fn('8')">日本</view>
      <view :class="{'color':tag=='16'}" @click="fn('16')">韩国</view>
    </view>
    <view class="list">
      <view class="title">
        <view class="musicname">音乐名称</view>
        <view class="name">歌手</view>
        <view class="album">专辑</view>
        <view class="time">时长</view>
      </view>
      <view class="item" v-for="(item,index) in list" :key="item.id">
        <text class="index" style="margin-right:20rpx;color:#d93a49;font-size:30rpx;width:10rpx;">{{index+1}}</text>
        <view class="musictitle">
          <i class="iconfont icon-bofang1" @click="getmusicurl(item.id,index)"></i>
            <image mode="widthFix" :src="item.album.picUrl"></image> 
        </view>
        <view class="name">{{item.album.artists[0].name}}</view>
        <view class="album">{{item.album.name}}</view>
        <view class="time">{{item.duration | timedata}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      innerAudioContext:null,  //播放视频实例
      tag: "0", //选中的分类
      flag:true  //判断是否处于播放
    };
  },
  mounted() {
    this.getlist(); //获取分类歌曲数据
    this.innerAudioContext=uni.createInnerAudioContext()
  },
  methods: {
    //   获取分类歌曲数据事件
    async getlist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/top/song",
        data: {tag:this.tag}
      });
      console.log(res[1].data.data);
      this.list=res[1].data.data
    },
    fn(i) {
        console.log(i)
      this.tag = i;
      this.getlist();
    },
    // 获取音乐播放地址事件
   async getmusicurl(id,index){
    let res=await uni.request({
        url:'https://autumnfish.cn/song/url',
        data:{id}
      })
      console.log(res[1].data.data[0].url)
      this.play(res[1].data.data[0].url,index)
    },
    play(url,index){
      this.flag=!this.flag
      if(!this.innerAudioContext.paused){
        // 暂停播放
       this.innerAudioContext.stop()
        uni.showToast({
          title:`当前歌曲已暂停`
        })
        return
      }
      uni.showToast({
          title:`播放:${this.list[index].name}`
        })
      this.innerAudioContext.src =url
      this.innerAudioContext.autoplay = true;
     
    }
  }
  //   watch:{
  //     // 监听分类改变
  //       tag(){
  //           this.getlist()
  //       }
  //   }
};
</script>

<style lang="scss">
.classify {
  display: flex;
  justify-content: center;
  margin-bottom: 15rpx;
  view {
    padding: 10rpx;
  }
}
.list {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  .title {
    flex: 1;
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #ff6a6a;
  }
  .item {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10rpx;
    margin: 10rpx 0;
    view{
        flex: 1;
        margin: 0 10rpx;
        &:nth-of-type(1){
          width: 10rpx;
        }
    }
    .musictitle{
      position: relative;
      i{
        position: absolute;
        left:25%;
        top:50%;
        transform: translateY(-50%);
      }
        height: 100%;
        image{
            width: 100%;
            height:100%;
        }
    }
    .name{
        text-align: center;
    }
    .album{
        text-align: center;
    }
    .time{
     text-align: center;    
    }
  }
}
.color {
  color: palevioletred;
  border-bottom: 1px solid palevioletred;
}
.icon-bofang1{
  font-size: 50rpx;
  color: #fff;
}
</style>
