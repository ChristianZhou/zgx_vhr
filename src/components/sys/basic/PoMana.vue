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
				size="small"
				type="primary">添加
			</el-button>
		</div>
		<div class="posManaMain">
			<el-table
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
		</div>
		<el-dialog
			title="修改职位"
			:visible.sync="dialogVisible"
			width="30%">
			<div>
				<el-tag>职位名称</el-tag>
				<el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
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
			pos: {
				name: ''
			}
			, positions: []
			, dialogVisible: false
			, updatePos: {
				name: ''
			}
		}
	},
	methods: {
		initPosition() {
			this.getRequest("/system/basic/pos/").then(value => {
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
				console.log(value)
				this.deleteRequest("/system/basic/pos/" + row.id).then(value => {
					if (value) {
						this.initPosition()
					}
				})
			})
		},
		addPosition() {
			let name = this.pos.name;
			if (name) {
				this.postRequest("/system/basic/pos/", this.pos).then(value => {
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
			this.putRequest("/system/basic/pos/", this.updatePos).then(value => {
				if (value) {
					this.initPosition();
					this.updatePos = {name: ''}
				}
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