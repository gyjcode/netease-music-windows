<template>
	<div class="search-single-container">
		
		<div class="bests" v-show="suggestShow">
			<Title class="title" title="最佳匹配"></Title>
			<!-- 搜索建议——歌手 -->
			<div
			class="best-item singer"
			v-show="suggestArtist.name">
				<div class="pic-box">
					<img :src="suggestArtist.picUrl" alt="">
				</div>
				<div class="icon">
					<i class="iconfont icon-arrow-right-l"></i>
				</div>
				<div class="desc">
					<div class="main">
						<span class="name">
							歌手：{{ suggestArtist.name }}
						</span>
						<span v-if="suggestArtist.alia" class="alia">
							({{ suggestArtist.alia }})
						</span>
					</div>
				</div>
			</div>
			<!-- 搜索建议——专辑 -->
			<div
			class="best-item album"
			v-show="suggestAlbum.name">
				<div class="pic-box">
					<img :src="suggestAlbum.picUrl" alt="">
				</div>
				<div class="icon">
					<i class="iconfont icon-arrow-right-l"></i>
				</div>
				<div class="desc">
					<div class="main">
						<span class="name">
							专辑：{{ suggestAlbum.name }}
						</span>
						<div class="author">
							{{ suggestAlbum.artist }}
						</div>
					</div>
				</div>
			</div>
			<!-- 搜索建议——MV -->
			<div
			class="best-item mv"
			v-show="suggestMv.name">
				<div class="pic-box">
					<img :src="suggestMv.picUrl" alt="">
				</div>
				<div class="icon">
					<i class="iconfont icon-arrow-right-l"></i>
				</div>
				<div class="desc">
					<div class="title">
						{{ suggestMv.name }}
					</div>
					<div class="artists">
						{{ suggestMv.artist }}
					</div>
				</div>
			</div>
		</div>
		<div class="body">
			<TablePlaylist :data="songsArr"></TablePlaylist>
			<Paging @current="getCurrentPage" :all="pageCount"></Paging>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import {formatOrderNum, formatDate, createSong} from '@/utils'
	
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				suggestShow: false,
				suggestArtist: {},
				suggestAlbum: {},
				suggestMv: {},
				songsArr: [],
				pageCount: null,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchSingle()
			this.searchSuggest()
		},
		methods:{
			// 获取多重搜索匹配结果
			async searchSuggest(){
				const data = await this.$api.getSearchSuggest(this.searchRoot.keywords)
				// console.log(data)
				if(data.code === 200){
					this.suggestArtist = {}
					this.suggestAlbum = {}
					this.suggestMv = {}
					// 歌手
					if(data.result.artists){
						this.suggestArtist.name = data.result.artists[0].name;
						this.suggestArtist.picUrl = data.result.artists[0].img1v1Url;
						this.suggestArtist.alia = data.result.artists[0].alias[0]
					}
					// 专辑
					if(data.result.albums){
						const theAlbum = await this.$api.getAlbum(data.result.albums[0].id)
						// console.log(theAlbum)
						this.suggestAlbum.name = theAlbum.album.name;
						this.suggestAlbum.picUrl = theAlbum.album.picUrl
						this.suggestAlbum.artist = theAlbum.album.artist.name
					}
					// Mv
					if(data.result.mvs){
						this.suggestMv.name = data.result.mvs[0].name;
						this.suggestMv.picUrl = data.result.mvs[0].picUrl
						this.suggestMv.artist = data.result.mvs[0].artist.name
					}
					this.suggestShow = this.suggestArtist.name || this.suggestAlbum.name || this.suggestMv.name 
				}
			},
			// 获取单曲搜索结果
			async searchSingle(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 100,
					offset: (this.pageCurrent - 1) * 100
				})
				// console.log(data)
				this.pageCount = Math.ceil(data.result.songCount / 100)
				
				const songsIds = data.result.songs.map(({ id }) => id);
				const songDetails = await this.$api.getSongDetail(songsIds);
				// console.log(songDetails)
				// array.map(function(item,index,arr){})
				const playlist = songDetails.songs.map((songs)=>{
					return createSong({
						id: songs.id,
						name: songs.name.replace(this.searchRoot.keywords, '<span>'+ this.searchRoot.keywords +'</span>'),
						picUrl: songs.al.picUrl,
						duration: songs.dt,
						artists: songs.ar.map((ar)=>{
									return {
										id: ar.id,
										name: ar.name,
										picUrl: ar.picUrl
									}
								}),
						albumId: songs.al.id,
						albumName: songs.al.name,
						albumPicUrl: songs.al.picUrl,
						alias: songs.alia || []
					})
				})
				this.songsArr = playlist
				// el-table prop 无法接受计算参数，这里重新增加个 artistsAllName 用于显示所有歌手信息
				this.songsArr.forEach((item)=>{
					item.artistsAllName = item.artists.map(({name})=>name).join('/')
				})
				this.searchRoot.countMsg = "找到了"+ data.result.songCount +"首单曲"
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchSingle()
					this.searchSuggest()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchSingle()
			}
		},
	}
</script>

<style lang="scss">
	.search-single-container{
		margin: 0;
		padding: 0;
		border: 0;
		.bests{
			margin: 0;
			padding: 0;
			border: 0;
			/deep/.title-container{
				margin: 0 30px;
				h3{
					font-size: 13px;
				}
			}
			.best-item{
				float: left;
				position: relative;
				display: block;
				height: 80px;
				width: 360px;
				margin: 10px 0 10px 30px;
				border: 1px solid #eee;
				border-radius: 7px;
				overflow: hidden;
				.pic-box{
					float: left;
					width: 80px;
					height: 80px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.desc{
					position: relative;
					width: auto;
					height: 100%;
					margin-left: 90px;
					margin-right: 40px;
					.main{
						position: absolute;
						transform: translateY(-50%);
						top: 50%;
						line-height: 20px;
						width: auto;
						margin: auto;
						font-size: 13px;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						.alia{
							font-size: 13px;
							color: #999;
						}
					}
				}
				.icon{
					float: right;
					margin-right: 10px;
					i.iconfont{
						height: 80px;
						line-height: 80px;
						font-size: 15px;
						color: #ccc;
					}
				}
				&:hover .icon i.iconfont{
					color: #999;
				}
			}
		}
		.body{
			
			/deep/.table-playlist-container .el-table .el-table__body .el-table__row td.title .name span{
				color: #0c73c6;
			}
		}
	}
</style>
