<template>
	<div class="newalbum-box-container">
		<div
		ref="albumBox"
		class="main">
			<!-- 本周推荐 -->
			<div
			v-show="weekAlbums.length"
			class="week">
				<div class="title">
					<div>本周</div>
					<div>新碟</div>
				</div>
				<div class="content">
					<div class="items">
						<div
						class="item"
						v-for="(item, i) in weekAlbums"
						:key="item.id">
							<router-link
							tag="div"
							:to="`/page/album/` + item.id"
							class="pic-box"
							:style="'height:' + picBoxHeight"
							ref="picBox">
								<el-image
								:src="item.picUrl + '?param=200y200'"
								fit="cover"
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
							<div class="desc">
								<router-link
								tag="div"
								:to="`/page/album/` + item.id"
								 class="name">
									{{ item.name }}
								</router-link>
								<div class="artists">
									{{ item.artists.map(({name})=>name).join('/') }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 月度新碟 -->
			<div
			v-show="monthAlbums"
			class="months" >
				<div
				class="month"
				v-for="(monthData, i) in monthAlbums"
				:key="i">
					<div class="title">
						<div class="year">{{ monthData.year }}</div>
						<div class="month">{{ monthData.month|formatOrderNum }}</div>
					</div>
					<div class="content">
						<div class="items">
							<div
							class="item"
							v-for="(item, i) in monthData.album"
							:key="i">
								<router-link
								tag="div"
								:to="`/page/album/` + item.id"
								class="pic-box"
								:style="'height:' + picBoxHeight"
								ref="picBox">
									<el-image
									:src="item.picUrl + '?param=200y200'"
									fit="cover"
									:lazy="false">
									</el-image>
									<div class="player">
										<i class="iconfont icon-player-start-l"></i>
									</div>
								</router-link>
								<div class="desc">
									<router-link
									tag="div"
									:to="`/page/album/` + item.id"
									class="name">
										{{ item.name }}
									</router-link>
									<div class="artists">
										{{ item.artists.map(({name})=>name).join('/') }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import { mapState } from 'vuex'
	import { createSong, formatDate, formatOrderNum } from '@/utils'
	
	export default{
		props:{
			data:{
				type: Object,
				required: true
			},
		},
		data(){
			return{
				weekAlbums: [],
				picBoxHeight: 176,
				monthAlbums: [],
				currentYear: new Date().getFullYear(),
				currentMonth: new Date().getMonth() + 1
			}
		},
		created() {
			this.weekTopAlbum()
			this.monthTopAlbum(this.currentYear, this.currentMonth)
		},
		updated() {
			// mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			if(this.$refs.picBox) this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			}, false);
		},
		methods:{
			// 获取本周专辑
			async weekTopAlbum(){
				const data = await this.$api.getAlbumTop({})
				// console.log(data)
				if(data.code === 200){
					const weekData = data.weekData.map((weekData)=>{
						return {
							id: weekData.id,
							name: weekData.name,
							picUrl: weekData.blurPicUrl,
							publishTime: weekData.publishTime,
							artists: weekData.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name,
									picUrl: artists.url
								}
							})
						}
					})
					this.weekAlbums = weekData
				}
			},
			// 获取各月专辑
			async monthTopAlbum(year, month){
				
				const data = await this.$api.getAlbumTop({
					area: this.data.area,
					type: this.data.type,
					year: year,
					month: month
				})
				// console.log(data)
				if(data.code === 200){
					const monthData = data.monthData.map((monthData)=>{
						return {
							id: monthData.id,
							name: monthData.name,
							picUrl: monthData.blurPicUrl,
							publishTime: monthData.publishTime,
							artists: monthData.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name,
									picUrl: artists.url
								}
							})
						}
					})
					this.monthAlbums.push({
						year: year,
						month: month,
						album: monthData
					})
				}
			},
			// 滚动加载更多
			scrollLoadMore(scrollTop) {    // body设置 overflow: scroll; 后 window.addEventListener 无效
				var scrollHeight = scrollTop;    // 滚动高度
				var clientHeight = document.documentElement.clientHeight;    // 窗口高度
				var pageHeight   = document.documentElement.scrollHeight || document.body.scrollHeight;    // 页面高度
				var noLoading = true
				// 数据未加载完不获取下一数据，避免卡顿
				this.monthAlbums.forEach((item)=>{
					const currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
					const nextDate = new Date(this.currentYear, this.currentMonth, 1)
					const itemDate = new Date(item.year, item.month - 1, 1)
					if(currentDate.toString() == itemDate.toString() || nextDate.toString() == itemDate.toString()){
						noLoading = false
					}
				})
				if ( noLoading ) return
				// 判断滚动位置获取数据
				if(scrollHeight + clientHeight + 100 >= pageHeight){
					if(this.currentMonth === 1){
						this.currentYear = this.currentYear - 1
						this.currentMonth = 12
					}else{
						this.currentMonth = this.currentMonth - 1
					}
					this.monthTopAlbum(this.currentYear, this.currentMonth)
				}
			}
		},
		computed:{
			...mapState('base', [
				'discoverScrollY'
			])
		},
		watch:{
			discoverScrollY(newVal, oldVal){
				if(newVal !== oldVal) this.scrollLoadMore(newVal)
			},
			data(newVal, oldVal){
				this.weekAlbums = []
				this.monthAlbums = []
				if(newVal != oldVal){
					if(newVal.area === "ALL") this.weekAlbums()
					this.monthTopAlbum(this.currentYear, this.currentMonth)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newalbum-box-container{
		position: relative;
		.title{
			float: left;
			position: relative;
			width: 60px;
			height: auto;
			div{
				width: 40px;
				margin-right: 20px;
				line-height: 20px;
				font-size: 18px;
				&.year{
					z-index: 999;
					position: absolute;
					bottom: -17px;
					margin: -1px 0 0 5px;
					font-size: 14px;
				}
				&.month{
					position: relative;
					height: 40px;
					line-height: 40px;
					font-family: "微软雅黑";
					font-size: 32px;
					text-align: center;
					&:after{
						content: "";
						position: absolute;
						transform: rotate(-15deg);
						left: -10px;
						bottom: 2px;
						width: 60px;
						height: 5px;
						background: #fafafa;
						box-shadow: 0 -3px 5px -1px #999;
					}
				}
			}
		}
		.content{
			margin-left: 60px;
			width: auto;
			.items{
				width: 100%;
				height: auto;
				margin: 10px 0 50px;
				overflow: hidden;
				.item{
					float: left;
					width: calc(18%);
					margin: 0;
					margin-bottom: 10px;
					margin-right: 2%;
					display: flex;
					flex-direction: column;
					&:nth-child(5n){
						margin-right: 0;
					}
					.pic-box{
						position: relative;
						min-width: 100px;
						min-height: 100px;
						border-radius: 7px;
						overflow: hidden;
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
							display: none;
							position: absolute;
							right: 0;
							bottom: 0;
							i.iconfont{
								font-size: 32px;
								color: #fff;
							}
						}
						&:hover .player{
							display: block;
						}
					}
					.desc{
						flex-basis: 40px;
						bottom: 0;
						line-height: 20px;
						margin: 5px 0 0;
						font-size: 12px;
						overflow: hidden;
						.name{
							height: 20px;
							text-overflow: ellipsis;
							word-break: break-all;
							white-space: nowrap;
							overflow: hidden;
						}
						.artists{
							color: #999;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.newalbum-box-container{
		.title{
			float: none;
			width: auto;
			height: 20px;
			margin-top: 10px;
			padding: 0 10px;
			div{
				float: left;
				margin-right: 0;
				line-height: 20px;
				width: auto;
				font-size: 13px;
				font-weight: bold;
				&.year{
					z-index: 999;
					position: relative;
					left: 20px;
					bottom: -5px;
					margin: -1px 0 0 5px;
					font-size: 10px;
					font-weight: normal;
				}
				&.month{
					position: absolute;
					left: 0;
					height: 20px;
					line-height: 20px;
					font-size: 20px;
					&:after{
						content: "";
						position: absolute;
						transform: rotate(-45deg);
						left: 15px;
						bottom: 5px;
						width: 25px;
						height: 5px;
						background: #fafafa;
						box-shadow: 0 -3px 5px -1px #999;
					}
				}
			}
		}
		.content{
			margin-left: 0;
			.items{
				margin: 5px 0 20px;
				.item{
					float: left;
					width: calc(33.333% - 10px);
					margin: 5px;
					margin-top: 0;
					display: flex;
					.pic-box{
						min-width: 60px;
						min-height: 60px;
						border-radius: 5px;
						.player{
							i.iconfont{
								font-size: 24px;
							}
						}
					}
					.desc{
						flex-basis: 20px;
						line-height: 20px;
						margin: 5px 0 0;
						font-size: 10px;
						.artists{
							display: none;
						}
					}
				}
			}
		}
	}
}
</style>
