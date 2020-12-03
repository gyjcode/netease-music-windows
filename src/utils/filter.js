// 导入 Vue
import Vue from 'vue'


// moment-1. 导入格式化时间的组件 moment
import moment from 'moment'
// moment-2. 全局注册时间格式化工具
Vue.filter('formatDate', function(dataStr, formatStr='YYYY-MM-DD HH:mm:ss'){
	return moment(dataStr).format(formatStr)
})

// 格式化序号——数字前补零
Vue.filter('formatOrderNum', function (number, n = 2){
	if(!number) return 1
	let len = number.toString().length
	while (len < n) {
		number = '0' + number
		len++
	}
	return number
})
// 格式化数字
Vue.filter('formatNumber', formatNumber)
// 单独抽离出来函数，方便后面无法使用过滤器的时候调用
export function formatNumber(number, n = 0){
	if(!number) return
	let len = number.toString().length
	if( len < 5 ) {
		number = number.toFixed(n)
	} else {
		number = (number/10000).toFixed(n) + "万"
	}
	return number
}