<template>
  <view class="box">
    <view class="video_box">
      <video id="myid" :src="url" autoplay :muted="flag" :show-mute-btn="flag2"></video>
    </view>
    <view class="info_box">
      <view :class="['info',{'css':index==0}]" @click="fun(0)">详情</view>
      <view :class="['count',{'css':index==1}]" @click="fun(1)">评论{{total}}</view>
    </view>
    <!-- 详情模块 -->
    <view  v-if="index==0">
    <view class="box_info" >
      <view class="title">{{infolist.name}}</view>
      <view class="username">
        <i class="iconfont icon-yonghu">{{infolist.artistName}}</i>
      </view>
      <view class="play">
        <text>{{infolist.playCount | newplay}}次播放</text>
        <text>{{infolist.publishTime}}</text>
      </view>
      <view class="info">
        <view :class="{'text':isshow}">介绍:{{infolist.desc}}</view>
        <i class="iconfont icon-arrowBottom-fill" @click="show"></i>
      </view>
    </view>
    <Recommendmv :id="id"></Recommendmv>
    </view>
    <!-- 热门评论模块 -->
   
    <view class="comments" v-if="index==1">
       <scroll-view scroll-y class="bigbox" @scrolltolower="fn">
      <view class="title">热门评论</view>
      <view class="totitle" v-show="hostList.length==0">
          暂时没有热评~O(∩_∩)O~
      </view>
      <!-- 热门评论列表 -->
      <view class="hostlist" v-show="hostList.length!=0">
        <view class="item" v-for="item in hostList" :key="item.id">
            <view class="info"> 
                <view class="img">
                <image mode="widthFix" :src="item.user.avatarUrl"></image>
                </view>
                <view class="userinfo">
                <view class="name">{{item.user.nickname}}</view>
                <view class="time">{{item.time | newtime}}</view>
                <view class="content">{{item.content}}</view>
                </view>
                <view class="start">
                    <i class="iconfont icon-xihuan">{{item.likedCount | newplay}}</i>
                </view>
            </view>
            <!-- 热门回复模块 -->
            <view class="beReplied" v-if="item.beReplied.length!=0">
                <view class="item" v-for="item2 in item.beReplied" :key="item2.commentId">
                <view class="img">
                <image mode="widthFix" :src="item2.user.avatarUrl"></image>
                </view>
                <view class="username">
                   <view class="name">{{item2.user.nickname}}：</view> 
                    <view class="content">{{item2.content}}</view>
                </view>
                </view>
            </view>
        </view>
      </view>
      <!-- 最新评论 -->
      <view class="newcomments">
          <view class="title">最新评论</view>
          <!-- 最新评论列表 --> 
          <view class="hostlist" v-show="comments.length!=0">
        <view class="item" v-for="item in comments" :key="item.id">
            <view class="info"> 
                <view class="img">
                <image mode="widthFix" :src="item.user.avatarUrl"></image>
                </view>
                <view class="userinfo">
                <view class="name">{{item.user.nickname}}</view>
                <view class="time">{{item.time | newtime}}</view>
                <view class="content">{{item.content}}</view>
                </view>
                <view class="start">
                    <i class="iconfont icon-xihuan">{{item.likedCount | newplay}}</i>
                </view>
            </view>
            <!-- 最新回复模块 -->
            <view class="beReplied" v-if="item.beReplied.length!=0">
                <view class="item" v-for="item2 in item.beReplied" :key="item2.commentId">
                <view class="img">
                <image mode="widthFix" :src="item2.user.avatarUrl"></image>
                </view>
                <view class="username">
                   <view class="name">{{item2.user.nickname}}：</view> 
                    <view class="content">{{item2.content}}</view>
                </view>
                </view>
            </view>
        </view>
      </view>
      </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import  Recommendmv from '@/components/tuijianmv/index'  //推荐mv组件
