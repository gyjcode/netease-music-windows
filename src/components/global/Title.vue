<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="title-container">
		<router-link
		tag="div"
		:to="url"
		class="content">
			<h3>{{ title }}</h3>
			<i v-show="url"
			class="iconfont icon-arrow-right-l"></i>
		</router-link>
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {	
		name: 'Title',
		props: {
			title:{
				type: String,
				required: true,
				default: '请设置一个标题名称'
			},
			url:{
				type: String,
				required: false,
				default: ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.title-container{
		cursor: default;
		position: relative;
		height: 30px;
		line-height: 30px;
		margin: 10px 0;
		overflow: hidden;
		.content{
			float: left;
			display: block;
			overflow: hidden;
			h3{
				float: left;
				margin: 0;
				font-size: 16px;
			}
			i.iconfont{
				position: relative;
				font-size: 13px;
			}
		}
	}
@media screen and (max-width: 540px) {
	.title-container{
		height: 20px;
		line-height: 20px;
		margin: 5px 0;
		.content{
			h3{
				font-size: 15px;
			}
			i.iconfont{
				display: none;
				font-size: 10px;
			}
		}
	}
}
</style>
