<template>
	<div>
		<div>
			<el-input
				class="addPosInput"
				size="small"
				placeholder="添加职位..."
				prefix-icon="el-icon-plus"
				v-model="pos.name">
				<i class="el-icon-close" slot="suffix" @click="clearInput"
				   style="vertical-align: -webkit-baseline-middle"></i>
			</el-input>
			<el-button
				@click="addPosition"
				icon="el-icon-plus"
				size="mini"
				type="primary">添加
			</el-button>
		</div>
		<div class="posManaMain">
			<el-table
				@selection-change="handleSelectionChange"
				stripe
				:data="positions"
				border
				size="small"
				style="width: 70%">
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
					label="职位名称"
					width="180">
				</el-table-column>
				<el-table-column
					prop="createDate"
					label="创建时间"
					width="150">
				</el-table-column>
				<el-table-column
					label="是否启用"
					width="150">
					<template slot-scope="scope">
						<el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
						<el-tag size="small" type="danger" v-if="!scope.row.enabled">未启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button @click="batchDelete" type="danger" size="small" style="margin-top: 8px" :disabled = "multipleSelection.length === 0">批量删除</el-button>
		</div>
		<el-dialog
			title="修改职位"
			:visible.sync="dialogVisible"
			width="30%">
			<div>
				<div>
					<el-tag>职位名称</el-tag>
					<el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
				</div>
				<div>
					<el-tag>是否启用</el-tag>
					<el-switch
						class="updatePosInput"
						v-model="updatePos.enabled"
						active-text="启用"
						inactive-text="禁用"
					>
					</el-switch>
				</div>
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
	name: "PoMana",
	data() {
		return {
			url: "/system/basic/pos/"
			, pos: {
				name: ''
			}
			, positions: []
			, dialogVisible: false
			, updatePos: {
				name: ''
				, enabled: false
			}
			, multipleSelection: []
		}
	},
	methods: {

		initPosition() {
			this.getRequest(this.url).then(value => {
				if (value) {
					this.positions = value;
				}
			})
		},
		handleEdit(index, row) {
			this.dialogVisible = true;
			Object.assign(this.updatePos, row);
		},
		handleDelete(index, row) {
			this.$confirm('此操作将永久删除【' + row.name + '】', '提示', {
				confirmButtonText: '确定'
				, cancelButtonText: '取消'
				, type: 'warning'
			}).then(value => {
				this.deleteRequest(this.url + row.id).then(value => {
					if (value) {
						this.initPosition()
					}
				})
			})
		},
		addPosition() {
			let name = this.pos.name;
			if (name) {
				this.postRequest(this.url, this.pos).then(value => {
					if (value) {
						this.initPosition();
						this.clearInput();
					}
				});
			} else {
				this.$message.error('职位名称不可以为空');
			}
		}
		, clearInput() {
			this.pos.name = ''
		}
		, doUpdate() {
			this.putRequest(this.url, this.updatePos).then(value => {
				if (value) {
					this.initPosition();
					this.updatePos = {name: ''}
				}
			})
		}
		, handleSelectionChange(val) {
			this.multipleSelection = val;
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
						this.initPosition()
					}
				})
			})
		}
	},
	mounted() {
		this.initPosition();
	}
}
</script>

<style>
.addPosInput {
	width: 300px;
	margin-right: 8px;
}

.posManaMain {
	margin-top: 10px;
}

.updatePosInput {
	width: 200px;
	margin-left: 8px;
}
</style>