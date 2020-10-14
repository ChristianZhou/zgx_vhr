<template>
	<div>
		<div class="permissManaTool">
			<el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
				<template slot="prepend">ROLE_</template>
			</el-input>
			<el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
			<el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
		</div>
		<div class="permissManaMain">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item :title="row.nameZh" :name="row.id" v-for="(row, index) in roles" :key="index">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>可访问的资源</span>
							<el-button style="float: right; padding: 3px 0; color: red"
									   icon="el-icon-delete"
									   type="text"></el-button>
						</div>
						<div v-for="o in 4" :key="o" class="text item">
							{{'列表内容 ' + o }}
						</div>
					</el-card>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
export default {
	name: "PermissionMana"
	, data() {
		return {
			url: '/system/basic/permiss/'
			, role: {
				name: ''
				, nameZh: ''
			}
			, activeName: '1'
			, roles: []
		}
	}
	, methods: {
		initRoles() {
			this.getRequest(this.url).then(value => {
				if (value) {
					this.roles = value;
				}
			})
		}
	}
	, mounted() {
		this.initRoles()
	}
}
</script>

<style scoped>
	.permissManaTool {
		display: flex;
		justify-content: flex-start;
	}

	.permissManaTool .el-input {
		width: 300px;
		margin-right: 6px;
	}

	.permissManaMain {
		margin-top: 10px;
		width: 700px;
	}
</style>