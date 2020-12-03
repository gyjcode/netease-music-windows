<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="paging-container">
		<ul
		v-if="all > 1"
		class="content">
			<li class="pagging">
				<a @click="prev()"><i class="iconfont icon-arrow-left-l"></i></a>
			</li>
			<li
			:class="['pagging', current == 1 ? 'active' : '']"
			@click="setCurrent(1)"><a class="banclick">1</a></li>
			<li v-if="current >= 6 && all >= 10" class="pagging"><a class="banclick">…</a></li>
			<li
			v-if="pagging!=1 && pagging!=all"
			v-show="pageShow(pagging)"
			@click="setCurrent(pagging)"
			:class="['pagging', current == pagging ? 'active' : '']"
			v-for="(pagging, i) in all"
			:key="i">
				<a>{{ pagging }}</a>
			</li>
			<li v-if="current <= all && all>10" class="pagging"><a class="banclick">…</a></li>
			<li
			v-if="all != 1"
			:class="['pagging', current == all ? 'active' : '']"
			@click="setCurrent(all)"><a class="banclick">{{ all }}</a></li>
			<li class="pagging">
				<a @click="next()"><i class="iconfont icon-arrow-right-l"></i></a>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {	
		name: 'Paging',
		props: {
			all:{
				type: Number,
				require: true
			}
		},
		data(){
			return{
				current: 1,
			}
		},
		methods:{
			// 上一页
			prev(){
				this.current --
				if(this.current <= 1) this.current = 1
			},
			// 下一页
			next(){
				this.current ++
				if(this.current >= this.all) this.current = this.all
			},
			// 选择页
			setCurrent(pagging){
				this.current = pagging
			},
			// 是否显示页
			pageShow(pagging){
				if(this.current >= 1 && this.current <= 5){
					if(pagging <= 9) return true
				}
				if(this.current >= this.all - 4 && this.current <= this.all){
					if(pagging >= this.all - 7) return true
				}
				if(pagging>= this.current-3 && pagging <= this.current + 3) return true
			}
		},
		watch:{
			current(newVal, oldVal){
				this.$emit('current', this.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.paging-container{
		cursor: default;
		position: relative;
		margin: 10px 0;
		overflow: hidden;
		&:after{
			content: "";
			clear: both;
			display: block;
			height: 0;
			overflow: hidden;
		}
		.content{
			display: inline-block;
			position: relative;
			transform: translateX(-50%);
			left: 50%;
			list-style: none;
			width: auto;
			height: 30px;
			margin: 5px auto;
			border: 0;
			padding: 0;
			overflow: hidden;
			.pagging{
				float: left;
				width: auto;
				min-width: 20px;
				height: 20px;
				line-height: 20px;
				margin: 3px 2px;
				border: 1px solid #ddd;
				border-radius: 3px;
				padding: 1px 3px;
				font-size: 10px;
				text-align: center;
				text-overflow: ellipsis;
				word-break: break-all;
				white-space: nowrap;
				overflow: hidden;
				color: #333;
				background-color: #fff;
				&:hover{
					background-color: #eee;
				}
				&.active{
					border: 1px solid #da3a3a;
					color: #fff;
					background-color: #ec4141;
				}
				i.iconfont{
					font-size: 10px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.paging-container{
			margin: 5px 0;
			.content{
				height: 20px;
				margin: 3px auto;
				.pagging{
					float: left;
					width: auto;
					min-width: 16px;
					height: 16px;
					line-height: 16px;
					margin: 0 2px;
					border: 1px solid #ddd;
					border-radius: 3px;
					padding: 1px;
					font-size: 10px;
				}
			}
		}
	
}
</style>
