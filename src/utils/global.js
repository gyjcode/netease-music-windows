/* 
 * 批量注册全局组件
 */

export default {
	install(Vue){
		//检索指定文件夹下文件
		const requireComponent = require.context(
			"@/components/global",
			true,
			/[a-z0-9]+\.(jsx?|vue)$/i,
		)
		// 批量注册base组件
		requireComponent.keys().forEach(fileName => {
			const componentConfig = requireComponent(fileName)
			const componentName = componentConfig.default.name
			if (componentName) {
				Vue.component(componentName, componentConfig.default || componentConfig)
			}
		})
	},
}
