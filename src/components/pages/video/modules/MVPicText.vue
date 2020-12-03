<template>
	<div class="mv-pictext-container">
		<div class="items">
			<div
			class="item"
			v-for="(item, i) in data"
			:key="i">
				<div class="num">
					<span>{{ i+1|formatOrderNum }}</span>
				</div>
				<div
				class="pic-box"
				:style="'height:'+picBoxHeight+'px;'"
				ref="picBox">
					<el-image
					:src="item.picUrl + '?param=170y90'"
					fit="cover"
					:lazy="false">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
					<div class="play-num">
						{{ item.playCount }}
					</div>
				</div>
				<div class="text-box">
					<div class="name">
						{{ item.name }}
					</div>
					<div class="artists">
						{{ item.artistName }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatOrderNum} from '@/utils'
	export default{
		props:{
			data:{
				type: Array,
				required: true
			},
		},
		data(){
			return{
				picBoxMinWidth: 170,
				picBoxHeight: 90
			}
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.picBox){
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth / 170 * 90
			}
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth / 170 * 90
			}, false);
		},
	}
</script>

<style lang="scss" scoped>
	.mv-pictext-container{
		position: relative;
		width: auto;
		.items{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 15px;
			width: auto;
			.item{
				display: flex;
				flex-direction: row;
				position: relative;
				width: 100%;
				height: auto;
				padding: 20px 0;
				overflow: hidden;
				.num{
					flex-basis: 10%;
					position: relative;
					span{
						display: inline-block;
						position: relative;
						transform: translateY(-50%);
						top: 50%;
						margin: 0 5px;
						font-size: 24px;
						font-family: "宋体";
						font-style: normal;
						color: #999;
					}
				}
				.pic-box{
					flex: 0 0 40%;
					position: relative;
					overflow: hidden;
					.el-image{
						position: absolute;
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
					.play-num{
						z-index: 99;
						display: block;
						position: absolute;
						right: 0;
						top: 0;
						width: 50%;
						text-align: right;
						padding: 3px 5px;
						font-size: 12px;
						border-radius: 0 7px 0 0;
						color: #fff;
						background: #0606065c;
						//background-image: linear-gradient(to left,#0606065c, #00000000);
						background: -webkit-gradient(linear,left top,right top,from(#00000000),to(#0606065c)) no-repeat;
						background: -webkit-linear-gradient(left,#00000000,#0606065c) no-repeat;
						background: linear-gradient(90deg,#00000000,#0606065c) no-repeat;
					}
				}
				.text-box{
					flex-grow: 1;
					display: block;
					line-height: 20px;
					padding: 5px 10px;
					overflow: hidden;
					.name{
						font-size: 14px;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.artists{
						margin-top: 10px;
						font-size: 12px;
						color: #999;
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
	.mv-pictext-container{
		.items{
			grid-template-columns: 1fr;
			grid-gap: 10px;
			.item{
				padding: 0;
				.num{
					display: none;
				}
				.pic-box{
					
				}
				.text-box{
					
				}
			}
		}
	}
}
</style>
