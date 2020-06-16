<template>
  <view>
      <view class="title">精彩评论</view>
      <view class="list">
          <view class="item" v-for="item in hostlist" :key="item.commentId">
              <view class="user">
                  <view class="img">
                      <image mode="widthFix" :src="item.user.avatarUrl"></image>
                  </view>
                  <view class="userinfo">
                      <view class="name">{{item.user.nickname}}</view>
                      <view class="time">{{item.time |newtime}}</view>
                  </view>
                  <view class="start">
                      <text>{{item.likedCount}}</text>
                      <i class="iconfont icon-xihuan"></i>
                  </view>
              </view>
              <view class="content">
                  {{item.content}}
              </view>
              <!-- 回复 -->
              <view class="reply" v-if="item.beReplied.length!= 0">
                  <view class="item2"   v-for="item2 in item.beReplied" :key="item2.beRepliedCommentId">
                      <view class="img">
                        <image mode="widthFix" :src="item2.user.avatarUrl"></image>
                      </view>
                      <view class="name">{{item2.user.nickname}}:</view>
                      <view class="content2">{{item2.content}}</view>
                  </view>
              </view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
  onLoad(id) {
    console.log(id.id);
    this.id = id.id;
  },
  data() {
    return {
      id: "",
      hostlist:[]  //热门评论
    };
  },
  methods: {
    //   获取歌但评论事件
    async getlist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/comment/hot",
        data: { id: this.id, type: 2 }
      });
      this.hostlist=res[1].data.hotComments
      console.log(res);
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style lang="scss">
.title{
    font-size: 35rpx;
    font-weight: 600;
    color: #000;
    padding: 10rpx;
}
.list{
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    .item{
        display: flex;
        flex-direction: column;
        padding-bottom: 25rpx;
        .user{
             display: flex;
             justify-content: flex-start;
            align-items: center;
        .img{
            flex: 1;
            image{
                border-radius: 50%;
            }
        }
        .userinfo{
            flex: 3;
            .name{
                color: #918597;
                font-size: 25rpx;
                margin-bottom: 15rpx;
            }
            .time{
                color: #ccc;
                font-size: 18rpx;
            }
        }
        .start{
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
         }
         .content{
             color: #000;
             font-size: 30rpx;
             font-weight: 600;
             padding-left:71px ;
         }
         .reply{
            padding: 0 10rpx;
            background-color: #ccc;
            display: flex;
            flex-direction: column;
            border-radius: 15rpx;
             .item2{
                 display: flex;
                 justify-content: flex-start;
                 align-items: center;
                 .name{
                     flex: 1;
                     font-size: 25rpx;
                     color: #402e4c;
                     text-align: center;
                 }
                 .img{
                     width: 80rpx;
                     image{
                         border-radius: 50%;
                     }
                 }
                 .content2{
                     flex: 2;
                     font-size: 23rpx;
                     color: #918597;
                 }
             }
         }
    }
}
</style>
