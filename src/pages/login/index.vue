<template>
  <view>
    <view class="from" v-if="isshow">
      <view class="username">
        <i class="iconfont icon-mima"></i>
        <input type="text" :maxlength="13" focus v-model="username" placeholder="请输入账号" />
      </view>
      <view class="password">
        <i class="iconfont icon-guangpan"></i>
        <input type="text" :maxlength="13" focus password v-model="password" placeholder="请输入密码" />
      </view>
      <view class="btn">
        <view class="login" @click="login">登录</view>
        <view class="register" @click="isshow=false">注册</view>
      </view>
    </view>
    <view class="from" v-if="!isshow">
      <view class="username">
        <i class="iconfont icon-mima"></i>
        <input type="text" :maxlength="13" focus v-model="username2" placeholder="请输入账号" />
      </view>
      <view class="password">
        <i class="iconfont icon-guangpan"></i>
        <input type="text" :maxlength="13" focus password v-model="password" placeholder="请输入密码" />
      </view>
      <view class="password">
        <i class="iconfont icon-guangpan"></i>
        <input type="text" :maxlength="13" focus password v-model="password2" placeholder="请输入密码" />
      </view>
      <view class="btn2">
        <view class="register2" @click="register">注册</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      username2: "",
      password: "",
      password2: "",
      isshow: true
    };
  },

  methods: {
    async login() {
      let res = await uni.getStorage({ key: "user" });
      console.log("res", res);
      uni.showLoading({
        title: "登录中..."
      });
      if (this.username == "" && this.password == "") {
        uni.showToast({
          title: "不能为空"
        });
      } else if (
        this.username != res[1].data.username ||
        this.password != res[1].data.password
      ) {
        uni.showToast({
          title: "密码或者账号不正确"
        });
      } else {
        uni.setStorage({ key: "h", data: false });
        setTimeout(() => {
          uni.showToast({
            title: "登录成功"
          });
          uni.hideLoading();
          uni.switchTab({
            url: "/pages/mine/index"
          });
        }, 1500);
      }
    },
    register() {
      if (this.username2 == "" || this.password == "" || this.password2 == "") {
        uni.showToast({
          title: "不能为空"
        });
      } else {
        if (this.password == this.password2) {
          this.isshow = true;
          uni.showToast({
            title: "注册成功"
          });
          uni.setStorage({
            key: "user",
            data: { username: this.username2, password: this.password2 }
          });
        } else {
          uni.showToast({
            title: "两次密码不一致"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.from {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50vw;
  height: 40vh;
  margin: 20vw auto;
  .username,
  .password {
    position: relative;
    padding-left: 30rpx;
    background-color: #ccc;
    border-radius: 15rpx;
    padding: 25rpx 30rpx;
    .iconfont {
      padding-left: 5rpx;
      position: absolute;
      left: 0;
      transform: translateY(25%);
      background-color: #ccc;
    }
    input {
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
    .login,
    .register {
      width: 150rpx;
      padding: 20rpx;
      color: #f0f0f0;
      border-radius: 20rpx;
      background-color: #7b68ee;
      text-align: center;
    }
  }
}
.btn2 {
  display: flex;
  justify-content: center;
  .register2 {
    width: 150rpx;
    padding: 20rpx;
    color: #f0f0f0;
    border-radius: 20rpx;
    background-color: grey;
    text-align: center;
  }
}
</style>
