<template>
  <view class="box">
    <InPut @fn="fun" />
    <view class="keyword" v-show="val.length==0?false:true">
      <text>{{val}}</text>
      为你找到{{total}}个结果
    </view>
    <!-- 单曲 -->
    <view class="nav">
      <view :class="['song',{'color':index==1}]" @click="index=1">单曲</view>
      <view :class="['songlist',{'color':index==1000}]" @click="index=1000">歌单</view>
      <view :class="['mv',{'color':index==1004}]" @click="index=1004">MV</view>
    </view>
    <scroll-view scroll-y class="scroll" @scrolltolower="func">
      <view class="list" v-if="index==1">
        <view class="nav">
          <view class="index"></view>
          <view class="musictitle">音乐标题</view>
          <view class="singer">歌手</view>
          <view class="album">专辑</view>
          <view class="time">时长</view>
        </view>

        <view class="list2" v-show="index==1">
          <view
            @click="geturl(item.id,index2)"
            class="item2"
            v-for="(item,index2) in songlist"
            :key="item.id"
          >
            <view class="index2">{{index2+1}}</view>
            <view class="musictitle2">
              <i @click="gofn(item.mvid)" class="iconfont icon-bofang" v-if="item.mvid!=0"></i>
              <text>{{item.name}}</text>
            </view>
            <view class="singer2">{{item.artists[0].name}}</view>
            <view class="album2">{{item.name}}</view>
            <view class="time2">{{item.duration | timedata}}</view>
          </view>
        </view>
      </view>
      <!-- 歌单 -->
      <view class="play_box" v-if="index==1000">
        <view class="item" v-for="item in playlist" :key="item.id">
          <view class="img">
            <i class="iconfont icon-bofang1" @click="gofn(item.id)"></i>
          <image mode="widthFix" :src="item.coverImgUrl"></image>
          </view>
          <view class="text">{{item.name}}</view>
        </view>
      </view>
      <!-- mv -->
      <view class="mv_box" v-if="index==1004">
        <view class="item" v-for="item in mvlist" :key="item.id">
          <view class="img">
            <i class="iconfont icon-bofang1" @click="gomvfn(item.id)"></i>
          <image mode="widthFix" :src="item.cover"></image>
          </view>
          <view class="text">{{item.name}}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import InPut from "@/components/serchinput/index";
export default {
  data() {
    return {
      val: "", //搜索的关键字
      page: 1, //页码
      limit: 10, //条数
      songlist: [], //歌曲数据
      index: 1, //导航的样式
      total: 0,
      bgAudioMannager: null, //音乐播放实例
      mvlist: [], //mv数据
      playlist: [] //歌单数据
    };
  },
  components: {
    InPut
  },
  mounted() {
    this.bgAudioMannager = uni.getBackgroundAudioManager();
  },
  methods: {
    // 要让子组件触发的事件
    fun(val) {
      console.log(val);
      this.index=1
      if (this.val != val) {
        this.songlist = [];
        this.playlist=[]
        this.mvlist=[]
      }
      this.val = val;
      this.getsonglist();
    },
    // 获取搜索结果数据
    async getsonglist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/search",
        data: {
          keywords: this.val,
          type: this.index,
          offset: (this.page - 1) * this.limit,
          limit: this.limit
        }
      });
      if(res[1].data.result.songs.length==0){
           uni.showToast({
             title:"暂时没有数据了"
           })
           return
           }
      this.songlist = [...this.songlist, ...res[1].data.result.songs];
      this.total = res[1].data.result.songCount;
      console.log(res[1].data.result.songs);
    },
    // 跳转到歌单详情事件
    gofn(id) {
      uni.navigateTo({
        url: `/pages/songlist/index?id=${id}`
      });
    },
    // 滚动事件
    func() {
      this.page++;
      if(this.index==1){
        this.getsonglist();
      }else if(this.index==1000){
        this.getplaylist()
      }else{
        this.getmvslist()
      }

    },
    // 获取歌曲路径事件
    async geturl(id, index) {
      let res = await uni.request({
        url: "https://autumnfish.cn/song/url",
        data: { id }
      });
      
      console.log(res[1].data.data[0].url);
      this.play(res[1].data.data[0].url, index);
    },
    // 播放音乐事件
    play(url, index) {
      this.bgAudioMannager.title = `${this.songlist[index].name}`;
      this.bgAudioMannager.singer = `${this.songlist[index].artists[0].name}`;
      this.bgAudioMannager.coverImgUrl = `${this.songlist[index].artists[0].img1v1Url}`;
      this.bgAudioMannager.src = url;
    },
    // 歌单获取歌单事件
   async getplaylist(){
      let res = await uni.request({
          url: "https://autumnfish.cn/search",
          data: {
            keywords: this.val,
            type: this.index,
            offset: (this.page - 1) * this.limit,
            limit: this.limit
          }
        });
        if(res[1].data.result.playlistCount.length==0){
           uni.showToast({
             title:"暂时没有数据了"
           })
           return
           }
        console.log("歌单", res);
        this.total=res[1].data.result.playlistCount
        this.playlist = [...this.playlist,...res[1].data.result.playlists]
    },
    // mv获取事件
   async getmvslist(){
      let res = await uni.request({
          url: "https://autumnfish.cn/search",
          data: {
            keywords: this.val,
            type: this.index,
            offset: (this.page - 1) * this.limit,
            limit: this.limit
          }
        });
        if(res[1].data.result.mvs.length==0){
           uni.showToast({
             title:"暂时没有数据了"
           })
           return
           }
        console.log("mv", res);
        this.mvlist=[...this.mvlist,res[1].data.result.mvs]
       this.$nextTick(()=>{
          this.mvlist = [...this.mvlist,...res[1].data.result.mvs]
          
        })
        this.total=res[1].data.result.mvCount
    },
    // 跳转到mv详情页
    gomvfn(id){
      uni.navigateTo({
        url:`/pages/mvinfo/index?id=${id}`
      })
    }
  },
  watch: {
     index(newval) {
      console.log(newval);
      this.index = newval;
      if (newval == 1000&&this.val!='') {
       this.getplaylist()
        // mv
      } else if(newval == 1004&&this.val!='') {
        console.log("ee")
       setTimeout(()=>{
         this.getmvslist()
       },0)
        // 单曲
      } else if(newval == 1&&this.val!='') {
        this.getsonglist()
      }else{
        uni.showToast({
          title:"请输入参数"
        })
      }
    }
  }
};
</script>

