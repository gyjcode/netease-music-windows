// axios 组件封装
import axios from 'axios'

// 定义基准 URL
const BASE_URL = 'https://api.music.quietguoguo.com/';

// 创建 axios 实例
const $http = axios.create({
	/* baseURL: BASE_URL, */
	timeout: 120 * 1000,
	withCredentials: true,
	headers:{
		'Content-Type': 'application/json; charset=utf-8',
	}
})

// 请求拦截器
$http.interceptors.request.use(    
	config => {
		const token = localStorage.getItem('token');
		token && (config.headers.Authorization = token);
		
		if (config.method == 'post') {
			config.data = {
				...config.data,
				_t: Date.parse(new Date()) / 1000
			}
		} else if (config.method == 'get') {
			config.params = {
				_t: Date.parse(new Date()) / 1000,
				...config.params
			}
		}
		
		return config;
	},
	error => {
		Promise.error(error);
	}
);

// 响应拦截器
$http.interceptors.response.use(    
	response =>{
		// 正常响应返回数据
		return response.data
	},
	error => {
		const { response } = error;
		if (response) {
			// 异常响应判断错误代码
			return response.data
		} else {
			// 无响应处理
			if (!window.navigator.onLine) {
				alert("抱歉，当前无网络链接，请确认网络正常！")
				return;
			} else {
				return Promise.reject(error);
			}
		}
		
	}
);

// 向外暴露一个对象
export default $http;