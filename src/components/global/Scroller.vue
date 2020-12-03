<!-- 全局 Scroller 组件 : better-scroll 插件 Vue 化 -->
<template>
	<div
	class="scroller-container"
	ref="scroller">
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	// 导入 better-scroll 组件
	import BScroll from 'better-scroll'
	
	// 默认配置项
	const defaultOptions = {
		mouseWheel: true,
		scrollY: true,
		scrollbar: {
			fade: true,
			interactive: false
		},
		probeType: 3
	}
	
	export default {
		name: "Scroller",
		props: {
			data: {
				default: () => []
			},
			options: {
				type: Object,
				default: () => ({})
			}
		},
		data(){
			return {}
		},
		methods: {
			getScroller() {
				return this.scroller
			},
			refresh() {
				this.scroller.refresh()
			}
		},
		watch:{
			data:{
				handler(){
					this.$nextTick(() => {
						if(!this.scroller){
							this.scroller = new BScroll(
								this.$refs.scroller,
								Object.assign({}, defaultOptions, this.options)
							)
							// 添加自定义事件
							this.$emit("init", this.scroller)
						}else{
							this.scroller && this.scroller.refresh()
						}
					})
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
.scroller-container{
	position: relative;
	width: auto;
	height: 100%;
	overflow: hidden;
	.bscroll-vertical-scrollbar{
		border-right: 1px solid #9999!important;
		
		.bscroll-indicator{
			background: #9999!important;
			border: 0!important;
		}
		&:hover .bscroll-indicator{
			background: #7777!important;
		}
	}
}
</style>
