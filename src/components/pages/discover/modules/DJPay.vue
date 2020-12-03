<template>
	<div class="dj-paygift-container">
		<div
		class="item"
		v-for="(item, i) in data"
		:key="i">
			<router-link
			tag="div"
			:to="`/page/dj/pay/`+item.id"
			class="pic-box">
				<el-image
				:src="item.picUrl + '?param=200y200'"
				fit="fill"
				:lazy="false">
					<div slot="placeholder" class="loading">
						<i class="el-icon-loading"></i>
					</div>
					<div slot="error" class="error">
						<i class="el-icon-picture-outline"></i>
					</div>
				</el-image>
				<div class="date">
					{{ item.time }}
				</div>
			</router-link>
			
			<router-link
			tag="div"
			:to="`/page/dj/pay/`+item.id"
			class="text-box">
				<div class="name">
					{{ item.name }}
				</div>
				<div class="desc">
					{{ item.desc }}
				</div>
				<div class="last-program">
					<i class="iconfont icon-player-start-l"></i>
					{{ item.lastProgram }}
				</div>
				<div class="price">
					<span class="original">
						¥ {{ item.originalPrice }}
					</span>
					<!-- <span class="discount" v-if="item.discountPrice">
						¥ {{ item.discountPrice }}
					</span> -->
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data: []
			}
		},
		created() {
			this.djPaygift()
		},
		methods:{
			async djPaygift(){
				const data = await this.$api.getDJPaygift(4)
				// console.log(data)
				if(data.code === 200){
					const result = data.data.list.map((list)=>{
						return {
							id: list.id,
							name: list.name,
							desc: list.rcmdText,
							lastProgram: list.lastProgramName,
							picUrl: list.picUrl,
							originalPrice: list.originalPrice / 100,
							discountPrice: list.discountPrice / 100
						}
					})
					this.data = result
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.dj-paygift-container{
		position: relative;
		overflow: hidden;
		.item{
			float: left;
			display: block;
			height: 140px;
			width: 49%;
			margin: 0;
			margin-right: 1%;
			padding: 0;
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
				width: 120px;
				height: 120px;
				margin: 10px;
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
			}
			.text-box{
				cursor: default;
				width: auto;
				height: 120px;
				margin: 10px 10px 10px 140px;
				overflow: hidden;
				.name{
					cursor: pointer;
					height: 40px;
					width: 100%;
					line-height: 40px;
					font-size: 14px;
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.desc{
					height: 20px;
					width: 100%;
					line-height: 20px;
					font-size: 12px;
					color: #999;
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.last-program{
					position: relative;
					height: 20px;
					width: 100%;
					line-height: 20px;
					font-size: 12px;
					color: #999;
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					i.iconfont{
						position: relative;
						top: 2px;
						font-size: 14px;
					}
				}
				.price{
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					color: #c62f2f;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.dj-paygift-container{
		.item{
			height: 100px;
			width: 100%;
			margin-right: 0;
			&:nth-child(2n){
				margin-left: 0;
			}
			.pic-box{
				width: 90px;
				height: 90px;
				margin: 5px;
				border-radius: 5px;
			}
			.text-box{
				cursor: default;
				width: auto;
				height: 80px;
				margin: 10px 10px 10px 110px;
				overflow: hidden;
				.name{
					height: 30px;
					line-height: 30px;
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
</style>
