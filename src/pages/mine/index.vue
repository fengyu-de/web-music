<template>
  <view>
    <view class="box" v-if="isshow">
      <view class="login">
        <i class="iconfont icon-guangpan"></i>
        <view class="btn" @click="gofun">立即登录</view>
      </view>
      <view class="title">你还没有登录,快去登录吧</view>
    </view>
    <!-- 用户数据 -->
    <view class="userinfo" v-else>
      <view class="user">
        <view class="img">
          <image mode="widthFix" src="https://p1.music.126.net/3nwirRKGFTY-FRIQNBsYsw==/109951164845350672.jpg"></image>
        </view>
        <view class="name">张三</view>
        <view class="out" @click="outfun">退出</view>
      </view>
    </view>
    <view class="list">
      <view class="item">
        <i class="iconfont icon-xihuan"></i>
        <view>喜欢</view>
        <view>22</view>
      </view>
      <view class="item">
         <i class="iconfont icon-zuijinchangyong"></i>
         <view>最近</view>
        <view>22</view>
      </view>
      <view class="item">
         <i class="iconfont icon-xingzhuang"></i>
         <view>下载</view>
        <view>22</view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data(){
    return{
      isshow:true
    }
  },
  methods: {
    gofun() {
      uni.navigateTo({
        url: "/pages/login/index"
      });
    },
  async geth(){
    let res=await uni.getStorage({key:"h"})
   this.isshow=res[1].data
    },
    // 退出事件
    outfun(){
      uni.clearStorage()  //清除本地存储
      uni.reLaunch({  //跳转到当前页面(类似刷新)
        url:"/pages/mine/index"
      })
      uni.showToast({
        title:"退出成功",
        duration:1500
      })
    }
  },
 mounted(){
   
 },
 destroyed(){
 },
 onShow(){
   this.geth()
 },
 onHide(){

 }
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50vh auto;
  .login {
    background-color: #778899;
    width: 250rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    position: relative;
    border-radius: 15rpx;
    .icon-guangpan {
      position: absolute;
      left: 8rpx;
      bottom: -50%;
      transform: translateY(-50%);
    }
    .btn {
    }
  }
  .title {
    margin-top: 15rpx;
  }
}
.userinfo{
  margin-top: 10vh ;
  width: 100%;
  display: flex;
  justify-content: center;
  .user{
    display: flex;
    flex-direction: column;
    .img{
      width: 150rpx;
      image{
        border-radius: 50%;
      }
    }
    .name{
      color: #000;
      font-size: 30rpx;
      font-weight: 600;
      text-align: center;
    }
  }
}
.list{
width: 100%;
margin: 10px auto;
display: flex;
justify-content: center;
align-items: center;
background-color: #000;
padding: 20rpx 0;
.item{
  flex: 1;
  text-align: center;
  .iconfont{
    padding: 15rpx;
    display: inline-block;
    background-color:#696969 ;
   border-radius: 50%;
    font-size: 50rpx;
  }
  view{
    color: #A9A9A9;
  }
}
}
.out{
  margin:10rpx 22rpx;
  border-radius: 15rpx;
  width: 100rpx;
  padding: 20rpx 0;
  background-color: #778899;
  color: #fff;
  text-align: center;
}
</style>
