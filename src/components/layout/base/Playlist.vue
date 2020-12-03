<template>
	<div class="sidebar-playlist-container">
		<div class="content">
			<router-link
			tag="div"
			:to="`/page/playlist/`+ item.id"
			class="item"
			v-for="(item, i) in data"
			:key="i">
				<i class="iconfont icon-playing-list-l"></i>
				<span>{{ item.name }}</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default{
		props:{
			data:{
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sidebar-playlist-container{
		cursor: default;
		position: relative;
		.content{
			position: relative;
			margin: 0;
			padding: 0;
			.item{
				cursor: pointer;
				position: relative;
				width: auto;
				height: 32px;
				line-height: 32px;
				margin: 0;
				border-radius: 2px;
				padding: 0 10px;
				font-size: 13px;
				font-weight: normal;
				color: #555;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: break-all;
				overflow: hidden;
				i.iconfont{
					float: left;
					width: 20px;
					height: 20px;
					font-size: 14px;
				}
				span{
					display: block;
					height: 32px;
					font-size: 13px;
					text-overflow: ellipsis;
					white-space: nowrap;
					word-break: break-all;
					overflow: hidden;
				}
				&:hover{
					color: #333;
				}
				&.active{
					border-left: 0px solid #c62f2f;
					color: #333;
					background-color: #eee;
				}
			}
		}
	}
</style>