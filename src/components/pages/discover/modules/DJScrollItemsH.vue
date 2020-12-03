<template>
	<div class="scrolling-items-h-container">
		<div class="content">
			<i @click="scrolling(-1)" class="iconfont icon-arrow-left-l"></i>
			<div
			ref="scrollingItemsBody"
			:style="'width:' + bodyWidth +'px'"
			class="body">
				<div
				ref="scrollingItems"
				class="items">
					<!-- 排行榜 -->
					<div
					:style="'width:' + itemWidth +'px'"
					class="item">
						<router-link
						tag="div"
						:to="`/discover/dj/ranking`"
						class="content">
							<div class="ico">
								<i class="iconfont icon-rank-l rank"></i>
							</div>
							<div class="name rank">
								排行榜
							</div>
						</router-link>
					</div>
					<div
					v-for="(item, i) in data" :key="i"
					:style="'width:' + itemWidth +'px'"
					class="item">
						<router-link
						tag="div"
						:to="`/page/dj/category/`+item.id"
						class="content">
							<div class="pic-box">
								<el-image
								:src="item.picUrl"
								fit="cover"
								:lazy="false">
									<div slot="placeholder" class="loading">
										<i class="el-icon-loading"></i>
									</div>
									<div slot="error" class="error">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</div>
							<div class="name">
								{{ item.name }}
							</div>
						</router-link>
					</div>
					<!-- 我要做主播 -->
					<div
					:style="'width:' + itemWidth +'px'"
					class="item">
						<a href="https://music.163.com/st/radioweb/apply#/" target="_blank">
						<div class="content">
							<div class="ico anchor">
								<i class="iconfont icon-music-l anchor"></i>
							</div>
							<div class="name anchor">
								我要做主播
							</div>
						</div>
						</a>
					</div>
				</div>
			</div>
			<i @click="scrolling(1)" class="iconfont icon-arrow-right-l"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				bodyWidth: this.itemWidth * this.itemNum,
				itemWidth: 124,
				itemNum: 9
			}
		},
		mounted() {
			let cWidth = document.body.clientWidth
			if(cWidth < 540) this.itemNum = 4
			// console.log(this)
			if(this.$refs.scrollingItemsBody) this.itemWidth = Math.round(this.$refs.scrollingItemsBody.offsetWidth / this.itemNum)
			window.addEventListener('resize', () => {
				this.itemWidth = Math.round(this.$refs.scrollingItemsBody.offsetWidth / this.itemNum)
			}, false);
		},
		methods: {
			scrolling(direction = 1) {
				
				const itemWidth = this.itemWidth
				const left = this.$refs.scrollingItems.offsetLeft
				const maxWidth = this.$refs.scrollingItems.offsetWidth
				direction = direction/Math.abs(direction)
				
				if ((direction === 1 && Math.abs(left) <= maxWidth-itemWidth* this.itemNum) || (direction === -1 && left < 0)){
					this.$refs.scrollingItems.style.left = left - direction * itemWidth * this.itemNum + "px"    // 有小数，实际滚动宽度不等于最外层宽度
				}
				
			}
		},
	}
</script>

<style lang="scss">
	.scrolling-items-h-container {
		position: relative;
		margin: 20px 0 0;
		width: 100%;
		height: auto;
		i.iconfont {
			z-index: 999999;
			position: absolute;
			transform: translateY(-50%);
			top: 45%;
			font-size: 36px;
			color: #e9e9e9;
			&:hover {
				color: #aaa;
			}
			&.icon-arrow-left-l {
				left: 0px;
			}
			&.icon-arrow-right-l {
				right: 0px;
			}
		}
		.body {
			position: relative;
			width: calc(100% - 100px);
			height: 90px;
			margin: 0 40px;
			padding: 10px;
			overflow: hidden;
			.items {
				position: absolute;
				left: 0;
				width: auto;
				height: 90px;
				white-space: nowrap;
				overflow: hidden;
				transition: 1s;
				.item {
					z-index: 999;
					display: inline-block;
					position: relative;
					height: 90px;
					margin: 0;
					padding: 0;
					border: 0;
					.content {
						display: inline-block;
						position: absolute;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 50%;
						margin: 0 auto;
						padding: 5px 10px;
						/* &:hover{
							border-radius: 5px;
							background: #eee;
						} */
						i.iconfont{
							display: block;
							position: relative;
							width: 32px;
							height: 32px;
							line-height: 32px;
							font-size: 30px;
							overflow: hidden;
							&.rank{
								margin-top: 2px;
								color: #ff5555;
							}
							&.anchor{
								margin-top: 2px;
								color: #0f74ab;
							}
						}
						.name.anchor{
							color: #0f74ab;
						}
						.pic-box, .ico{
							position: relative;
							transform: translate(-50%, 0);
							left: 50%;
							width: 32px;
							height: 32px;
							padding: 9px;
							border-radius: 50%;
							background: #fcebeb;
							&:hover{
								background: #fad8d8;
							}
						}
						.ico.anchor{
							background: #edf1f6;
							&:hover{
								background: #dbe4ee;
							}
						}
						.el-image {
							display: block;
							position: relative;
							transform: translate(-50%, 0);
							left: 50%;
							width: 100%;
							height: 100%;
							background: none;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
							}
							.error, .loading{
								position: absolute;
								transform: translate(-50%, -50%);
								top: 50%;
								left: 50%;
								font-size: 15px;
								color: #999;
							}
						}
						.name {
							width: 100%;
							height: 30px;
							line-height: 30px;
							text-align: center;
							font-size: 12px;
							color: #999;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.scrolling-items-h-container {
		margin: 10px 0 0;
		i.iconfont {
			font-size: 15px;
		}
		.body {
			width: calc(100% - 50px);
			height: 70px;
			margin: 0 20px;
			padding: 5px;
			.items {
				height: 70px;
				.item {
					height: 70px;
					.content {
						padding: 3px 5px;
						i.iconfont{
							width: 24px;
							height: 24px;
							line-height: 24px;
							font-size: 20px;
						}
						.pic-box, .ico{
							width: 24px;
							height: 24px;
							line-height: 24px;
							font-size: 20px;
						}
						.name {
							height: 20px;
							line-height: 20px;
							font-size: 10px;
						}
					}
				}
			}
		}
	}
}
</style>
