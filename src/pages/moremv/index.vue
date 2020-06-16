<template>
  <view class="box">
    <view class="tab">
      <view class="tab_list">
        <view
          :class="['item',{'bjc':i==index}]"
          @click="fn(index)"
          v-for="(item,index) in tablist"
          :key="index"
        >{{item}}</view>
      </view>
      <view class="type_list">
        <view
          @click="fn2(index)"
          :class="['item',{'bjc':i2==index}]"
          v-for="(item,index) in typelist"
          :key="index"
        >{{item}}</view>
      </view>
      <view class="order_list">
        <view
          @click="fn3(index)"
          :class="['item',{'bjc':i3==index}]"
          v-for="(item,index) in orderlist"
          :key="index"
        >{{item}}</view>
      </view>
    </view>
    <view
      class="title"
    >{{tablist[i]=='全部'?'热':tablist[i]}}--{{typelist[i2]=='全部'?'热':typelist[i2]}}--{{[orderlist[i3]]}}</view>
    <!-- mv数据 -->
    <scroll-view class="list_box" scroll-y @scrolltolower="morefun">
    <view class="list">
        <view class="item" v-for="item in list" :key="item.id">
            <view class="img">
                <image mode="widthFix" :src="item.cover"></image>
                <i class="iconfont icon-bofang" @click="gofn(item.id)"></i>
                <view class="playCount">{{item.playCount | newplay}}</view>
            </view>
            <view class="info">
                <view class="name">{{item.name}}</view>
                <view class="artistName">{{item.artistName}}</view>
            </view>
        </view>
    </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tablist: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      typelist: ["全部", "官方版", "原声", "现场版", "网易出品"],
      orderlist: ["上升最快", "最热", "最新"],
      i: 0, //国家是否被选中
      i2: 0, //类型是否被选中
      i3: 0, //热度是否被选中
      page: 1, //页码
      limit: 8, //每页几条数据
      list: [], //mv数据
      area:'',
      type:'',
      order:''
    };
  },
  mounted() {
    this.getlist(); //获取mv数据
  },
  methods: {
    fn(index) {
      this.i = index;

    },
    fn2(index) {
      this.i2 = index;
    },
    fn3(index) {
      this.i3 = index;
    },
    // 获取mv数据事件
    async getlist() {
        uni.showLoading({
            title:"玩命加载..."
        })
      let res = await uni.request({
        url: "https://autumnfish.cn/mv/all",
        data: {
          area: this.tablist[this.i],
          type: this.typelist[this.i2],
          order: this.orderlist[this.i3],
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        }
      });
      if(res[1].data.data.length==0){
          uni.showToast({
              title:"没有更多数据了"
          })
      }
      this.list=[...this.list,...res[1].data.data]
      uni.hideLoading()
      uni.showToast({
          title:"加载完成",
          icon:"success"
          
      })
      console.log(res[1].data.data);
    },
    // 上拉到底部加载更多
    morefun(){
        this.page++
        this.getlist()
    },
    // 跳转到mv详情页事件
    gofn(id){
      uni.navigateTo({
        url:`/pages/mvinfo/index?id=${id}`
      })
    }
  },
  watch:{
      i(newval){
          this.list=[]  //清空mv数据
          this.area=this.tablist[newval]
          this.getlist()  //重新获取mv数据
      },
      i2(newval){
          this.list=[]  //清空mv数据
          this.type=this.typelist[newval]
      this.getlist()  //重新获取mv数据
      },
      i3(newval){
          this.list=[]  //清空mv数据
          this.order=this.orderlist[newval]
          this.getlist()  //重新获取mv数据
      }
  }
};
</script>

<style lang="scss">
.box {
   height: 100vh;
background-color: #f0f0f0;
  padding: 10rpx;
  .tab {
    display: flex;
    flex-direction: column;
    .item {
      padding: 15rpx 15rpx;
    }
    view {
      padding: 15rpx 0;
      display: flex;
      justify-content: space-around;
    }
  }
}
.bjc {
  background-color: #7fb80e;
  border-radius: 15rpx;
}
.title {
  width: 40%;
  padding: 15rpx;
  color: #f391a9;
  font-size: 30rpx;
  border-bottom: 1px solid #f391a9;
}
.list{
    padding: 10rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
        width: 49%;
        display: flex;
        flex-direction: column;
        .img{
            .iconfont{
                color: #fff;
                font-size: 100rpx;
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
            }
            width: 100%;
            position: relative;
            image{
                width: 100%;
            }
            .playCount{
                position: absolute;
                right:15rpx;
                top:15rpx;
                color: #fff;
                font-weight: 600;
            }
        }
    }
    .info{
        padding: 10rpx;
        line-height: 25rpx;
        display: flex;
        justify-content: space-between;
        color: #ccc;
        font-size: 20rpx;
       .artistName{
           text-align: right;
       }
    }
}
.list_box{
    height: calc(100vh - 210px);
}
</style>