<style lang="scss">
.box {
  padding: 10rpx;
}
.nav {
  display: flex;
  justify-content: flex-start;
  .song,
  .songlist,
  .mv {
    padding: 10rpx 10rpx;
    color: #000;
    font-size: 40rpx;
    font-weight: 600;
  }
}
.list {
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ccc;
    font-size: 25rpx;

    .musictitle {
      flex: 2;
      text-align: center;
    }
    .singer {
      text-align: center;
      flex: 1;
    }
    .album {
      text-align: center;
      flex: 3;
    }
    .time {
      text-align: center;
      flex: 1;
    }
  }
  .list2 {
    .item2 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 30rpx;
      color: #000;
      padding: 30rpx 0;
      &:nth-of-type(odd) {
        background-color: #918597;
      }
      .index2 {
        width: 50rpx;
      }
      .musictitle2 {
        text-align: center;
        flex: 2;
        color: orangered;
        display: flex;
        justify-content: space-between;
        align-items: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text {
          flex: 1;
          color: #000;
          font-size: 30rpx;
        }
        .iconfont {
          display: inline-block;
          flex: 1;
        }
      }
      .singer2 {
        text-align: center;
        flex: 1;
      }
      .album2 {
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        flex: 3;
      }
      .time2 {
        text-align: center;
        flex: 1;
      }
    }
  }
}

.keyword {
  color: #918597;
  font-size: 25rpx;
  text {
    font-size: 30rpx;
    color: #ed1941;
    font-weight: 600;
  }
}
.color {
  border-bottom: 1px solid #ed1941;
}
.scroll {
  height: calc(100vh - 146px);
}
// 歌单
.play_box{
  padding-top:10rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item{
    width: 49%;
    .img{
      position: relative;
      width: 100%;
      .iconfont{
        font-size: 100rpx;
        color:#fff;
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform: translate(-50%,50%);
      }
      image{
      width: 100%;
    }
    }
    
    .text{
      color: #ccc;
      font-size: 20rpx;
    }
  }
}
// 歌单
.mv_box{
  padding-top:10rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item{
    width: 49%;
    .img{
      position: relative;
      width: 100%;
      .iconfont{
        font-size: 100rpx;
        color:#fff;
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform: translate(-50%,50%);
      }
      image{
      width: 100%;
    }
    }
    
    .text{
      color: #ccc;
      font-size: 20rpx;
    }
  }
}
</style>
