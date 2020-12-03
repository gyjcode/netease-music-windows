<!-- 全局 Toggle 组件 : 点击切换显示隐藏 -->
<template>
	<div
	class="toggle-container"
	ref="toggle">
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import { hasParent } from "@/utils"
	export default {	
		name: 'Toggle',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			reserveDoms: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			clickEvent(event) {
				// 获取点击事件触发的 DOM 元素
				const triggerElement = event.target
				// 获取插值内容的首个 DOM 元素
				const firstChildElement = this.$slots.default[0].elm
				// 获取默认父元素——因为使用了 ElementUI 的加载动画效果
				const defaultReserveDoms = Array.from(
					document.querySelectorAll('.el-loading-mask, .el-loading-spinner')
				)
				// 判断 DOM 元素的父元素是否包含在指定父元素数组集合中
				const reserves = defaultReserveDoms.concat(firstChildElement)
				if (!hasParent( triggerElement, reserves.concat(this.reserveDoms) )) {
					this.$emit('update:show', false)
				}
			},
			bindClick() {
				document.addEventListener('mousedown', this.clickEvent)
			},
			removeClick() {
				document.removeEventListener('mousedown', this.clickEvent)
			},
		},
		watch: {
			show(newShow) {
				setTimeout(() => {
					if (newShow) {
						this.bindClick()
					} else {
						this.removeClick()
					}
				}, 0);
			},
			beforeDestroy() {
				this.removeClick()
			},
		},
	}
</script>

<style lang="scss">
.toggle-container{
	z-index: 999;
}
</style>
