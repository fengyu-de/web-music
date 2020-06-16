<template>
<view>
  <view class="box">
   <view class="top">
     <view class="img">
       <image mode="widthFix" :src="toplist.coverImgUrl"></image>
     </view>
     <view class="info_box">
       <view class="desc">{{toplist.name}}</view>
       <view class="user">
         <view class="userimg">
           <image mode="widthFix" :src="userlist.avatarUrl"></image>
         </view>
         <view class="username">{{userlist.nickname}}</view>
         <view class="time">{{toplist.createTime | newtime}}</view>
       </view>
        <view class="intro">简介:{{toplist.description}}</view>
     </view>
   </view>
   <view class="bottom">
     <view class="item">
       <i class="iconfont icon-xihuan"> &nbsp;{{toplist.playCount | newplay}}</i>
     </view>
     <view class="item"  @click="gofn">
       <i class="iconfont icon-pinglun"> &nbsp;{{total}}</i>
     </view>
     <view class="item">
       <i class="iconfont icon-share"> &nbsp;分享</i>
     </view>
   </view>
  </view>
  <songList :list="trackslist"></songList>
  </view>
</template>

<script>
import songList from '@/components/songlist/index'  //歌曲列表组件
export default {
  components:{
    songList
  },
  onLoad(id) {
    console.log(id);
    this.id = id.id;
  },
  data() {
    return {
      id: "",
      toplist:{},  //歌单歌曲信息数据
      trackslist:[], //歌曲列表
      userlist:{},  //用户数据
      total:0  //评论个数
    };
  },
  mounted(){
    this.getlist() // 获取歌曲列表
    this.getCountlist() //获取评论
  },
  methods:{
    // 获取歌曲列表事件
  async  getlist(){
    let res=await  uni.request({
        url:"https://autumnfish.cn/playlist/detail",
        data:{id:this.id}
      })
      // console.log(res[1].data.playlist)
      this.toplist=res[1].data.playlist
      this.userlist=res[1].data.playlist.creator
      this.trackslist=res[1].data.playlist.tracks
      console.log(this.trackslist)
    },
    // 获取评论事件
   async getCountlist(){
     let res=await uni.request({
        url:"https://autumnfish.cn/comment/hot",
        data:{id:this.id, type: 2}
      })
      this.total=res[1].data.total
      // console.log("评论",res[1].data.total)
    },
    // 跳转到歌单评论页
    gofn(){
      console.log(this.id)
      uni.navigateTo({
        url:`/pages/remark/index?id=${this.id}`
      })
    }
  }
};
</script>

<style lang="scss">
.box{
   background-color:#fab27b;
   padding: 15rpx;
  opacity: 0.6;
  .top{
    display: flex;
    justify-content: space-between;
    .img{
      margin-right: 15rpx;
      flex: 1;
      image{
        width: 100%;
      }
    }
    .info_box{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex: 2;
      .desc{
        font-size: 30rpx;
        color: #fff;
        font-weight: 600;
      }
      .user{
        padding: 10rpx 0;
        margin-top: 40rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80rpx;
        .userimg{
          width:20%;
          image{
            border-radius: 50%;
            width: 100%;
          } 
      }
      .username{
            margin-right: 10rpx;
            font-size:25rpx;
            color: #fff;
          }
          .time{
            font-size:25rpx;
            color: #fff;
          }
        }
    }
    .intro{
  margin-top: 30rpx;
  padding-right: 45rpx;
  text-align: center;
width: 100%;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
color: #fff;
font-size: 20rpx;
    }

  }
  .bottom{
    padding: 10rpx 15rpx;
    display: flex;
    justify-content: space-between;
  }
  .item{
    padding: 15rpx;
    color: #fff;
    font-size: 60rpx;
  }
}

</style>
