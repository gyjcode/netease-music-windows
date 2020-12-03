<template>
	<div class="search-lyric-container">
		<div
		v-show="popShow"
		class="pop-msg">
			<div class="mask"></div>
			<div class="msg">
				<i class="iconfont icon-cartoon-l"></i>
				<span>{{ popMsg }}</span>
			</div>
		</div>
		<div class="songs">
			<div class="header">
				<div class="num"> </div>
				<div class="operate"> </div>
				<div class="title">音乐标题</div>
				<div class="artists">歌手</div>
				<div class="album">专辑</div>
				<div class="duration">时长</div>
			</div>
			<div class="body">
				<div
				class="song"
				v-for="(song, index) in songs"
				:key="index">
					<div class="num">{{ index+1|formatOrderNum }}</div>
					<div class="operate">
						<i class="iconfont icon-heart-l"></i>
						<i class="iconfont icon-download-l"></i>
					</div>
					<div class="title">
						<div class="name">{{ song.name }}</div>
						<div
						class="lyrics"
						:id="'lyrics-'+index"
						ref="lyrics"
						:style="song.lyricsShow ? 'height:auto;' : 'height:80px'">
							<p 
							class="lyric"
							v-html="lyric"
							v-for="(lyric, i) in song.lyrics"
							:key="i"></p>
						</div>
					</div>
					<div class="btns">
						<button @click="toggleLyrics(song)">
							<span v-show="!song.lyricsShow">展开歌词</span>
							<span v-show="song.lyricsShow">收起歌词</span>
						</button>
						<button @click="copyLyrics(index)" id="copyLyrics">复制歌词</button>
					</div>
					<div class="artists">
						{{ song.artists[0].name }}
					</div>
					<div class="album">
						{{ song.album.name }}
					</div>
					<div class="duration">
						{{ song.duration|formatDate("mm:ss") }}
					</div>
				</div>
			</div>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	import {formatDate, formatOrderNum, createSong} from '@/utils'
	
	import clipboard from 'clipboard';
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				songs: [],
				pageCount: null,
				pageCurrent: 1,
				popShow: false,
				popMsg: ""
			};
		},
		mounted() {
			this.searchLyric()
		},
		methods:{
			// 获取单曲搜索结果
			async searchLyric(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				// console.log(data)
				if(data.code === 200){
					if(!data.result.songs) return
					const result = data.result.songs.map((songs)=>{
						return createSong({
							id: songs.id,
							name: songs.name,
							duration: songs.dt,
							picUrl: songs.al.picUrl,
							artists: songs.ar.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name
								}
							}),
							albumId: songs.al.id,
							albumName: songs.al.name,
							albumPicUrl: songs.al.picUrl,
							alia: songs.alia[0],
							lyrics: songs.lyrics,
							lyricsShow: false
						})
					})
					
					this.songs = result
					this.pageCount = Math.ceil(data.result.songCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.songCount +"首歌词"
				}
			},
			// 切换歌词显示隐藏
			toggleLyrics(item){
				if(item.lyricsShow){
					item.lyricsShow = false
				}else{
					item.lyricsShow = true
				}
			},
			// 复制歌词
			copyLyrics(index){
				var _this = this
				let target = this.$refs.lyrics[index]
				const clipboard = new this.$clipboard('#copyLyrics', {
					text: ()=>{
						return target.innerText;
					}
				});
				clipboard.on('success', function(){
					_this.popMsg = "复制成功"
				});
				clipboard.on('error', function(){
					_this.popMsg = "复制失败"
				});
				// 延时弹窗
				this.popShow = true
				clearTimeout(timer)
				const timer = setTimeout(()=>{
					this.popShow = false
				}, 1000);
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchLyric()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchLyric()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-lyric-container{
		position: relative;
		margin: -5px 0;
		.pop-msg{
			z-index: 999;
			position: fixed;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			width: auto;
			height: 80px;
			border-radius: 7px;
			color: #fff;
			overflow: hidden;
			.mask{
				position: absolute;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.8;
			}
			.msg{
				position: relative;
				transform: translate(-50%, -50%);
				top: 50%;
				left: 50%;
				height: 40px;
				line-height: 40px;
				padding: 0 30px;
				font-size: 18px;
				i.iconfont{
					float: left;
					margin-right: 10px;
					font-size: 36px;
				}
			}
		}
		.songs{
			position: relative;
			padding: 0 15px;
			.header, .body>.song{
				display: flex;
				flex-direction: row;
				text-align: left;
				&>div{
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
					font-size: 13px;
					color: #777;
				}
				.num{
					flex-basis: 3%;
					min-width: 30px;
					text-align: center;
				}
				.operate{
					flex-basis: 5%;
					min-width: 50px;
					text-align: center;
				}
				.title{
					flex-basis: 50%;
				}
				.artists{
					flex-basis: 15%;
				}
				.album{
					flex-basis: 17%;
				}
				.duration{
					flex-basis: 10%;
				}
			}
			.header{
				height: 30px;
				line-height: 30px;
			}
			.body{
				.song{
					position: relative;
					padding: 5px 0;
					background: #f1f2f3;
					&:nth-child(2n){
						background: #f9f9f9;
					}
					.btns{
						position: absolute;
						top: 30px;
						right: 10%;
						button{
							cursor: pointer;
							outline: none;
							height: 24px;
							line-height: 24px;
							margin-right: 15px;
							border: 1px solid #ccc;
							border-radius: 20px;
							padding: 0px 15px;
							font-size: 10px;
							background: #f9f9f9;
							&:hover{
								background: #eee;
							}
						}
					}
					.title{
						color: #333;
						.lyrics{
							height: 80px;
							margin: 15px 0;
							overflow: hidden;
							/deep/p{
								margin: 0;
								line-height: 20px;
								font-size: 10px;
								b{
									font-weight: normal;
									color: #0c73c2;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
