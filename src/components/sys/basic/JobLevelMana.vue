<template>
	<div>
		<el-input
			size="small"
			v-model="jl.name"
			style="width: 300px"
			prefix-icon="el-icon-plus"
			placeholder="添加职称..."
		></el-input>

		<el-select v-model="jl.titleLevel" size="small" placeholder="职称等级" style="margin-left: 5px">
			<el-option
				v-for="item in titleLevels"
				:key="item"
				:label="item"
				:value="item">
			</el-option>
		</el-select>

		<el-button icon="el-icon-plus" type="primary" size="small" style="margin-left: 5px"
				   @click="addJobLevel">添加
		</el-button>


		<div>
			<el-table
				@selection-change="handleSelectionChange"
				:data="jls"
				border
				stripe
				size="small"
				style="width: 80%; margin-top: 10px">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="id"
					label="编号"
					width="55">
				</el-table-column>
				<el-table-column
					prop="name"
					label="职称名称"
					width="150">
				</el-table-column>
				<el-table-column
					prop="titleLevel"
					label="职称级别"
					width="150">
				</el-table-column>
				<el-table-column
					prop="createDate"
					label="创建时间"
					width="150">
				</el-table-column>
				<el-table-column
					prop="enabled"
					label="是否启用"
					width="150">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
						<el-tag v-if="!scope.row.enabled" type="danger">未启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-button @click="batchDelete" type="danger" size="small" style="margin-top: 8px"
				   :disabled="multipleSelection.length === 0">批量删除
		</el-button>

		<el-dialog
			title="修改职称"
			:visible.sync="dialogVisible"
			width="30%">
			<div>
				<table>
					<tr>
						<td>
							<el-tag>职称名</el-tag>
						</td>
						<td>
							<el-input class="updateJlInput" size="small" v-model="updateJl.name"></el-input>
						</td>
					</tr>
					<tr>
						<td>
							<el-tag>职称级别</el-tag>
						</td>
						<td>
							<el-select v-model="updateJl.titleLevel" size="small" placeholder="职称等级" style="margin-left: 5px">
								<el-option
									v-for="item in titleLevels"
									:key="item"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</td>
					</tr>
					<tr>
						<td>
							<el-tag>是否启用</el-tag>
						</td>
						<td>
							<el-switch class="updateJlInput" size="small" v-model="updateJl.enabled"
									   active-text="启用" inactive-text="禁用"></el-switch>
						</td>
					</tr>
				</table>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogVisible = false;doUpdate()">确 定</el-button>
		    </span>
		</el-dialog>
	</div>

</template>

<script>
export default {
	name: "JobLevelMana"
	, data() {
		return {
			url: "/system/basic/jobLevel/"
			, jl: {
				name: ''
				, titleLevel: ''
			}
			, titleLevels: [
				'正高级'
				, '副高级'
				, '中级'
				, '初级'
				, '员级'
			]
			, jls: []
			, multipleSelection: []
			, dialogVisible: false
			, updateJl: {
				name: ''
				, enabled: false
				, titleLevel: ''
			}
		}
	}
	, methods: {
		initJobLevel() {
			this.getRequest(this.url).then(value => {
				if (value) {
					this.jls = value;
				}
			})
		}
		, doUpdate() {
			this.putRequest(this.url, this.updateJl).then(value => {
				if (value) {
					this.initJobLevel();
					this.updateJl = {
						name: ''
						, enabled: false
						, titleLevel: ''
					}
				}
			})
		}
		, addJobLevel() {
			if (!this.jl.name || !this.jl.titleLevel) {
				this.$message.error("添加字段不可以为空")
				return;
			}
			this.postRequest(this.url, this.jl).then(value => {
				if (value) {
					this.initJobLevel()
					this.jl = {
						name: ''
						, titleLevel: ''
					}
				}
			})
		}
		, handleDelete(index, row) {
			this.$confirm('此操作将永久删除【' + row.name + '】', '提示', {
				confirmButtonText: '确定'
				, cancelButtonText: '取消'
				, type: 'warning'
			}).then(value => {
				this.deleteRequest(this.url + row.id).then(value => {
					if (value) {
						this.initJobLevel()
					}
				})
			})
		}
		, handleEdit(index, row) {
			this.dialogVisible = true;
			Object.assign(this.updateJl, row);
		}
		, batchDelete() {
			this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录', '提示', {
				confirmButtonText: '确定'
				, cancelButtonText: '取消'
				, type: 'warning'
			}).then(value => {
				let ids = '?';
				this.multipleSelection.forEach(item => ids += 'ids=' + item.id + '&');
				this.deleteRequest(this.url + ids).then(value => {
					if (value) {
						this.initJobLevel()
					}
				})
			})
		}
		, handleSelectionChange(val) {
			this.multipleSelection = val;
		}
	}
	, mounted() {
		this.initJobLevel()
	}

}
</script>

<style>
.addJlInput {
	width: 300px;
	margin-right: 8px;
}

.jlManaMain {
	margin-top: 10px;
}

.updateJlInput {
	width: 200px;
	margin-left: 8px;
}
</style>