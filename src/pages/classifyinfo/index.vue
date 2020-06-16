<template>
  <view class="box">
      <view class="top">
          <view class="img">
              <image mode="widthFix" :src="toplist.coverImgUrl"></image>
          </view>
          <view class="info">
              <view class="toptitle">
                  精品歌单
              </view>
              <view class="title">{{toplist.name}}</view>
              <view class="presentation">
                  {{toplist.description}}
              </view>
          </view>
      </view>
      <!-- 歌单数据 -->
      <view class="total">为你找到{{total}}条歌单</view>
      <scroll-view scroll-y class="list_box" @scrolltolower="fn">
          <view  class="list">
          <view class="item" v-for="item in list" :key="item.id">
              <view class="img">
                  <image mode="widthFix" :src="item.coverImgUrl"></image>
                  <i class="iconfont icon-bofang" @click="gofn(item.id)"></i>
                  <view class="playCount">{{item.playCount |newplay }}</view>
              </view>
              <view class="text">
                  {{item.name}}
              </view>
          </view>
          </view>
          <view class="isshow">
          我是有底线的~O(∩_∩)O~
      </view>
      </scroll-view>
  </view>
</template>

<script>
export default {
  onLoad(name) {
    console.log(name);
    this.tag = name.tag;
  },
  data() {
    return {
      tag: "全部",
      toplist:[] , //头部数据
       total: 0,  //总歌单数
       page: 1,  //第几页
       limit: 10, //获取几条数据
       list:[] , //歌单数据
       flag:false   //判断是否显示隐藏
    };
  },
  mounted() {
    this.gettoplist(); //获取歌单头部数据
    this.getlist()   //获取歌单数据
  },
  methods: {
    //   获取歌单顶部数据事件
    async gettoplist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/top/playlist/highquality",
        data: { limit: 1, cat: this.tag }
      });
    //   console.log(res);
      this.toplist=res[1].data.playlists[0]
    },
    //获取歌单数据事件
  async getlist(){
      uni.showLoading({
            title:"努力加载中..."
        })
       let res=await uni.request({
            url:"https://autumnfish.cn/top/playlist",
            data:{limit:this.limit, offset:(this.page-1)*this.limit,cat:this.tag}
        })
        if(res[1].data.playlists.length==0){
            this.flag=true
            uni.showToast({
                icon:"none",
                title:"没有更多数据了"
            })
            return
        }
        this.list=[...this.list,...res[1].data.playlists]
        this.total=res[1].data.total
        uni.hideLoading()
        uni.showToast({
            title:"加载成功",
            icon:"success"
        })
        console.log(res)
    },
    // 滚动到底部触发的事件
    fn(){
        this.page++
        this.getlist()  //页码值发生改变重新获取数据
    },
    // 跳转到歌单歌曲页面事件
    gofn(id){
        uni.navigateTo({
            url:`/pages/songlist/index?id=${id}`
        })
    }
  }
};
</script>

<style lang="scss">
.box{
    padding: 10rpx;
}
.top{
    padding: 10rpx;
    display: flex;
    background-color: rgba(0,0,0,.5);
    .img{
        flex: 1;
        margin-right: 30rpx;
        display: flex;
        align-items: center;
        image{
            width: 100%;
        }
    }
    .info{
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
       .toptitle{
           width: 200rpx;
           font-size: 20rpx;
           padding: 10rpx 15rpx;
           border: 1px solid #faa755;
           color: #faa755;
           text-align: center;
       } 
       .title{
           font-size: 30rpx;
           color: #fff;
           padding: 10rpx 0;
       }
       .presentation{
    display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 4;
     overflow: hidden;
     color: #ccc;
     font-size: 20rpx;
       }
    }
}
.total{
    color: #121a2a;
    font-weight: 600;
    font-size: 30rpx;
    padding: 20rpx;
    border-bottom: 1px solid #f58220;
}
.list_box{
 height: calc(100vh - 180px);
}
.list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10rpx 0;
    .item{
        width: 49%;
        display: flex;
        flex-direction: column;
        .img{
            position: relative;
            image{
                width: 100%;
            }
           .iconfont {
            color: #f0f0f0;
            font-size: 100rpx;
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            }
            .playCount{
                color: #fff;
                font-size: 30rpx;
                position: absolute;
                bottom: 15rpx;
                right: 15rpx;
            }
        }
        .text{
        text-align: center;
        margin: 10rpx;
        color: #1a2933;
        font-size: 20rpx;
    }
    }
}
.isshow{
    padding: 10rpx 0;
text-align: center;
color:#ccc;
font-size: 30rpx;
}
</style>
