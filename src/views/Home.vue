<template>
	<div>
		<el-container>
			<el-header class="homeHeader">
				<div class="title">
					七号公园
				</div>
				<el-dropdown class="userInfo"  @command="commandHandler">
					<span class="el-dropdown-link">
						{{ user.name }}
						<i><img :src="user.userface" alt=""></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
						<el-dropdown-item command="setting">设置</el-dropdown-item>
						<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router unique-opened>
						<el-submenu :index="index + ''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
							<template slot="title">
								<i :class="item.iconCls" style="color: #3083ff; margin-right: 5px"></i>
								<span>{{ item.name }}</span>
							</template>
							<el-menu-item :index="child.path" v-for="(child, indexSub) in item.children" :key="indexSub">
								{{child.name}}
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<el-breadcrumb separator-class="el-icon-arrow-right"  v-if=" this.$router.currentRoute.path  !== '/home'">
						<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="homeWelcome" v-if=" this.$router.currentRoute.path  === '/home'"> 欢迎来到七号公园!</div>
					<router-view class="homeRouterView"/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			user: JSON.parse(window.sessionStorage.getItem("user"))
		}
	},
	computed: {
		routes() {
			return this.$store.state.routes;
		}
	},
	methods: {
		commandHandler(cmd) {
			switch (cmd) {
				case 'logout':
					this.$confirm('此操作将退出登录, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.getRequest("/logout");
						window.sessionStorage.removeItem("user");
						this.$router.replace('/');
						this.$store.commit('initRoutes', []);
					}).catch((error) => {
						this.$message({
							type: 'info',
							message: error
						});
					});
					break
				case 'userInfo':
					break
				case 'setting':
					break
				default:
					break
			}
		}
	}
}
</script>

<style scoped>
.homeHeader {
	background-color: cornflowerblue;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	box-sizing: border-box;
}

.homeHeader .title {
	font-size: 30px;
	font-family: 宋体, fantasy;
	color: cornsilk;
}

.homeHeader .userInfo {
	cursor: pointer;
}

.el-dropdown-link {
	display: flex;
	align-items: center;
}

.el-dropdown-link img {
	width: 48px;
	height: 48px;
	border-radius: 24px;
	margin-left: 8px;
}

.homeWelcome {
	text-align: center;
	font-size: 30px;
	font-family: "Yu Gothic UI Semilight",serif;
	color: cornflowerblue;
	padding-top: 5px;
}

.homeRouterView {
	margin-top: 10px;
}
</style>