<template>
  <view>
      <text class="title">分类列表</text>
      <view class="list">
          <view class="item" v-for="(item,index) in list" :key="index" @click="gofn(item.name)">
              <text>{{item.name}}</text>
              <image :src="item.img" mode="widthFix"></image>
          </view>
      </view>
  </view>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {name:"全部",img:require("@/static/img/all.jpg")},
                {name:"欧美",img:require("@/static/img/oumei.jpg")},
                {name:"华语",img:require("@/static/img/huayu.jpg")},
                {name:"流行",img:require("@/static/img/liux.jpg")},
                {name:"说唱",img:require("@/static/img/shuochang.jpg")},
                {name:"摇滚",img:require("@/static/img/yaogun.jpg")},
                {name:"民谣",img:require("@/static/img/mingyao.jpg")},
                {name:"电子",img:require("@/static/img/dianzi.jpg")},
                {name:"轻音乐",img:require("@/static/img/qyy.jpg")},
                {name:"影视原声",img:require("@/static/img/yings.jpg")},
                 {name:"ACG",img:require("@/static/img/acg.jpg")},
                 {name:"怀旧",img:require("@/static/img/jingdian.jpg")},
                 {name:"治愈",img:require("@/static/img/zhiyu.jpg")},
                 {name:"旅行",img:require("@/static/img/lvxing.jpg")},
            ],
            
        }
    },methods: {
            gofn(name){
                uni.navigateTo({
                    url:`/pages/classifyinfo/index?tag=${name}`,
                })
            }
        },
};
</script>

<style lang="scss">
.title{
        color: DarkSlateGray;
        font-size: 40rpx;
    }
.list{
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
    flex-wrap: wrap;
    .item{
        width: 49%;
        position: relative;
        border-radius: 15rpx;
        image{
            width: 100%;
            border-radius: 15rpx;
        }
        text{
            background-color: rgba(0,0,0,0.2);
            border-radius: 20rpx;
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            color: #ccc;
            font-size: 50rpx;
            font-weight: 600;
        }
    }
}
</style>
