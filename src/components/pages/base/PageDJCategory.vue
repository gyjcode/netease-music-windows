<template>
	<div class="page-dj-category-container">
		<div class="header">
			<Title :title="categoryName"></Title>
		</div>
		<div class="content">
			<div class="item" v-for="(item, i) in djs" :key="i">
				<router-link
				tag="div"
				:to="`/page/dj/`+item.id"
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
				</router-link>
				
				<router-link
				tag="div"
				:to="`/page/dj/`+item.id"
				class="text-box">
					<div class="name">
						{{ item.name }}
					</div>
					<div class="rcmd-text">
						{{ item.rcmdText }}
					</div>
					<div class="count">
						<span>节目:{{ item.programCount|formatNumber }}</span>
						<span>订阅:{{ item.subscriberCount|formatNumber }}</span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatNumber} from '@/utils'
	export default{
		props:{
			id:{
				type: String|Number,
				required: true
			}
		},
		data(){
			return{
				categoryName: '',
				djs: []
			}
		},
		created() {
			this.categoryDetail()
		},
		methods:{
			async categoryDetail(){
				const data = await this.$api.getDJRadioHot({
					cateId: this.id,
					limit: 100
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.djRadios.map((djRadios)=>{
						return {
							id: djRadios.id,
							name:  djRadios.name,
							picUrl: djRadios.picUrl,
							rcmdText: djRadios.rcmdtext,
							subscriberCount: djRadios.subCount,
							programCount: djRadios.programCount
						}
					})
					this.categoryName = data.djRadios[0].category
					this.djs = result
				}
			}
		}
	}
</script>

<style lang="scss" >
	.page-dj-category-container{
		position: relative;
		height: 100%;
		margin: 10px 30px;
		background: #fafafa;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			display: none;
			width: 9px;
			height: 9px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 18px;
			background: #7777;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: #9999;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.header{
			width: 100%;
			height: auto;
		}
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
			position: relative;
			margin: 0;
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
					height: 100px;
					margin-left: 140px;
					padding: 20px 0;
					overflow: hidden;
					.name{
						cursor: pointer;
						height: 20px;
						width: 100%;
						line-height: 20px;
						font-size: 16px;
						color: #333;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&:hover{
							color: #000;
						}
					}
					.rcmd-text{
						cursor: pointer;
						margin: 20px 0 0;
						font-size: 13px;
						color: #aaa;
						&:hover{
							color: #888;
						}
					}
					.count{
						margin: 10px 0;
						height: 20px;
						font-size: 13px;
						color: #bbb;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						span{
							display: inline-block;
							margin-right: 5px;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.page-dj-category-container{
		margin: 5px 10px;
		.content{
			grid-template-columns: 1fr;
			grid-gap: 10px;
			.item{
				height: 100px;
				padding: 0;
				.pic-box{
					width: 100px;
					height: 100px;
				}
				.text-box{
					cursor: default;
					width: auto;
					height: 80px;
					margin-left: 110px;
					padding: 10px 0;
					overflow: hidden;
					.name{
						font-size: 13px;
						font-weight: bold;
					}
					.rcmd-text{
						margin: 15px 0 0;
						font-size: 12px;
					}
					.count{
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