export default {
  onLoad(id) {
    console.log(id);
    this.id = id.id;
  },
  components:{
    Recommendmv
  },
  data() {
    return {
      id: "",
      url: "", //mvurl地址
      infolist: {}, //mv详情数据
      flag: false, //控制是否静音
      flag2: true, //是否显示静音按钮
      index: 0, //谁被选中
      isshow: true, //是否显示介绍信息
      total: 0, //评论总数
      hostList: [], //热评
      comments: [], //新评论
      page:1 ,  //评论的页码
      limit:10,  //评论数量
      videoContext:null //视频播放实例
    };
  },
  methods: {
    //   获取mvurl地址事件
    async geturl() {
      let res = await uni.request({
        url: "https://autumnfish.cn/mv/url",
        data: { id: this.id }
      });
      console.log(res[1].data.data.url);
      this.url = res[1].data.data.url;
    },
    // 获取mv详情信息事件
    async getmvinfo() {
      let res = await uni.request({
        url: "https://autumnfish.cn/mv/detail",
        data: { mvid: this.id }
      });
      console.log("mvinfo", res);
      this.infolist = res[1].data.data;
    },
    // 获取评论数据
    async getmvcountlist() {
      uni.showLoading({
        title:"加载中..."
      })
      let res = await uni.request({
        url: "https://autumnfish.cn/comment/mv",
        data: { id: this.id,limit:this.limit,offset:(this.page-1)*this.limit}
      });
      this.total = res[1].data.total;
      if(res[1].data.comments.length==0){
        return uni.showToast({
          title:"~没有数据~"
        })
      }
      this.comments = [...this.comments,...res[1].data.comments];
      this.hostList = res[1].data.hotComments;
      uni.hideLoading()
      console.log("评论", res);
    },
    // 点击显示介绍事件
    show() {
      this.isshow = !this.isshow;
    },
    // 详情评论切换事件
    fun(num) {
      if (num == 1) {
        this.index = 1;
      } else {
        this.index = 0;
      }
    },
    // 滚动事件
    fn(){
      this.page++
      this.getmvcountlist() //重新获取评论数据
    }
  },
  mounted() {
    this.geturl(); //获取mvurl地址
    this.getmvinfo(); //获取mv详情信息
    this.getmvcountlist(); //获取mv评论数据
  },
  created() {
    this.videoContext = uni.createVideoContext('myid')  //创建视频播放实例
  },
  // 页面隐藏事件
  onHide(){
    console.log(this.url)
    console.log("死亡")
    this.videoContext.stop()   //隐藏页面停止播放mv
    console.log(this.url)
  },
  // 页面显示事件
  onShow(){
    this.videoContext.play()  //显示页面播放mv
  }
};
</script>

<style lang="scss">
.box {
  background-color: #121a2a;
  .video_box {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .info_box {
    color: #d3d7d4;
    font-size: 35rpx;
    padding: 20rpx 50rpx;
    display: flex;
    justify-content: space-between;
  }
  .box_info {
    color: #d3d7d4;
    padding: 15rpx;
    font-size: 25rpx;
    border-bottom: 1px solid #f69c9f;
    .title,
    .username,
    .play,
    .info {
      padding: 10rpx 5rpx;
    }
    .title {
      font-size: 40rpx;
      font-weight: 600;
    }
    .info {
      position: relative;
      padding-right: 20rpx;
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-arrowBottom-fill {
        color: #fff;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.css {
  color: #d93a49;
  border-bottom: 1px solid #d93a49;
}
.comments {
  padding: 15rpx;
  .title {
    font-size: 40rpx;
    font-weight: 700;
    color: #fff;
  }
  .hostlist {
    .item {
        padding: 15rpx;
       .info{
           display: flex;
           justify-content: space-between;
          .img{
              width: 80rpx;
           image{
               border-radius: 50%;
               width: 100%;
           }   
          } 
          .userinfo{
              flex: 1;
              display: flex;
              flex-direction: column;
              text-align: left;
              padding-left: 20rpx;
              align-items: flex-start;
           .name{
               color: #ccc;
               font-size: 25rpx;
               padding: 10rpx 0;
           }
           
           .time{
               padding: 10rpx 0;
               color: #ccc;
               font-size: 15rpx;
           }
           .content{
               padding: 10rpx 0;
               font-size:30rpx;
               color: #fff;
           }   
          }
          .start{  
              color: #ccc;
              font-size: 25rpx;
              text-align: center; 
          }
       } 
       .beReplied{
           width: 80%;
           margin: 0 auto;
           .item{
           border-radius: 15rpx;
            background-color: #918597;
            padding-left:8rpx;
            color: #ccc;
            font-size: 20rpx;
           display: flex;
           justify-content: flex-start;
           .img{
               width: 100rpx;
               image{
               width: 100%;
               border-radius: 50%;
           }
           }
           .username{
               flex: 1;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               .name{
                   color: #ccc;
                   font-size: 30rpx;
                   padding-bottom: 15rpx;
               }
               .content{
                   padding-left: 10rpx;
               color: #000;
               font-size: 25rpx;
           }
           }
           
           }
           
       }
    }
  }
}
.totitle{
    width: 100%;
    height: 80rpx;
    color: #ccc;
    font-size: 50rpx;
    text-align: center;
    padding: 15rpx 0;
}
.bigbox{
  height: calc(100vh - 268px);
}
</style>
