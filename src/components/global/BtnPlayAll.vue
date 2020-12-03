<template>
	<div class="btn-playall-container">
		<button>
			<div
			@click="resetPlaylist">
				<i class="iconfont icon-player-start-s"></i>
				<span>播放全部</span>
			</div>
			<div
			@click="addToPlaylist">
				<i class="iconfont icon-plus-l"></i>
			</div>
		</button>
		<!-- 弹窗警示替换播放列表 -->
		<div
		v-show="popBoxShow"
		class="popBox">
			<div class="header">
				<h4>替换播放列表</h4>
				<div
				@click="closed"
				class="close">&times;</div>
			</div>
			<div class="body">
				<div class="notice-text">
					<p>"播放全部"将会替换当前的播放列表，是否继续？</p>
				</div>
				<div class="never-notify">
					<input
					v-model="playAllImmed"
					type="checkbox" id="neverNotify">
					<label for="neverNotify"></label>
					<span>不再提醒</span>
				</div>
			</div>
			<div class="footer">
				<div class="btns">
					<button
					@click="goOn"
					class="go">继续</button>
					<button
					@click="closed"
					class="cancle">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapState, mapMutations, mapActions} from 'vuex'
	
	export default {
		name: 'BtnPlayAll',
		props: {
			playlist: {
				type: Array,
				require: true
			}
		},
		data(){
			return{
				popBoxShow: false,
				playAllImmed: localStorage.getItem("playall_immed") === "true" || false,        // 注意：localStorage 会将布尔值存储为字符串
			}
		},
		methods: {
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist',
				'addPlaylist'
			]),
			...mapActions('music', [
				'startPlaying'
			]),
			// 双击设置播放列表
			resetPlaylist(){
				if(this.playAllImmed === true){
					this.setPlaylist(this.playlist)
					this.setCurrentSong(this.playlist[0])
					this.startPlaying(this.playlist[0])
				}else{
					this.popBoxShow = true
				}
			},
			addToPlaylist(){
				this.addPlaylist(this.playlist)
				if(!this.currentSong){
					this.setCurrentSong(this.playlist[0])
				}
			},
			closed(){
				this.popBoxShow = false
			},
			goOn(){
				localStorage.setItem('playall_immed', this.playAllImmed)
				this.setPlaylist(this.playlist)
				if(!this.currentSong){
					this.setCurrentSong(this.playlist[0])
				}
				this.popBoxShow = false
			}
		},
		computed:{
			...mapState('music', [
				'currentSong'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.btn-playall-container{
		position: relative;
		button{
			outline: none;
			cursor: pointer;
			display: block;
			margin: auto;
			border: none;
			border-radius: 32px;
			border: 1px solid #ec4141;
			padding: 0;
			color: #fff;
			background: #ec4141;
			overflow: hidden;
			div{
				float: left;
				display: block;
				height: 30px;
				line-height: 30px;
				padding: 1px 9px;
				&:hover{
					background: #cc3232;
				}
				span{
					display: inline-block;
					height: 100%;
					line-height: 30px;
					font-size: 14px;
				}
				i.icon-player-start-s{
					float: left;
					display: block;
					height: 100%;
					margin: 0 5px;
					font-size: 16px;
				}
				i.icon-plus-l{
					float: right;
					display: block;
					height: 100%;
					margin-right: 5px;
					font-size: 12px;
				}
			}
		}
		.popBox{
			z-index: 999;
			position: fixed;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			max-width: 300px;
			border: 1px solid #eee;
			background: #fff;
			box-shadow: 3px 3px 5px #eee;
			overflow: hidden;
			.header{
				width: auto;
				height: 60px;
				line-height: 60px;
				margin: 0 auto;
				padding:  0 20px;
				border-bottom: 1px solid #eee;
				h4{
					float: left;
					height: 100%;
					margin: 0 auto;
					font-size: 15px;
					color: #555;
				}
				.close{
					float: right;
					height: 100%;
					font-size: 20px;
				}
			}
			.body{
				position: relative;
				width: auto;
				height: 150px;
				margin: 0 auto;
				padding: 5px 20px;
				font-size: 13px;
				color: #333;
				.notice-text{
					position: relative;
					height: 120px;
					p{
						position: relative;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 50%;
					}
				}
				.never-notify{
					position: relative;
					height: 20px;
					bottom: 5px;
					#neverNotify{
						position: relative;
						opacity: 0;
					}
					label{
						cursor: default;
						display: block;
						position: absolute;
						top: 3px;
						left: 3px;
						width: 12px;
						height: 12px;
						border: 1px solid #999;
						border-radius: 2px;
						overflow: hidden;
					}
					#neverNotify:checked +label:before{
						display: block;
						content: "\2714";
						text-align: center;
						font-size: 10px;
						line-height: 11px;
						color: #d33a31;
					}
				}
			}
			.footer{
				width: auto;
				height: 60px;
				line-height: 60px;
				margin: 0 auto;
				padding:  0 20px;
				border-top: 1px solid #eee;
				background: #f5f5f5;
				.btns{
					width: 180px;
					height: 32px;
					margin: 14px auto;
					button{
						float: left;
						cursor: pointer;
						width: 80px;
						height: 30px;
						border: 1px solid #ccc;
						color: #333;
						background: #fff;
						&:last-child{
							float: right;
						}
						&:hover{
							color: #000;
							background: #f5f5f5;
						}
						&.go{
							border: 1px solid #1167a8;
							color: #fff;
							background: #0c73c2;
							&:hover{
								background: #1167a8;
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.btn-playall-container{
		button{
			border-radius: 20px;
			div{
				height: 20px;
				line-height: 20px;
				padding: 1px 5px;
				span{
					line-height: 20px;
					font-size: 10px;
				}
				i.icon-player-start-s{
					margin: 0 5px;
					font-size: 12px;
				}
				i.icon-plus-l{
					margin-right: 3px;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
