<template>
  <view>
      <view class="newlist">
          <view class="item" v-for="(item,index) in list" :key="item.id">
              <view class="img">
                  <image mode="widthFix" :src="item.picUrl"></image>
                  <view class="name">
                      <view class="name2">{{item.name}}</view>
                      <view class="username">{{item.song.artists[0].name}}</view>
                  </view>
              </view>
              <view class="icon" >
                  <i  class="iconfont icon-bofang1" @click="getmusicurl(item.id,index)"></i>
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
data(){
    return{
        flag:true,
        i:-1,
         bgAudioMannager:null, //音乐播放实例
        musicurl:""
    }
},
mounted(){
      this.bgAudioMannager=uni.getBackgroundAudioManager();//音乐播放实例
},
methods:{
    // 获取音乐播放路径
   async getmusicurl(id,index){
       console.log("最新",this.list)
       this.i=index
       console.log(id)
     let res=await uni.request({
           url:"https://autumnfish.cn/song/url",
           data:{id:id}
       })
    console.log("歌曲路径",res)
    this.musicurl=res[1].data.data[0].url
    this.play(res[1].data.data[0].url,index)
    },
    play(url,index){
    this.bgAudioMannager.title=`${this.list[index].name}`
    this.bgAudioMannager.coverImgUrl = `${this.list[index].picUrl}`
    this.bgAudioMannager.singer=`${this.list[index].song.artists[0].name}`
    this.bgAudioMannager.src=`${url}`

    }
    
}
}

</script>

<style lang="scss">
.newlist{
    border-top: 2rpx solid #666;
    display: flex;
    flex-direction: column;
    .item{
        padding: 10rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
  .img{
    flex: 2;
    display: flex;
    justify-content: space-between;
    image{
        width: 100rpx;
    }
    .name{
        padding-right:25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .name2{
            font-size: 25rpx;
            color: #000;
        }
        .username{
            font-size: 20rpx;
            color: #ccc;
        }
    }
}
    }
    .icon{
        flex: 1;
        text-align: right;
    }
}
.newmv{
    .titel{
        display: flex;
        justify-content: space-between;
      .title_info{
          color: #1a2933;
          font-size: 18rpx;
      }
      .title_info2{
          color: #ccc;
          font-size: 15rpx;
      }  
    }
}
</style>
