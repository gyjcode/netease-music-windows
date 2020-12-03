<template>
	<div class="search-playlist-container">
		<div class="playlists">
			<div
			class="playlist"
			v-for="(playlist, i) in playlists"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/playlist/`+playlist.id"
				class="pic-box">
					<img :src="playlist.picUrl + '?param=100y100'" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/playlist/`+playlist.id"
				v-html="playlist.name.replace(searchRoot.keywords, '<span>'+ searchRoot.keywords +'</span>')"
				class="name">
				</router-link>
				<div class="track-count">
					{{ playlist.trackCount }}首
				</div>
				<router-link
				tag="div"
				:to="`/page/user/`+ playlist.creatorId"
				v-if="playlist.creatorId"
				class="creator">
					{{ playlist.creatorName }}
				</router-link>
			</div>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				playlists: [],
				pageCount: null,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchPlaylist()
		},
		methods:{
			// 获取单曲搜索结果
			async searchPlaylist(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.result.playlists.map((playlists)=>{
						return {
							id: playlists.id,
							name: playlists.name,
							picUrl: playlists.coverImgUrl,
							trackCount: playlists.trackCount,
							creatorId: playlists.creator.userId,
							creatorName: playlists.creator.nickname,
						}
					})
					
					this.playlists = result
					this.pageCount = Math.ceil(data.result.playlistCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.playlistCount +"个歌单"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchPlaylist()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchPlaylist()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-playlist-container{
		position: relative;
		.playlists{
			position: relative;
			.playlist{
				position: relative;
				display: flex;
				flex-direction: row;
				width: auto;
				height: 80px;
				line-height: 80px;
				padding: 0 20px;
				overflow: hidden;
				background: #f1f2f3;
				&:nth-child(2n){
					background: #f9f9f9;
				}
				&:hover{
					background: #eee;
				}
				.pic-box{
					cursor: pointer;
					flex: 0 0 60px;
					height: 60px;
					margin: 10px 20px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					cursor: pointer;
					flex-grow: 1;
					display: block;
					height: 100%;
					width: 100%;
					font-size: 13px;
					color: #333;
					/deep/span{
						color: #0c73c6;
					}
				}
				.track-count{
					cursor: default;
					display: block;
					width: 100%;
					height: 100%;
					font-size: 13px;
					color: #999;
				}
				.creator{
					cursor: pointer;
					display: block;
					width: 100%;
					height: 100%;
					font-size: 13px;
					color: #999;
				}
			}
		}
	}
</style>
