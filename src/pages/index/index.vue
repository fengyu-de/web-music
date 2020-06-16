<template>
  <view class="box">
    <!-- 搜索框 -->
    <InPut />
    <!-- 轮播图 -->
	<swiper indicator-dots autoplay interval="3500" circular>
		<swiper-item v-for="item in swiperList" :key="item.targetId">
			<image mode="widthFix" :src="item.imageUrl"></image>
		</swiper-item>
	</swiper>
	<!-- 推荐歌单 -->
	<view class="song_menu">
		<view class="titel">
			<view>推荐歌单</view>
			<text @click="gofn">查看更多&nbsp;></text>
		</view>
		<songMenu></songMenu>
		<!-- 最新音乐 -->
		<view class="new_music">
			<view class="title_box">
			<view class="title">最新音乐</view>
			<view class="title2" @click="gonewmusic">查看更多&nbsp;></view>
			</view>
		<view class="newmusic" >
		<view class="title">
		</view>
		<newmusic :list="newlist"></newmusic>
		</view>
	</view>
	<!-- 最新mv -->
	<view class="newmv">
		<view class="titel">
			<view class="title_info">最新mv</view>
			<view class="title_info2" @click="gomv">查看更多&nbsp;></view>
		</view>
		<newMv :list="newmv"></newMv>
	</view>
	<view class="audio">
		
	</view>
	</view>
  </view>
</template>

<script>
import InPut from "@/components/serchinput/index"; //搜索框组件
import songMenu from '@/components/songmenu/index'//推荐歌单组件
import newmusic from '@/components/newmusic/index' //最新歌曲组件
import newMv from '@/components/newmv/index' //最新mv组件
export default {
  data() {
    return {
		swiperList:[] ,  //轮播图数据
		newlist:[] ,  //最新音乐数据
		newmv:[],
		musicurl:'' ,  //音乐地址
		
	};
  },
  components: {
	InPut,
	songMenu,
	newmusic ,
	newMv
  },
  mounted() {
	this.getswiperlist(); //获取轮播图数据
	this.getnewmusic() //获取最新音乐数据
	this.getnewmv()  //获取最新mv数据
  },
  methods: {
    //   获取轮播图数据
    async getswiperlist() {
      let res = await uni.request({
        url: "https://autumnfish.cn/banner"
	  });
	  this.swiperList=res[1].data.banners
    //   console.log(res[1].data.banners);
	},
	// 获取最新音乐数据
  async	getnewmusic(){
	let res=await uni.request({
			url:"https://autumnfish.cn/personalized/newsong"
		})
		// console.log(res[1].data.result)
		this.newlist=res[1].data.result
	},
	// 获取最新mv事件
   async getnewmv(){
	 let res=await  uni.request({
		   url:"https://autumnfish.cn/personalized/mv"
	   })
	   console.log(res[1].data.result)
	   this.newmv=res[1].data.result
	},
	// 前往分类歌单页面
	gofn(){
		console.log("222")
		uni.navigateTo({
			url:"/pages/classify/index"
		})
	},
	// 前往最新音乐页面事件
	gonewmusic(){
		uni.navigateTo({
			url:"/pages/newmusic/index"
		})
	},
	// 去mv分类页面
	gomv(){
		uni.navigateTo({
			url:"/pages/moremv/index"
		})
	}
	
  },
 
};
</script>

<style lang="scss">
.song_menu{
	padding: 10rpx;
	height: 28rpx;
	.titel{
		padding: 10rpx;
	display: flex;
	justify-content: space-between;
	view{
		font-size: 30rpx;
		font-weight: 600;
	}
	text{
		font-size: 25rpx;
		color: #000;
	}
	}
}
.new_music{
	padding:10rpx;
	.title_box{
    display: flex;
	justify-content: space-between;
	.title{
		font-size: 30rpx;
		font-weight: 600;
	}
	.titel2{
		font-size: 25rpx;
		font-weight: 600;
	}
	}
}
.box{
	height: 100vh;
}
audio{
	width: 100%;
	height: 100rpx;
}
</style>
