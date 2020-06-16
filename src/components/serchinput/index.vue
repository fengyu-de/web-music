<template>
  <view>
    <view class="input_box">
      <view class="input">
        <i class="iconfont icon-sousuo"></i>
        <input
          @keyup.enter="fun"
          placeholder="请输入歌曲名或者歌手"
          @click="goserch"
          v-model="inputdata"
        />
      </view>
      <button @click="fun" size="mini">搜索</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputdata: "" //输入框的值
    };
  },
  methods: {
    // 跳转到搜索页面
    goserch() {
      uni.switchTab({
        url: `/pages/search/index`
      });
    },
    // 给父组件传值的事件
    fun() {
      if (this.inputdata == "") {
        uni.showToast({
          title: "请输入查询内容"
        });
      }
      this.$emit("fn", this.inputdata);
    }
  }
};
</script>

<style lang="scss">
.input_box {
  display: flex;
  justify-content: space-around;
  height: 80rpx;
  padding: 10rpx;
  button {
    margin-left: 10rpx;
    height: 100%;
    flex: 1;
    background-color: #000;
    color: #ccc;
  }
  .input {
    flex: 4;
    position: relative;
    .iconfont {
      width: 80rpx;
      height: 100%;
      font-size: 100rpx;
      position: absolute;
      left: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99;
    }
    input {
      padding-left: 38rpx;
      height: 100%;
      background-color: #ccc;
    }
  }
}
</style>
