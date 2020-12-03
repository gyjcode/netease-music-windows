<template>
	<div class="discover-playlist-highquality-container">
		<div class="title">
			<h3>精品歌单</h3>
		</div>
		<div class="content">
			<div class="item" v-for="(item, i) in playlists" :key="i">
				<router-link
				tag="div"
				:to="`/page/playlist/`+item.id"
				class="pic-box">
					<div class="play-num">
						<i class="iconfont icon-musical-note-l"></i>
						{{ item.playCount|formatNumber(0) }}
					</div>
					<el-image
					:src="item.coverImgUrl + '?param=300y300'"
					fit="fill"
					:lazy="false">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
					<div class="player">
						<i class="iconfont icon-player-start-l"></i>
					</div>
				</router-link>
				
				<router-link
				tag="div"
				:to="`/page/playlist/`+item.id"
				class="text-box">
					<div class="name">
						{{ item.name }}
					</div>
					<div class="creator">
						by {{ item.creator.nickname }}
					</div>
					<div class="copywriter">
						{{ item.copywriter }}
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				playlists: []
			};
		},
		created(){
			this.topPlaylistHighquality()
		},
		methods:{
			// 精品歌单
			async topPlaylistHighquality(){
				const data = await this.$api.getPlaylistTopHighquality({cat:this.selectedTag});
				// console.log(data)
				this.playlists = data.playlists
			}
		},
	}
</script>

<style lang="scss" >
	.discover-playlist-highquality-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		.title{
			width: 100%;
			height: 30px;
			line-height: 30px;
			margin: 10px 0 0;
			h3{
				margin: 0;
				font-weight: normal;
				font-size: 18px;
				color: #333;
			}
		}
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 20px;
			position: relative;
			margin: 15px 0 0;
			overflow: hidden;
			.item{
				float: left;
				display: block;
				height: 130px;
				margin: 0;
				padding: 10px 0;
				overflow: hidden;
				&:nth-child(2n){
					margin: 0;
					margin-left: 1%;
				}
				.pic-box{
					cursor: pointer;
					float: left;
					display: block;
					position: relative;
					width: 130px;
					height: 130px;
					border-radius: 5px;
					overflow: hidden;
					.play-num{
						float: right;
						z-index: 99;
						display: block;
						position: absolute;
						right: 0;
						top: 0;
						width: 50%;
						text-align: right;
						padding: 3px 5px;
						font-size: 12px;
						color: #fff;
						background: #0606065c;
						//background-image: linear-gradient(to left,#0606065c, #00000000);
						background: -webkit-gradient(linear,left top,right top,from(#00000000),to(#0606065c)) no-repeat;
						background: -webkit-linear-gradient(left,#00000000,#0606065c) no-repeat;
						background: linear-gradient(90deg,#00000000,#0606065c) no-repeat;
					}
					.el-image{
						position: relative;
						width: 100%;
						height: 100%;
						background: #f1f1f1;
						img{
							width: 100%;
							height: 100%;
						}
						.error, .loading{
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							font-size: 30px;
							color: #999;
						}
					}
					.player{
						float: right;
						z-index: 999;
						display: none;
						position: absolute;
						right: 0;
						bottom: 0;
						padding: 3px 5px;
						i{
							font-size: 36px;
							color: #eee;
						}
					}
					&:hover .player{
						display: block;
					}
				}
				.text-box{
					cursor: default;
					width: auto;
					height: 100px;
					margin-left: 140px;
					padding: 20px 0;
					overflow: hidden;
					.name{
						cursor: pointer;
						height: 20px;
						width: 100%;
						line-height: 20px;
						font-size: 14px;
						color: #333;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&:hover{
							color: #000;
						}
					}
					.creator{
						cursor: pointer;
						margin: 10px 0;
						font-size: 10px;
						color: #aaa;
						&:hover{
							color: #888;
						}
					}
					.copywriter{
						margin: 25px 0;
						height: 20px;
						font-size: 10px;
						color: #bbb;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-playlist-highquality-container{
		.title{
			width: 100%;
			height: 30px;
			line-height: 30px;
			margin: 5px 0;
			h3{
				margin: 0;
				font-weight: bold;
				font-size: 15px;
				color: #333;
			}
		}
		.content{
			display: grid;
			grid-template-columns: 1fr;
			grid-gap: 10px;
			position: relative;
			margin: 0;
			overflow: hidden;
			.item{
				height: 80px;
				width: 100%;
				padding: 0;
				margin-right: 0;
				&:nth-child(2n){
					margin-left: 0;
				}
				.pic-box{
					width: 80px;
					height: 80px;
					margin: 0;
					border-radius: 5px;
				}
				.text-box{
					cursor: default;
					width: auto;
					height: 60px;
					margin: 0 0 0 90px;
					padding: 10px 0;
					overflow: hidden;
					.name{
						height: 20px;
						line-height: 20px;
					}
					.desc{
						height: 20px;
						line-height: 20px;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
