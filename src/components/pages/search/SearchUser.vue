<template>
	<div class="search-user-container">
		<div class="users">
			<router-link
			tag="div"
			:to="`/page/user/`+user.id"
			class="user"
			v-for="(user, i) in users"
			:key="i">
				<div class="pic-box">
					<img :src="user.picUrl + '?param=100y100'" alt="">
				</div>
				<div
				v-html="user.name.replace(searchRoot.keywords, '<span>'+ searchRoot.keywords +'</span>')"
				class="name">
					{{ user.name }}
				</div>
				<div v-show="user.accountId" class="icon">
					<i class="iconfont icon-people-s"></i>
				</div>
			</router-link>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				users: [],
				pageCount: null,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchUser()
		},
		methods:{
			// 获取单曲搜索结果
			async searchUser(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.result.userprofiles.map((users)=>{
						return {
							id: users.id,
							name: users.nickname,
							picUrl: users.avatarUrl,
						}
					})
					
					this.users = result
					this.pageCount = Math.ceil(data.result.userprofileCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.userprofileCount +"位用户"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchUser()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchUser()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-user-container{
		position: relative;
		.users{
			position: relative;
			.user{
				cursor: pointer;
				position: relative;
				width: auto;
				height: 80px;
				padding: 0 20px;
				overflow: hidden;
				background: #f1f2f3;
				&:nth-child(2n){
					background: #f9f9f9;
				}
				&:hover{
					background: #eee;
				}
				.pic-box{
					float: left;
					width: 60px;
					height: 60px;
					margin: 10px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					position: relative;
					transform: translateY(-50%);
					top: 50%;
					font-size: 13px;
					color: #333;
					/deep/span{
						color: #0c73c6;
					}
				}
				.icon{
					position: absolute;
					transform: translateY(-50%);
					top: 50%;
					right: 20px;
					color: #ef4444;
					i.iconfont{
						font-size: 16px;
					}
				}
			}
		}
	}
</style>
