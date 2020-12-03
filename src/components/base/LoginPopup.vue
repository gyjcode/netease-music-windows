<!-- 
	* 登录注册弹窗组件
	* 使用 setLoginPopupShow 控制显示隐藏
 -->

<template>
	<div class="login-popup-container">
		<transition name="alertPopup">
		<div
		v-show="alertPopupShow"
		class="alert-popup">
			请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
		</div>
		</transition>
		<div class="header">
			<div
			class="more-logins"
			v-show="showType === 'loginByEmail'"
			@click="showType = 'loginByPhone'">
				<i class="iconfont icon-arrow-left-l"></i>
				<span>返回其他登录</span>
			</div>
			<div
			class="to-login"
			v-show="showType === 'register'"
			@click="showType = 'loginByPhone'">
				<i class="iconfont icon-arrow-left-l"></i>
				<span>返回登录</span>
			</div>
			<div
			@click="close()"
			class="close">
				<i class="iconfont icon-close-l"></i>
			</div>
		</div>
		<div class="pic">
			<img :src="require('@/assets/images/'+ showPic)">
		</div>
		
		<div
		v-show="showType === 'loginByPhone' || showType === 'loginByEmail'"
		class="login">
			<!-- 手机登录 -->
			<form
			@keyup.enter="login"
			class="login-by-phone"
			v-show="showType === 'loginByPhone'">
				<div class="account">
					<div
					class="countrycode"
					id="countrycode"
					@click="selectCountryCode"
					ref="countryCode">
						<i class="iconfont icon-phone-l"></i>
						<span>
							+{{ currrentCountryCode }}
						</span>
						<i class="iconfont icon-arrow-down-l"></i>
					</div>
					<Toggle
					:reserveDoms="[$refs.countryCode && $refs.countryCode.$el]"
					:show.sync="selectCountryCodeShow">
						<div
						class="select"
						v-show="selectCountryCodeShow">
							<ul>
								<li
								calss="country"
								@click="changeCountryCode(country.code)"
								v-for="(country, i) in countries"
								:key="i">
									<span class="flag">
										<img :src="require('@/assets/images/flags/'+ country.flag)">
									</span>
									<span class="name">
										{{ country.zh }}
									</span>
									<span class="code">
										+{{ country.code }}
									</span>
								</li>
							</ul>
						</div>
					</Toggle>
					<div class="phone" id="phone">
						<input
						@focus="clearErrorMsg"
						v-model="phoneAccount"
						type="text"
						placeholder="请输入手机号">
					</div>
				</div>
				<div class="password">
					<div class="pass">
						<i class="iconfont icon-password-l"></i>
						<input
						@focus="clearErrorMsg"
						v-model="password"
						type="password"
						placeholder="请输入密码">
					</div>
					<div class="reset-pass" id="phone-reset-pass">
						重设密码
					</div>
				</div>
			</form>
			<!-- 邮箱登录 -->
			<form
			action=""
			class="login-by-email"
			v-show="showType === 'loginByEmail'">
				<div class="account">
					<div class="email" id="email">
						<i class="iconfont icon-email-l"></i>
						<input
						@focus="clearErrorMsg"
						v-model="emailAccount"
						type="text"
						placeholder="邮箱账号">
					</div>
				</div>
				<div class="password">
					<div class="pass">
						<i class="iconfont icon-password-l"></i>
						<input
						@focus="clearErrorMsg"
						v-model="password"
						type="password"
						placeholder="请输入密码">
					</div>
					<div class="reset-pass" id="email-reset-pass">
						忘记密码？
					</div>
				</div>
			</form>
			<!-- 是否自动登录 -->
			<div class="auto-login">
				<input v-model="autoLogin" type="checkbox" id="auto-login"/>
				<label for="auto-login"></label>
				<span>自动登录</span>
				<div
				v-show="errorMsg"
				class="error-msg">
					<i class="iconfont icon-warn-l"></i>
					<span>{{ errorMsg }}</span>
				</div>
			</div>
			<!-- 登录按钮 -->
			<div
			@click="login"
			class="btn btn-login">
				登 录
			</div>
			<div
			v-show="showType === 'loginByPhone'"
			class="btn-text"
			@click="goRegister">
				注 册
			</div>
		</div>
		<!-- 绑定手机号 -->
		<div
		class="bindings"
		v-show="showType === 'binding'">
			<form
			class="binding-account"
			v-show="showType === 'binding'">
				<div class="account">
					<div
					class="countrycode"
					id="countrycode"
					@click="selectCountryCode"
					ref="countryCode">
						<i class="iconfont icon-phone-l"></i>
						<span>
							+{{ currrentCountryCode }}
						</span>
						<i class="iconfont icon-arrow-down-l"></i>
					</div>
					<Toggle
					:reserveDoms="[$refs.countryCode && $refs.countryCode.$el]"
					:show.sync="selectCountryCodeShow">
						<div
						class="select"
						v-show="selectCountryCodeShow">
							<ul>
								<li
								calss="country"
								@click="changeCountryCode(country.code)"
								v-for="(country, i) in countries"
								:key="i">
									<span class="flag">
										<img :src="require('@/assets/images/flags/'+ country.flag)">
									</span>
									<span class="name">
										{{ country.zh }}
									</span>
									<span class="code">
										+{{ country.code }}
									</span>
								</li>
							</ul>
						</div>
					</Toggle>
					<div class="phone" id="phone">
						<input
						@focus="clearErrorMsg"
						v-model="phoneAccount"
						type="text"
						placeholder="请输入手机号">
					</div>
				</div>
				<div class="verification-code">
					<div class="verification">
						<i class="iconfont icon-password-l"></i>
						<input
						@focus="clearErrorMsg"
						v-model="phoneCaptcha"
						type="text"
						placeholder="验证码">
					</div>
					<div
					class="btn btn-verification">
						<div
						@click="sentPhoneCaptcha"
						v-show="!captchaTimer"
						class="text">
							获取验证码
						</div>
						<div
						v-show="captchaTimer"
						class="time">
							{{ captchaTimer|formatDate('mm:ss') }}
						</div>
					</div>
				</div>
			</form>
			<div
			class="error-msg-binding">
				<div class="main"
				v-show="errorMsgBinding">
					<i class="iconfont icon-warn-l"></i>
					<span>{{ errorMsgBinding }}</span>
				</div>
			</div>
			<div
			@click="binding"
			class="btn btn-next">
				下一步
			</div>
		</div>
		<!-- 注册 -->
		<div
		class="register"
		v-show="showType === 'register'">
			<form
			action=""
			class="register-account"
			v-show="showType === 'register'">
				<div class="account">
					<div
					class="countrycode"
					id="countrycode"
					@click="selectCountryCode"
					ref="countryCode">
						<i class="iconfont icon-phone-l"></i>
						<span>
							+{{ currrentCountryCode }}
						</span>
						<i class="iconfont icon-arrow-down-l"></i>
					</div>
					<Toggle
					:reserveDoms="[$refs.countryCode && $refs.countryCode.$el]"
					:show.sync="selectCountryCodeShow">
						<div
						class="select"
						v-show="selectCountryCodeShow">
							<ul>
								<li
								calss="country"
								@click="changeCountryCode(country.code)"
								v-for="(country, i) in countries"
								:key="i">
									<span class="flag">
										
									</span>
									<span class="name">
										{{ country.zh }}
									</span>
									<span class="code">
										+{{ country.code }}
									</span>
								</li>
							</ul>
						</div>
					</Toggle>
					<div class="phone" id="phone">
						<input type="text" placeholder="请输入手机号">
					</div>
				</div>
				<div class="password">
					<div class="pass">
						<i class="iconfont icon-password-l"></i>
						<input type="password" placeholder="设置登录密码,不少于6位">
					</div>
				</div>
			</form>
			<div
			class="btn btn-register">
				注 册
			</div>
			<div class="more-registers">
				其他注册方式
			</div>
		</div>
		<!-- 社交登录方式 -->
		<div 
		v-show="showType == 'loginByPhone' || showType == 'register'"
		class="social">
			<div class="item">
				<div class="wechat">
					<i class="iconfont icon-wechat-s"></i>
				</div>
				<span v-show="showType === 'register'">微信</span>
			</div>
			<div class="item">
				<div class="qq">
					<i class="iconfont icon-qq-s"></i>
				</div>
				<span v-show="showType === 'register'">Q Q</span>
			</div>
			<div class="item">
				<div class="weibo">
					<i class="iconfont icon-weibo-s"></i>
				</div>
				<span v-show="showType === 'register'">新浪微博</span>
			</div>
			<div class="item">
				<div
				@click="goLoginByEmail"
				class="netease">
					<i class="iconfont icon-netease-l"></i>
				</div>
				<span v-show="showType === 'register'">网易邮箱</span>
			</div>
		</div>
		<!-- 用户协议 -->
		<div
		v-show="showType === 'loginByPhone'"
		class="protocols">
			<input
			type="checkbox"
			v-model="agreeProtocols"
			id="agree-protocols"/>
			<label for="agree-protocols"></label>
			<span>同意</span>
			<a class="service" href="https://st.music.163.com/official-terms/service" target="_blank">《服务条款》</a>
			<a class="privacy" href="https://st.music.163.com/official-terms/privacy" target="_blank">《隐私政策》</a>
			<a class="children" href="https://st.music.163.com/official-terms/children" target="_blank">《儿童隐私政策》</a>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {createUser, formatDate} from '@/utils'
	
	export default {
		data(){
			return{
				countries: null,
				alertPopupShow: false,
				showType: 'loginByPhone',
				showPic: 'login-mobile.png',
				selectCountryCodeShow: false,
				currrentCountryCode: 86,
				errorMsg: '',
				errorMsgBinding: '',
				captchaTimer: null,
				phoneCaptcha: null,
				phoneAccount: '',
				emailAccount: '',
				password: '',
				autoLogin: false,
				agreeProtocols: false,
				user: null,
			}
		},
		beforeDestroy() {
			// 非自动登录，窗口关闭时清空用户信息
			if(!this.autoLogin){
				localStorage.removeItem('login_user')
				this.$cookies.remove("login_user")
			}
		},
		methods:{
			...mapMutations('user',[
				'setLoginPopupShow',
				'setLoginUser'
			]),
			// 关闭弹窗
			close() {
				this.setLoginPopupShow(false)
				this.showType = 'loginByPhone'
			},
			// 选择国家电话前置码
			async selectCountryCode() {
				this.selectCountryCodeShow = true
				// 获取国家列表
				const data = await this.$api.getCountriesCodeList()
				// console.log(data)
				let result = []
				data.data.forEach((item) => {
					result = result.concat(item.countryList)
				})
				result.forEach((item) => {
					item.flag = item.en.replace(/\s+/g,"-")+'.png'
				})
				this.countries = result
			},
			// 判断警告弹窗是否弹出
			isAlertPopupShow(){
				if(!this.agreeProtocols){
					this.alertPopupShow = true
					clearTimeout(timer)
					const timer = setTimeout(()=>{
						this.alertPopupShow = false
					}, 2000);
					return false;
				}else{
					return true
				}
			},
			// 修改国家电话前置码
			changeCountryCode(code) {
				this.currrentCountryCode = code
				this.selectCountryCodeShow = false
			},
			// 跳转邮箱登录
			goLoginByEmail() {
				if(!this.isAlertPopupShow()) return
				this.showType = 'loginByEmail'
			},
			// 跳转绑定页面
			goBindings() {
				if(!this.isAlertPopupShow()) return
				this.showType = 'binding'
			},
			// 跳转注册页面
			goRegister() {
				if(!this.isAlertPopupShow()) return
				this.showType = 'register'
			},
			clearErrorMsg(){
				this.errorMsg = ""
				this.errorMsgBinding = ""
			},
			// 登录
			async login(){
				if(!this.isAlertPopupShow()) return
				let loginUserData
				// 不同登录方式处理
				switch(this.showType){
					case 'loginByPhone':
						if(this.phoneAccount === ""){
							this.errorMsg = "请输入手机号"
							return
						}
						let phoneReg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
						if(!phoneReg.test(this.phoneAccount)){
							this.errorMsg = "请输入正确的11位数字手机号"
							return
						}
						if(this.password === ""){
							this.errorMsg = "请输入密码"
							return
						}
						// 请求 API 获取返回数据
						const loginUserData = await this.$api.postLoginByPhone({
							phone: this.phoneAccount,
							password: this.password,
							countrycode: this.currrentCountryCode,
							md5_password: null
						})
						
						// console.log(loginUserData)
						if(loginUserData){
							if(loginUserData.code === 200){
								this.setLoginUser(loginUserData)
								this.setLoginPopupShow(false)
								this.user = loginUserData
							}else{
								this.errorMsg = loginUserData.message
							}
						}else{
							this.errorMsg = "该手机号尚未注册"
						}
						
						break;
						
					case 'loginByEmail':
						if(this.emailAccount === ""){
							this.errorMsg = "请输入邮箱地址"
							return
						}
						let emailReg = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/;
						if(!emailReg.test(this.emailAccount)){
							this.errorMsg = "请输入正确的邮箱地址"
							return
						}
						if(this.password === ""){
							this.errorMsg = "请输入密码"
							return
						}
						// 请求 API 获取返回数据
						loginUserData = await this.$api.postLoginByEmail({
							email: this.emailAccount,
							password: this.password,
							md5_password: null
						})
						// console.log(loginUserData)
						if(loginUserData){
							if(loginUserData.code === 200){
								// 未绑定手机用户强制绑定手机
								if(loginUserData.bindings.length === 0){
									this.goBindings()
									return
								}
								this.setLoginUser(loginUserData)
								this.setLoginPopupShow(false)
								this.user = loginUserData
							}else{
								this.errorMsg = loginUserData.message
							}
						}else{
							this.errorMsg = "该邮箱地址尚未注册"								
						}
						
						break;
						
					default :
						break;
				}
				// 存储 Cookies
				this.$cookies.set("login_user", this.user.cookie, "7d", "/")
				// 存储 LocalStorage
				if(this.autoLogin){
					localStorage.setItem('login_user', window.JSON.stringify(this.user))
				}else{
					localStorage.removeItem('login_user')
				}
			},
			// 绑定
			async binding(){
				if(!this.phoneAccount){
					this.errorMsgBinding = "请输入11位手机号"
					return
				}
				if(!this.phoneCaptcha){
					this.errorMsgBinding = "请输入验证码"
					return
				}
				// 验证验证码
				const verifyResult = await this.$api.postVerifyPhoneCaptcha({
					phone: this.phoneAccount,
					captcha: this.phoneCaptcha,
					ctcode: this.currrentCountryCode
				})
				// console.log(verifyResult)
				// 校验手机号是否已注册绑定
				if(verifyResult && verifyResult.data === true){
					const data = await this.$api.postCheckPhoneExistence(this.phoneAccount)
					// console.log(data)
					if(data && data.code === 200){
						if(data.exist === 1) this.errorMsgBinding = "绑定失败，该手机号已绑定在云音乐账户：" + data.nickname
					}
				}else{
					this.errorMsgBinding = "验证码错误"
				}
			},
			// 发送验证码
			async sentPhoneCaptcha(){
				if(!this.phoneAccount){
					this.errorMsgBinding = "请输入11位手机号"
					return
				}
				const data = await this.$api.postSentPhoneCaptcha(this.phoneAccount)
				if(!data){
					this.errorMsgBinding = "验证码发送失败，请仔细核对手机号"
				}
				
				if(data.code === 200){
					this.captchaTimer = 60000
					let timer = null
					clearInterval(timer)
					timer = setInterval(()=>{
						this.captchaTimer -= 1000
					}, 1000);
					if(this.captchaTimer <= 0){
						this.captchaTimer = 0
						return
					}
				}else{
					this.errorMsgBinding = data.message
				}
			},
		},
		computed:{
			...mapState('user',[
				'loginPopupShow',
				'loginUser'
			]),
		},
		watch:{
			showType(newVal, oldVal){
				switch(newVal){
					case 'loginByEmail':
						this.showPic = 'login-email.png'
						break;
					default :
						this.showPic = 'login-mobile.png'
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-popup-container{
		z-index: 999999999;
		position: fixed;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		width: 330px;
		height: 510px;
		padding: 10px;
		background: #fafafa;
		box-shadow: 3px 3px 5px #9999;
		.alert-popup{
			z-index: 999999999;
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			width: 240px;
			height: auto;
			padding: 20px;
			border-radius: 9px;
			font-size: 14px;
			color: #fff;
			background: #000;
			opacity: 0.8;
		}
		.alertPopup-enter-active, .alertPopup-leave-active {
			transition: opacity 1s;
		}
		.alertPopup-enter, .alertPopup-leave-to{
			opacity: 0;
		}
		.header{
			position: relative;
			width: 100%;
			height: 40px;
			font-size: 12px;
			color: #777;
			line-height: 20px;
			.more-logins, .to-login{
				cursor: pointer;
				position: absolute;
				top: 0;
				left: 0;
				height: 20px;
				i.iconfont{
					float: left;
					font-size: 14px;
				}
				&:hover{
					color: #555;
				}
			}
			.close{
				cursor: pointer;
				float: right;
				width: 40px;
				height: 20px;
				text-align: right;
				&:hover{
					color: #555;
				}
			}
		}
		.pic{
			margin: 10px 0;
			img{
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}
		/* ===== 公共样式 ===== */
		.btn{
			width: 260px;
			height: 40px;
			margin: 10px auto;
			border-radius: 5px;
			line-height: 40px;
			text-align: center;
			font-size: 15px;
			color: #fff;
			background: #ea4848;
			&:hover{
				background: #c72e2e;
			}
		}
		form{
			position: relative;
			transform: translate(-50%, 0%);
			top: 0;
			left: 50%;
			width: 260px;
			height: 80px;
			border: 1px solid #e9e9e9;
			border-radius: 5px;
			background: #fff;
			&>div{
				height: 40px;
				border: 1px solid #eee;
				&:first-child{
					border-bottom: none;
				}
			}
			input{
				outline: none;
				padding: 5px;
				border: 0;
				width: calc(100% - 30px);
				margin: 0;
				padding: 12px 5px;
				height: 15px;
				line-height: 15px;
				vertical-align: bottom;
				&:-webkit-input-placeholder {
					font-weight: normal;
				}
				&:-moz-placeholder {
					font-weight: normal;
				}
				&::-moz-placeholder {
					font-weight: normal;
				}
				&:-ms-input-placeholder {
					font-weight: normal;
				}
			}
			i.iconfont{
				color: #777;
			}
			.account{
				position: relative;
				height: 39px;
				width: 100%;
				border: 0;
				border-bottom: 1px solid #e9e9e9;
				.countrycode{
					float: left;
					cursor: default;
					display: flex;
					flex-direction: row;
					width: 75px;
					height: 40px;
					line-height: 40px;
					padding: 0 5px;
					border: 0;
					border-right: 1px solid #e9e9e9;
					i.iconfont{
						flex-grow: 1;
						display: inline-block;
						height: 100%;
						text-align: center;
						font-size: 14px;
						&.icon-phone-l{
							font-size: 16px;
						}
					}
					span{
						flex-basis: 50px;
						display: inline-block;
						height: 100%;
						text-align: center;
						font-size: 12px;
					}
				}
				.phone{
					width: auto;
					height: 100%;
					margin-left: 88px;
					border: 0;
				}
				.select{
					cursor: pointer;
					position: absolute;
					top: 40px;
					left: -1px;
					width: 100%;
					height: 220px;
					border: 1px solid #eee;
					background: #fff;
					overflow: hidden;
					overflow-y: auto;
					&::-webkit-scrollbar{
						width: 7px;
						height: 7px;
					}
					&::-webkit-scrollbar-thumb{
						border-radius: 14px;
						background: #eeee;
					}
					&::-webkit-scrollbar-thumb:hover{
						background: #9999;
					}
					&::-webkit-scrollbar-track{
						background: none;
					}
					ul{
						list-style: none;
						margin: 0;
						padding: 0;
						li{
							display: flex;
							flex-direction: row;
							height: 24px;
							padding: 2px 10px;
							line-height: 24px;
							font-size: 12px;
							&:hover{
								background: #eee;
							}
							.flag{
								flex-basis: 24px;
								position: relative;
								img{
									position: absolute;
									transform: translateY(-50%);
									top: 50%;
									width: 100%;
									height: auto;
								}
							}
							.name{
								flex-grow: 1;
								padding: 0 10px;
								text-align: left;
								color: #555;
							}
							.code{
								flex-basis: 40px;
								text-align: right;
								color: #777;
							}
						}
					}
				}
			}
			.password{
				display: flex;
				flex-direction: row;
				width: 100%;
				border: 0;
				border-top: 1px solid #e9e9e9;
				.pass{
					flex-grow: 1;
					i.iconfont{
						float: left;
						display: block;
						width: 20px;
						height: 40px;
						padding: 0 5px;
						line-height: 40px;
						font-size: 16px;
					}
					input{
						width: calc(100% - 42px);
					}
				}
				.reset-pass{
					cursor: pointer;
					flex-basis: 80px;
					height: 40px;
					line-height: 40px;
					border: 0;
					padding: 0 5px;
					font-size: 12px;
					color: #999;
					text-align: center;
				}
			}
		}
		/* ===== 公共样式结束 ===== */
		// 登录
		.login{
			z-index: 999;
			position: relative;
			width: 100%;
			height: 200px;
			// 手机登录
			.login-by-phone{
				z-index: 999;
			}
			// 邮箱登录
			.login-by-email{
				.account{
					i.iconfont{
						float: left;
						display: block;
						width: 20px;
						height: 40px;
						padding: 0 5px;
						line-height: 40px;
						font-size: 16px;
					}
					input{
						width: calc(100% - 42px);
					}
				}
				.password{
					
				}
			}
			.auto-login{
				cursor: default;
				position: relative;
				width: 260px;
				height: 20px;
				line-height: 20px;
				margin: 10px auto;
				font-size: 12px;
				color: #777;
				margin-left: 35px;
				#auto-login{
					cursor: default;
					visibility: hidden;
					+label{
						cursor: default;
						display: block;
						position: absolute;
						top: 5px;
						left: 5px;
						width: 12px;
						height: 12px;
						border: 1px solid #999;
						border-radius: 2px;
						overflow: hidden;
					}
					&:checked +label{
						width: 12px;
						height: 12px;
						&:before{
							display: block;
							content: "\2714";
							text-align: center;
							font-size: 10px;
							line-height: 11px;
							color: #d33a31;
						}
					}
				}
				span{
					margin: 0 5px;
				}
				.error-msg{
					float: right;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #c72e2e;
					i.iconfont{
						float: left;
						display: inline-block;
						height: 20px;
					}
					span{
						display: inline-block;
						height: 20px;
						margin: 0;
					}
				}
			}
			.btn-login{
				cursor: pointer;
			}
			.btn-text{
				cursor: pointer;
				margin: auto;
				font-size: 15px;
				text-align: center;
				text-decoration: underline;
			}
		}
		// 绑定
		.bindings{
			form.binding-account{
				height: auto;
				border: none;
				.account{
					border: 1px solid #e9e9e9;
					border-radius: 5px;
				}
				.verification-code{
					margin: 10px auto;
					border: none;
					.verification{
						float: left;
						width: 115px;
						height: 40px;
						border: 1px solid #e9e9e9;
						border-radius: 5px;
						padding: 0 5px;
						i.iconfont{
							float: left;
							width: 20px;
							line-height: 40px;
							font-size: 16px;
						}
					}
					.btn-verification{
						float: right;
						cursor: pointer;
						width: 125px;
						height: 40px;
						margin: 0 auto;
						border-radius: 5px;
						overflow: hidden;
						.time{
							font-size: 16px;
							color: #999;
							background: #dedede;
							&:hover{
								color: #777;
								background: #ccc;
							}
						}
					}
				}
			}
			.error-msg-binding{
				position: relative;
				width: 260px;
				min-height: 40px;
				line-height: 20px;
				margin: auto;
				.main{
					font-size: 12px;
					color: #c72e2e;
					i.iconfont{
						float: left;
						display: block;
						height: auto;
					}
					span{
						display: block;
						height: auto;
						margin: 0;
					}
				}
			}
			.btn-next{
				cursor: pointer;
				margin: 10px auto;
			}
		}
		// 注册
		.register{
			.btn-register{
				margin: 35px auto;
			}
			.more-registers{
				position: relative;
				width: 260px;
				height: 20px;
				line-height: 20px;
				margin: 0 auto;
				text-align: center;
				font-size: 12px;
				color: #999;
				&:before{
					position: absolute;
					transform: translateY(-50%);
					top: 50%;
					left: 0;
					display: inline-block;
					content: "";
					width: 80px;
					height: 1px;
					background: linear-gradient(to right, #fff, #999);
				}
				&:after{
					position: absolute;
					transform: translateY(-50%);
					top: 50%;
					right: 0;
					display: inline-block;
					content: "";
					width: 80px;
					height: 1px;
					background: linear-gradient(to left, #fff, #999);
				}
			}
		}
		// 社会化登录
		.social{
			position: relative;
			width: 260px;
			margin: 5px auto;
			text-align: center;
			overflow: hidden;
			.item{
				float: left;
				width: 65px;
				margin: 0;
				padding: 0;
				border: 0;
				overflow: hidden;
				div{
					cursor: pointer;
					width: 36px;
					height: 36px;
					margin: 3px auto;
					border: 1px solid #ccc;
					border-radius: 50%;
					overflow: hidden;
					i.iconfont{
						display: block;
						width: 100%;
						height: 100%;
						font-size: 20px;
						text-align: center;
						line-height: 36px;
						&.icon-wechat-s{
							color: #67b633;
							&:hover{
								color: #fff;
								background: #67b633;
							}
						}
						&.icon-qq-s{
							color: #34a0df;
							&:hover{
								color: #fff;
								background: #34a0df;
							}
						}
						&.icon-weibo-s{
							color: #d33a31;
							&:hover{
								color: #fff;
								background: #d33a31;
							}
						}
						&.icon-netease-l{
							color: #d33a31;
							&:hover{
								color: #fff;
								background: #d33a31;
							}
						}
					}
				}
				span{
					display: block;
					width: 100%;
					line-height: 20px;
					font-size: 12px;
					color: #999;
					text-align: center;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
		.protocols{
			cursor: default;
			position: relative;
			margin: 20px 10px 35px;
			font-size: 12px;
			text-align: center;
			line-height: 20px;
			color: #777;
			#agree-protocols{
				cursor: default;
				margin: 0;
				visibility: hidden;
				+label{
					cursor: default;
					display: block;
					position: absolute;
					top: 5px;
					left: 10px;
					width: 9px;
					height: 9px;
					border: 1px solid #777;
					border-radius: 2px;
					overflow: hidden;
				}
				&:checked +label{
					width: 11px;
					height: 11px;
					border: 0;
					&:before{
						content: '';
						position: absolute;
						right: 0;
						bottom: 0;
						width: 0;
						height: 0;
						border: 6px solid #c62f2f;
					}
					&:after{
						content: '';
						position: absolute;
						right: 3px;
						bottom: 2px;
						width: 2px;
						height: 7px;
						border: 1px solid #fff;
						border-top-color: transparent;
						border-left-color: transparent;
						transform: rotate(45deg);
					}
				}
			}
			a{
				text-decoration: none;
				color: #0057b1;
			}
		}
	}
@media screen and (max-width: 540px) {
	.login-popup-container{
		width: 220px;
		height: 360px;
		.alert-popup{
			width: 200px;
			padding: 15px;
		}
		.header{
			height: 20px;
			font-size: 10px;
			.close{
				width: 30px;
			}
		}
		.pic{
			margin: 5px 0;
		}
		/* ===== 公共样式 ===== */
		.btn{
			width: 180px;
			height: 30px;
			margin: 5px auto;
			line-height: 30px;
			font-size: 13px;
		}
		form{
			width: 180px;
			height: 60px;
			&>div{
				height: 30px;
			}
			input{
				width: calc(100% - 10px);
				padding: 7px 5px;
				height: 15px;
				line-height: 15px;
				font-size: 10px;
			}
			.account{
				height: 29px;
				.countrycode{
					width: 30px;
					height: 30px;
					line-height: 30px;
					border-right: 1px solid #e9e9e9;
					i.iconfont{
						display: none;
					}
					span{
						flex-basis: 30px;
						font-size: 10px;
					}
				}
				.phone{
					margin-left: 40px;
					width: calc(100% - 42px);
					overflow: hidden;
				}
				.select{
					top: 30px;
					height: 160px;
					&::-webkit-scrollbar{
						display: none;
					}
					ul{
						li{
							height: 20px;
							padding: 2px 10px;
							line-height: 20px;
							font-size: 10px;
							&:hover{
								background: #eee;
							}
							.flag{
								flex-basis: 20px;
							}
							.name{
								padding: 0 5px;
							}
							.code{
								flex-basis: 30px;
							}
						}
					}
				}
			}
			.password{
				display: flex;
				flex-direction: row;
				width: 100%;
				border: 0;
				border-top: 1px solid #e9e9e9;
				.pass{
					flex-grow: 1;
					i.iconfont{
						display: none;
					}
					input{
						width: calc(100% - 10px);
						font-size: 10px;
					}
				}
				.reset-pass{
					flex-grow: 0;
					flex-basis: 100px;
					width: 100%;
					height: 30px;
					line-height: 30px;
					font-size: 10px;
				}
			}
		}
		/* ===== 公共样式结束 ===== */
		// 登录
		.login{
			height: 150px;
			// 邮箱登录
			.login-by-email{
				.account{
					i.iconfont{
						display: none;
					}
					input{
						width: auto;
						font-size: 10px;
					}
				}
				.password{
					
				}
			}
			.auto-login{
				width: 180px;
				margin: 5px auto;
				font-size: 10px;
				#auto-login{
					float: left;
					cursor: default;
					visibility: hidden;
					+label{
						top: 3px;
						left: 3px;
						width: 12px;
						height: 12px;
					}
				}
				span{
					position: relative;
					bottom: 2px;
				}
				.error-msg{
					font-size: 10px;
					max-width: 100px;
					width: auto;
					height: 20px;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
					i.iconfont{
						display: none;
					}
				}
			}
			.btn-text{
				font-size: 13px;
			}
		}
		// 绑定
		.bindings{
			form.binding-account{
				.verification-code{
					margin: 5px auto;
					.verification{
						float: left;
						width: 70px;
						height: 28px;
						i.iconfont{
							display: none;
						}
						input{
							padding: 6px 5px;
						}
					}
					.btn-verification{
						width: 90px;
						height: 30px;
						.time{
							font-size: 15px;
						}
					}
				}
			}
			.error-msg-binding{
				min-height: 20px;
				.main{
					font-size: 10px;
					i.iconfont{
						display: none;
					}
				}
			}
			.btn-next{
				cursor: pointer;
				margin: 10px auto;
			}
		}
		// 注册
		.register{
			.btn-register{
				margin: 15px auto;
			}
			.more-registers{
				width: 180px;
				height: 20px;
				line-height: 20px;
				font-size: 10px;
				color: #999;
				&:before{
					width: 40px;
				}
				&:after{
					width: 40px;
				}
			}
		}
		// 社会化登录
		.social{
			width: 220px;
			.item{
				margin: 0 3px;
				width: 49px;
				div{
					width: 32px;
					height: 32px;
					i.iconfont{
						font-size: 16px;
						line-height: 32px;
					}
				}
				span{
					font-size: 10px;
				}
			}
		}
		.protocols{
			margin: 10px 5px 15px;
			font-size: 10px;
			line-height: 20px;
		}
	}
}
</style>
