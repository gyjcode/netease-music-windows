<template>
	<div class="sidebar-container">
		<div class="section">
			<Menu></Menu>
		</div>
		<div class="section">
			<h3 class="title">
				<span>我的音乐</span>
			</h3>
			<Mine></Mine>
		</div>
		<div
		v-show="loginUser.account.id"
		class="section">
			<h3
			@click="playlistCreatedShow = !playlistCreatedShow"
			class="title">
				<span> 创建的歌单 </span>
				<i v-show="!playlistCreatedShow" class="iconfont icon-arrow-right-s"></i>
				<i v-show="playlistCreatedShow" class="iconfont icon-arrow-down-s"></i>
			</h3>
			<Playlist :data="playlistCreated" v-show="playlistCreatedShow"></Playlist>
		</div>
		<div
		v-show="loginUser.account.id"
		class="section">
			<h3
			@click="playlistSubscribedShow = !playlistSubscribedShow"
			class="title">
				<span> 收藏的歌单 </span>
				<i v-show="!playlistSubscribedShow" class="iconfont icon-arrow-right-s"></i>
				<i v-show="playlistSubscribedShow" class="iconfont icon-arrow-down-s"></i>
			</h3>
			<Playlist :data="playlistSubscribed"  v-show="playlistSubscribedShow"></Playlist>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Menu from '@/components/layout/base/Menu.vue'
	import Mine from '@/components/layout/base/Mine.vue'
	import Playlist from '@/components/layout/base/Playlist.vue'
	
	export default{
		components:{
			Menu,
			Mine,
			Playlist
		},
		data(){
			return{
				playlistCreatedShow: true,
				playlistCreated: [],
				playlistSubscribedShow: true,
				playlistSubscribed: [],
			};
		},
		created() {
			this.userPlaylists()
		},
		methods:{
			// 获取用户歌单
			async userPlaylists(){
				if(!this.loginUser.account.id) return
				const data = await this.$api.getUserPlaylist({
					uid: this.loginUser.account.id
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.playlist.map((playlist)=>{
						return {
							id: playlist.id,
							name: playlist.name.replace(this.loginUser.profile.nickname, "我的"),
							creatorId: playlist.creator.userId,
							creatorName: playlist.creator.userName
						}
					})
					
					let created = []
					let subscribed = []
					result.forEach((item)=>{
						if(item.creatorId === this.loginUser.account.id){
							created.push(item)
						} else {
							subscribed.push(item)
						}
					})
					this.playlistCreated = created
					this.playlistSubscribed = subscribed
				}
			}
		},
		computed:{
			...mapState('user', [
				'loginUser'
			])
		},
		watch:{
			loginUser(){
				this.userPlaylists()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sidebar-container{
		cursor: default;
		position: fixed;
		width: 200px;
		height: 100%;
		border-right: 1px solid #e1e1e1;
		padding: 10px 0;
		background-color: #fafafa;
		overflow: hidden;
		.section{
			padding: 0 10px;
			.title{
				margin-top: 15px;
				margin-bottom: 10px;
				padding: 0;
				font-size: 14px;
				font-weight: normal;
				color: #999;
			}
		}
	}
</style>